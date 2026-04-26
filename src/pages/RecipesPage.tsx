import { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    CircularProgress,
    InputAdornment,
    Divider,
    Skeleton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import FlipCard from '../components/FlipCard';
import AIRecipeCard from '../components/AIRecipeCard';
import RecipeCard from '../components/RecipeCard';
import Seo from '../components/Seo';
import { favorites } from '../data/favorites';
import { generateRecipe, hasGeminiApiKey } from '../services/aiService';
import { hasSpoonacularApiKey, spoonacularApiKey } from '../config/env';
import { absoluteUrl } from '../config/site';
import type { AIRecipe } from '../services/aiService';

const hasSpoonacularKey = hasSpoonacularApiKey;

interface RecipeResult {
    id: number;
    title: string;
    image: string;
}

export default function RecipesPage() {
    const [query, setQuery] = useState('');
    const [aiRecipe, setAiRecipe] = useState<AIRecipe | null>(null);
    const [recipes, setRecipes] = useState<RecipeResult[]>([]);
    const [aiLoading, setAiLoading] = useState(false);
    const [webLoading, setWebLoading] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);
    const [webError, setWebError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const handleGenerate = async () => {
        const trimmed = query.trim();
        if (!trimmed) return;

        setSearched(true);
        setAiLoading(true);
        setWebLoading(true);
        setAiRecipe(null);
        setRecipes([]);
        setAiError(null);
        setWebError(null);

        const parts = trimmed.split(/[,\n]+/).map((s) => s.trim()).filter(Boolean);

        // Fire both AI and Spoonacular in parallel
        const aiPromise = generateRecipe(parts)
            .then((recipe) => {
                setAiRecipe(recipe);
                if (!recipe) {
                    setAiError(
                        hasGeminiApiKey
                            ? 'AI recipe generation failed. Please try again with different ingredients.'
                            : 'Set up a Gemini API key (VITE_GEMINI_API_KEY) in .env or Vercel, then redeploy to enable AI recipe generation.'
                    );
                }
            })
            .catch((err) => {
                console.error('AI generation failed:', err);
                setAiRecipe(null);

                if (!hasGeminiApiKey) {
                    setAiError('Set up a Gemini API key (VITE_GEMINI_API_KEY) in .env or Vercel, then redeploy to enable AI recipe generation.');
                    return;
                }

                setAiError(
                    err instanceof Error && err.message
                        ? err.message
                        : 'AI recipe generation failed. Please try again with different ingredients.'
                );
            })
            .finally(() => setAiLoading(false));

        const webPromise = !hasSpoonacularKey
            ? Promise.resolve()
                  .then(() => {
                      setRecipes([]);
                      setWebError('Set up a Spoonacular API key (VITE_SPOONACULAR_KEY) in .env or Vercel, then redeploy to enable web recipe search.');
                  })
                  .finally(() => setWebLoading(false))
            : fetch(
                  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${encodeURIComponent(trimmed)}`
              )
                  .then(async (res) => {
                      if (!res.ok) {
                          const errorPayload = await res.json().catch(() => null);
                          const apiMessage =
                              errorPayload && typeof errorPayload.message === 'string'
                                  ? errorPayload.message
                                  : null;
                          throw new Error(apiMessage ?? `Spoonacular request failed (${res.status}).`);
                      }
                      return res.json();
                  })
                  .then((data) => {
                      const nextRecipes = Array.isArray(data.results) ? data.results : [];
                      setRecipes(nextRecipes);
                      if (nextRecipes.length === 0) {
                          setWebError('No additional recipes found.');
                      }
                  })
                  .catch((err) => {
                      console.error('Spoonacular fetch failed:', err);
                      setRecipes([]);
                      setWebError(
                          err instanceof Error
                              ? err.message
                              : 'Unable to fetch additional recipes right now. Please try again.'
                      );
                  })
                  .finally(() => setWebLoading(false));

        await Promise.all([aiPromise, webPromise]);
    };

    const recipesJsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
                { '@type': 'ListItem', position: 2, name: 'Recipes', item: absoluteUrl('/recipes') },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: "Jenna's Favorite Recipes",
            url: absoluteUrl('/recipes'),
            description:
                "Family-tested recipes from home cook Jenna Dominguez, plus an AI recipe generator that builds a custom recipe from the ingredients you have.",
            hasPart: favorites.map((r) => ({
                '@type': 'Recipe',
                name: r.title,
                image: absoluteUrl(r.image),
                author: { '@type': 'Person', name: 'Jenna Dominguez' },
                recipeIngredient: r.ingredients,
            })),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: "Jenna's AI Recipe Generator",
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Any',
            description:
                'Free AI recipe generator that turns the ingredients you list into a full recipe with cook time, servings, difficulty, ingredients, step-by-step instructions, and a chef\u2019s tip.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
    ];

    return (
        <Box>
            <Seo
                title="Recipes & AI Recipe Generator"
                description="Browse Jenna's family-tested recipes or use the free AI recipe generator: list the ingredients you have and get a full recipe \u2014 cook time, servings, ingredients, and step-by-step instructions \u2014 in seconds."
                path="/recipes"
                image="/Images/JennaDos.jpg"
                jsonLd={recipesJsonLd}
            />

            {/* Intro Section */}
            <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2.2rem', md: '3rem' }, fontFamily: '"Playfair Display", serif' }}>
                                Recipes &amp; AI Recipe Generator
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary', mb: 2 }}
                            >
                                Two ways to find your next meal. Browse Jenna&apos;s family-tested favorites below, or
                                type the ingredients in your fridge into the AI recipe generator and get a full recipe
                                in seconds &mdash; cook time, servings, difficulty, ingredients, and step-by-step
                                instructions.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontStyle: 'italic' }}
                            >
                                Looking for cookware to cook these in? See the{' '}
                                <Box component={Link} to="/store" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                    kitchen essentials store
                                </Box>
                                .
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                component="img"
                                src="/Images/JennaDos.jpg"
                                alt="Jenna cooking in her home kitchen"
                                width={1200}
                                height={1500}
                                loading="lazy"
                                decoding="async"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 4,
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* AI Recipe Generator */}
            <Box component="section" aria-labelledby="ai-generator-heading" sx={{ py: 8, bgcolor: 'white' }}>
                <Container maxWidth="md">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2 }}>
                        <AutoAwesomeIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                        <Typography
                            id="ai-generator-heading"
                            variant="h2"
                            component="h2"
                            textAlign="center"
                            sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' } }}
                        >
                            AI Recipe Generator
                        </Typography>
                    </Box>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                    >
                        Type ingredients separated by commas (e.g. &ldquo;chicken, rice, lime, cilantro&rdquo;) or a
                        dish name. The AI returns a complete recipe with cook time, servings, ingredients, and
                        instructions.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="List Ingredients or Dish Name"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleGenerate();
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AutoAwesomeIcon color="primary" sx={{ fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    boxShadow: '0px 3px 15px rgba(0,0,0,0.08)',
                                    borderRadius: 3,
                                    bgcolor: '#fafafa',
                                    '& fieldset': { borderColor: 'transparent' },
                                    '&:hover fieldset': { borderColor: 'primary.light' },
                                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleGenerate}
                            disabled={aiLoading || webLoading}
                            startIcon={
                                aiLoading || webLoading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    <AutoAwesomeIcon />
                                )
                            }
                            sx={{ px: 5, py: 1.5 }}
                        >
                            {aiLoading || webLoading ? 'Generating...' : 'Generate Recipe!'}
                        </Button>
                    </Box>

                    {/* Results */}
                    {searched && (
                        <Box sx={{ mt: 5 }}>
                            {/* AI-Generated Recipe */}
                            {aiLoading ? (
                                <Box>
                                    <Skeleton variant="rounded" height={60} sx={{ mb: 2, borderRadius: 3 }} />
                                    <Skeleton variant="rounded" height={200} sx={{ borderRadius: 3 }} />
                                </Box>
                            ) : aiRecipe ? (
                                <AIRecipeCard recipe={aiRecipe} />
                            ) : (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontStyle: 'italic',
                                        textAlign: 'center',
                                        py: 3,
                                        bgcolor: '#f9f9f9',
                                        borderRadius: 3,
                                    }}
                                >
                                    {aiError ?? 'AI recipe generation failed. Please try again with different ingredients.'}
                                </Typography>
                            )}

                            {/* More Recipes from the Web */}
                            <Divider sx={{ my: 4 }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                                <SearchIcon sx={{ color: 'primary.main' }} />
                                <Typography
                                    component="h3"
                                    variant="h5"
                                    sx={{ fontWeight: 700, fontSize: { xs: '1.2rem', md: '1.5rem' } }}
                                >
                                    More Recipes from the Web
                                </Typography>
                            </Box>

                            {webLoading ? (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <CircularProgress />
                                </Box>
                            ) : recipes.length > 0 ? (
                                <Grid container spacing={3}>
                                    {recipes.map((recipe) => (
                                        <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                            <RecipeCard title={recipe.title} image={recipe.image} id={recipe.id} />
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography textAlign="center" color="text.secondary">
                                    {webError ?? 'No additional recipes found.'}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Container>
            </Box>

            <Divider />

            {/* Jenna's Favorites */}
            <Box component="section" aria-labelledby="favorites-heading" sx={{ py: 8, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Typography
                        id="favorites-heading"
                        variant="h2"
                        component="h2"
                        textAlign="center"
                        sx={{ mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
                    >
                        Jenna&apos;s Favorite Recipes
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ mb: 6, maxWidth: 500, mx: 'auto' }}
                    >
                        Hover or tap to see the ingredients for each recipe
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {favorites.map((recipe) => (
                            <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 3 }}>
                                <FlipCard recipe={recipe} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
