type EnvValue = string | boolean | undefined;

type EnvSource = Record<string, EnvValue>;

const ENV = import.meta.env as EnvSource;

const PLACEHOLDER_KEY_PATTERN = /^your[_-].*key.*$/i;

function normalizeEnvValue(value: EnvValue): string | undefined {
    if (typeof value !== 'string') {
        return undefined;
    }

    const trimmed = value.trim();
    if (!trimmed || PLACEHOLDER_KEY_PATTERN.test(trimmed)) {
        return undefined;
    }

    return trimmed;
}

function firstDefinedEnv(keys: string[]): string | undefined {
    for (const key of keys) {
        const value = normalizeEnvValue(ENV[key]);
        if (value) {
            return value;
        }
    }

    return undefined;
}

export const geminiApiKey = firstDefinedEnv([
    'VITE_GEMINI_API_KEY',
    'VITE_GOOGLE_GEMINI_API_KEY',
    'VITE_GEMINI_KEY',
    'NEXT_PUBLIC_GEMINI_API_KEY',
    'NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY',
    'GEMINI_API_KEY',
    'GOOGLE_GEMINI_API_KEY',
]);

export const geminiModel = firstDefinedEnv([
    'VITE_GEMINI_MODEL',
    'NEXT_PUBLIC_GEMINI_MODEL',
    'GEMINI_MODEL',
]);

export const spoonacularApiKey = firstDefinedEnv([
    'VITE_SPOONACULAR_KEY',
    'VITE_SPOONACULAR_API_KEY',
    'NEXT_PUBLIC_SPOONACULAR_KEY',
    'NEXT_PUBLIC_SPOONACULAR_API_KEY',
    'SPOONACULAR_KEY',
    'SPOONACULAR_API_KEY',
]);

export const hasGeminiApiKey = Boolean(geminiApiKey);
export const hasSpoonacularApiKey = Boolean(spoonacularApiKey);
