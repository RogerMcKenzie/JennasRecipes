import { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Divider,
    Tabs,
    Tab,
    Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import CheckoutForm from '../components/CheckoutForm';
import Seo from '../components/Seo';
import { products } from '../data/products';
import { absoluteUrl } from '../config/site';

const categories = ['All', 'Cookware', 'Knives & Blenders', 'Bowls & Plates', 'Spices'];

export default function StorePage() {
    const [activeCategory, setActiveCategory] = useState(0);

    const filteredProducts =
        activeCategory === 0
            ? products
            : products.filter((p) => p.category === categories[activeCategory]);

    const storeJsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
                { '@type': 'ListItem', position: 2, name: 'Store', item: absoluteUrl('/store') },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: "Jenna's Recipes Kitchen Store",
            url: absoluteUrl('/store'),
            description:
                'A small, curated store of cookware, knives, blenders, bowls, plates, and spices selected by home cook Jenna Dominguez.',
            mainEntity: {
                '@type': 'ItemList',
                numberOfItems: products.length,
                itemListElement: products.map((p, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    item: {
                        '@type': 'Product',
                        name: p.name,
                        category: p.category,
                        image: absoluteUrl(p.image),
                        url: absoluteUrl('/store'),
                        offers: {
                            '@type': 'Offer',
                            price: p.price.toFixed(2),
                            priceCurrency: 'USD',
                            availability: 'https://schema.org/InStock',
                        },
                    },
                })),
            },
        },
    ];

    return (
        <Box>
            <Seo
                title="Kitchen Store \u2013 Cookware, Knives, Blenders & Spices"
                description="Shop a small, curated store of kitchen essentials Jenna actually uses: cookware sets, knife sets, blenders, bowls, plates, and core spices."
                path="/store"
                image="/Images/Supplies.jpg"
                jsonLd={storeJsonLd}
            />

            {/* Intro Section */}
            <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2.2rem', md: '3rem' }, fontFamily: '"Playfair Display", serif' }}>
                                Kitchen Essentials Store
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'text.secondary', mb: 2 }}
                            >
                                A small, curated set of cookware, knives, blenders, bowls, plates, and spices &mdash;
                                the same kit Jenna uses to cook the recipes on this site. Pick a category below to
                                narrow it down, or browse all {products.length} items.
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                 Start with{' '}
                                <Box component={Link} to="/recipes" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                    Jenna&apos;s favorite recipes
                                </Box>{' '}
                                to see what these tools help you cook.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                component="img"
                                src="/Images/Supplies.jpg"
                                alt="Cookware, knives, and kitchen tools available in Jenna's Recipes store"
                                width={1200}
                                height={900}
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

            {/* Products Section */}
            <Box component="section" aria-labelledby="products-heading" sx={{ py: 6, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Typography
                        id="products-heading"
                        variant="h2"
                        component="h2"
                        textAlign="center"
                        sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
                    >
                        Our Products
                    </Typography>
                    <Typography textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
                        Quality kitchen essentials for every home chef
                    </Typography>

                    {/* Category Tabs */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                        <Tabs
                            value={activeCategory}
                            onChange={(_, val) => setActiveCategory(val)}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    minWidth: 'auto',
                                    px: 3,
                                },
                            }}
                        >
                            {categories.map((cat, i) => (
                                <Tab
                                    key={cat}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {cat}
                                            {i === 0 && (
                                                <Chip label={products.length} size="small" color="primary" sx={{ height: 20 }} />
                                            )}
                                        </Box>
                                    }
                                />
                            ))}
                        </Tabs>
                    </Box>

                    {/* Product Grid */}
                    <Grid container spacing={3}>
                        {filteredProducts.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Divider />

            {/* Cart & Checkout */}
            <Box sx={{ py: 8, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <ShoppingCart />
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <CheckoutForm />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
