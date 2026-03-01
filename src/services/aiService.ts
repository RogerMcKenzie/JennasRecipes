import { GoogleGenerativeAI, SchemaType, type Schema } from '@google/generative-ai';
import { geminiApiKey, geminiModel, hasGeminiApiKey } from '../config/env';

export interface AIRecipe {
    title: string;
    cookTime: string;
    servings: number;
    difficulty: string;
    ingredients: string[];
    steps: string[];
    tips: string;
}

const SYSTEM_PROMPT = `You are Jenna, a professional home chef who creates delicious, easy-to-follow recipes. Given a list of ingredients, generate a creative and appetizing recipe.

You MUST respond with ONLY valid JSON in this exact format, no markdown, no code fences, just raw JSON:
{
  "title": "Recipe Name",
  "cookTime": "30 minutes",
  "servings": 4,
  "difficulty": "Easy",
  "ingredients": [
    "2 chicken breasts, diced",
    "3 cloves garlic, minced"
  ],
  "steps": [
    "Preheat the oven to 375°F.",
    "Season the chicken with salt and pepper."
  ],
  "tips": "For extra flavor, let the chicken marinate for 30 minutes before cooking."
}`;

const recipeSchema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
        title: { type: SchemaType.STRING },
        cookTime: { type: SchemaType.STRING },
        servings: { type: SchemaType.INTEGER },
        difficulty: { type: SchemaType.STRING },
        ingredients: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
        },
        steps: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
        },
        tips: { type: SchemaType.STRING },
    },
    required: ['title', 'cookTime', 'servings', 'difficulty', 'ingredients', 'steps', 'tips'],
};

const DEFAULT_GEMINI_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
];

let discoveredModelsPromise: Promise<string[]> | null = null;

function normalizeModelName(model: string): string {
    return model.replace(/^models\//, '').trim();
}

function getConfiguredCandidateModels(): string[] {
    if (!geminiModel) {
        return DEFAULT_GEMINI_MODELS;
    }

    return [geminiModel, ...DEFAULT_GEMINI_MODELS.filter((model) => model !== geminiModel)];
}

function uniqueModels(models: string[]): string[] {
    const seen = new Set<string>();
    const result: string[] = [];

    for (const model of models.map(normalizeModelName)) {
        if (!model || seen.has(model)) {
            continue;
        }
        seen.add(model);
        result.push(model);
    }

    return result;
}

function sortModels(models: string[]): string[] {
    const weights = new Map(DEFAULT_GEMINI_MODELS.map((model, index) => [model, index]));

    return [...models].sort((a, b) => {
        const weightA = weights.get(a) ?? Number.MAX_SAFE_INTEGER;
        const weightB = weights.get(b) ?? Number.MAX_SAFE_INTEGER;

        if (weightA !== weightB) {
            return weightA - weightB;
        }

        return a.localeCompare(b);
    });
}

function supportsGenerateContent(methods: unknown): boolean {
    if (!Array.isArray(methods)) {
        return false;
    }

    return methods.some((method) => typeof method === 'string' && method === 'generateContent');
}

function extractModelsFromResponse(data: unknown): string[] {
    if (!data || typeof data !== 'object') {
        return [];
    }

    const models = (data as { models?: unknown }).models;
    if (!Array.isArray(models)) {
        return [];
    }

    return models
        .map((model) => {
            if (!model || typeof model !== 'object') {
                return null;
            }

            const candidate = model as { name?: unknown; supportedGenerationMethods?: unknown };
            if (typeof candidate.name !== 'string') {
                return null;
            }

            if (!supportsGenerateContent(candidate.supportedGenerationMethods)) {
                return null;
            }

            return normalizeModelName(candidate.name);
        })
        .filter((model): model is string => Boolean(model));
}

async function discoverModels(apiKey: string): Promise<string[]> {
    if (!discoveredModelsPromise) {
        discoveredModelsPromise = (async () => {
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`
                );

                if (!response.ok) {
                    return [];
                }

                const data = await response.json();
                return sortModels(uniqueModels(extractModelsFromResponse(data)));
            } catch (error) {
                console.error('Failed to discover Gemini models from API:', error);
                return [];
            }
        })();
    }

    return discoveredModelsPromise;
}

function parseRecipe(rawText: string): AIRecipe {
    const cleaned = rawText
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();

    if (!cleaned) {
        throw new Error('Gemini returned an empty response.');
    }

    const recipe = JSON.parse(cleaned) as Partial<AIRecipe>;

    if (
        !recipe.title ||
        !recipe.cookTime ||
        typeof recipe.servings !== 'number' ||
        !recipe.difficulty ||
        !Array.isArray(recipe.ingredients) ||
        recipe.ingredients.length === 0 ||
        !Array.isArray(recipe.steps) ||
        recipe.steps.length === 0 ||
        !recipe.tips
    ) {
        throw new Error('Gemini returned an incomplete recipe. Please try again.');
    }

    return recipe as AIRecipe;
}

function mapGeminiError(error: unknown): string {
    if (!(error instanceof Error)) {
        return 'Unable to generate an AI recipe right now. Please try again.';
    }

    const message = error.message || 'Unable to generate an AI recipe right now. Please try again.';
    const lower = message.toLowerCase();

    if (lower.includes('api key not valid') || lower.includes('invalid api key')) {
        return 'Gemini API key is invalid. Verify VITE_GEMINI_API_KEY in Vercel and redeploy.';
    }

    if (lower.includes('permission denied') || lower.includes('permission_denied')) {
        return 'Gemini request was denied. Check key permissions and Gemini API access in Google AI Studio.';
    }

    if (lower.includes('quota') || lower.includes('resource_exhausted')) {
        return 'Gemini quota was exceeded. Check usage limits, then try again.';
    }

    if (lower.includes('model') && lower.includes('not found')) {
        return 'No compatible Gemini model is available for this API key. Create a fresh key in Google AI Studio, update VITE_GEMINI_API_KEY in Vercel, and redeploy.';
    }

    return message;
}

export { hasGeminiApiKey };

export async function generateRecipe(ingredients: string[]): Promise<AIRecipe | null> {
    if (!hasGeminiApiKey || !geminiApiKey) {
        console.warn('Gemini API key not set. Skipping AI recipe generation.');
        return null;
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const prompt = `${SYSTEM_PROMPT}\n\nUser's ingredients: ${ingredients.join(', ')}`;

    let lastError: unknown = null;

    const attemptedModels = new Set<string>();
    let sawModelNotFound = false;

    const tryModels = async (models: string[]) => {
        for (const modelName of uniqueModels(models)) {
            if (attemptedModels.has(modelName)) {
                continue;
            }
            attemptedModels.add(modelName);

            try {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    generationConfig: {
                        responseMimeType: 'application/json',
                        responseSchema: recipeSchema,
                    },
                });

                const result = await model.generateContent(prompt);
                return parseRecipe(result.response.text());
            } catch (error) {
                lastError = error;
                if (error instanceof Error) {
                    const lower = error.message.toLowerCase();
                    if (lower.includes('model') && lower.includes('not found')) {
                        sawModelNotFound = true;
                    }
                }
                console.error(`Failed to generate AI recipe with ${modelName}:`, error);
            }
        }

        return null;
    };

    const configuredResult = await tryModels(getConfiguredCandidateModels());
    if (configuredResult) {
        return configuredResult;
    }

    if (sawModelNotFound) {
        const discoveredModels = await discoverModels(geminiApiKey);
        const discoveredResult = await tryModels(discoveredModels);
        if (discoveredResult) {
            return discoveredResult;
        }
    }

    if (lastError) {
        throw new Error(mapGeminiError(lastError));
    }

    // Should never happen, but keep a safe fallback for unknown states.
    throw new Error('Unable to generate an AI recipe right now. Please try again.');
}
