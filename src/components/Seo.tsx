import { Fragment } from 'react';
import { DEFAULT_OG_IMAGE, SITE_NAME, TWITTER_HANDLE, absoluteUrl } from '../config/site';

interface SeoProps {
    title: string;
    description: string;
    path: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    jsonLd?: object | object[];
    noIndex?: boolean;
}

/**
 * React 19 hoists `<title>`, `<meta>`, and `<link>` tags rendered anywhere in the
 * tree to <head>, so each page can declare its own SEO metadata inline.
 * Inline JSON-LD scripts render in the body, which all major search engines
 * (Google, Bing) and answer engines accept as valid structured data.
 */
export default function Seo({
    title,
    description,
    path,
    image = DEFAULT_OG_IMAGE,
    type = 'website',
    jsonLd,
    noIndex = false,
}: SeoProps) {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const canonical = absoluteUrl(path);
    const ogImage = absoluteUrl(image);
    const ldArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

    return (
        <Fragment>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            {noIndex && <meta name="robots" content="noindex,nofollow" />}

            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:locale" content="en_US" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {ldArray.map((ld, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
                />
            ))}
        </Fragment>
    );
}
