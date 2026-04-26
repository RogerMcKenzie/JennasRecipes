const RAW_SITE_URL =
    (import.meta.env?.VITE_SITE_URL as string | undefined)?.trim() ||
    'https://www.jennasrecipes.com';

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '');

export const SITE_NAME = "Jenna's Recipes";

export const SITE_TAGLINE = 'AI-powered home cooking, recipes, and kitchen essentials';

export const SITE_DESCRIPTION =
    "Jenna's Recipes is a home cook's library of family-tested dishes, an AI recipe generator that turns your ingredients into a custom meal in seconds, and a small store of kitchen essentials.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/Images/JennaRecipe.jpeg`;

export const TWITTER_HANDLE = '@jennasrecipes';

export function absoluteUrl(path: string = '/'): string {
    if (/^https?:\/\//i.test(path)) {
        return path;
    }
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
