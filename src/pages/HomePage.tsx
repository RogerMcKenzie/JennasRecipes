import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Seo from '../components/Seo';
import { absoluteUrl } from '../config/site';

export default function HomePage() {
    const homeJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: "Jenna's Recipes \u2013 Home",
        url: absoluteUrl('/'),
        description:
            "Jenna's Recipes is a home cook's library of family-tested dishes, an AI recipe generator that turns your ingredients into a custom meal in seconds, and a small store of kitchen essentials.",
        primaryImageOfPage: absoluteUrl('/Images/FamilyTime.webp'),
        about: {
            '@type': 'Person',
            name: 'Jenna Dominguez',
            jobTitle: 'Home Cook',
            description:
                'Home cook Jenna Dominguez shares family-tested recipes and an AI recipe generator that builds meals from the ingredients you already have.',
        },
    };

    return (
        <Box>
            <Seo
                title="Jenna's Recipes | Family-Tested Recipes, AI Recipe Generator, and Kitchen Essentials"
                description="Jenna's Recipes is a home cook's library of family-tested dishes, an AI recipe generator that turns your ingredients into a custom meal in seconds, and a small store of kitchen essentials."
                path="/"
                image="/Images/FamilyTime.webp"
                jsonLd={homeJsonLd}
            />

            {/* Hero Section */}
            <Box
                component="section"
                aria-label="Jenna's Recipes hero"
                sx={{
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(/Images/FamilyTime.webp)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 0,
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
                        zIndex: 1,
                    },
                }}
            >
                <Box sx={{ position: 'relative', zIndex: 2, px: 3, maxWidth: 700 }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            fontWeight: 700,
                            mb: 2,
                            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                        }}
                    >
                        Jenna&apos;s Recipes
                    </Typography>
                    <Typography
                        variant="h5"
                        component="p"
                        sx={{
                            fontFamily: '"Outfit", sans-serif',
                            fontWeight: 300,
                            opacity: 0.9,
                            mb: 4,
                            fontSize: { xs: '1.1rem', md: '1.4rem' },
                            letterSpacing: '2px',
                        }}
                    >
                        Authentic Cooking, Authentic Recipes, Authentic Love
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            component={Link}
                            to="/recipes"
                            variant="contained"
                            size="large"
                            startIcon={<RestaurantMenuIcon />}
                            sx={{ px: 4, py: 1.5, fontSize: '1.05rem' }}
                        >
                            Explore Recipes
                        </Button>
                        <Button
                            component={Link}
                            to="/store"
                            variant="outlined"
                            size="large"
                            startIcon={<StorefrontIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.05rem',
                                color: 'white',
                                borderColor: 'rgba(255,255,255,0.5)',
                                backdropFilter: 'blur(10px)',
                                bgcolor: 'rgba(255,255,255,0.08)',
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                },
                            }}
                        >
                            Visit Store
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* What you can do */}
            <Box component="section" aria-label="What you can do on Jenna's Recipes" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'white' }}>
                <Container maxWidth="lg">
                    <Typography variant="h2" sx={{ mb: 1, textAlign: 'center', fontSize: { xs: '2rem', md: '2.6rem' } }}>
                        What you can do here
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ mb: 5, maxWidth: 640, mx: 'auto', fontSize: '1.05rem' }}
                    >
                        Three things, kept simple: cook a tested recipe, generate a custom one with AI, or restock the basics.
                    </Typography>
                    <Grid container spacing={3}>
                        {[
                            {
                                icon: <FavoriteIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
                                title: 'Family-tested recipes',
                                body: 'Hand-picked favorites Jenna actually cooks at home, with full ingredient lists.',
                                cta: { to: '/recipes#favorites-heading', label: 'Browse recipes' },
                            },
                            {
                                icon: <AutoAwesomeIcon sx={{ fontSize: 32, color: 'secondary.main' }} />,
                                title: 'AI recipe generator',
                                body: 'List the ingredients in your fridge and the AI returns a full recipe in seconds.',
                                cta: { to: '/recipes#ai-generator-heading', label: 'Try the generator' },
                            },
                            {
                                icon: <KitchenIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
                                title: 'Kitchen essentials',
                                body: 'A small store of cookware, knives, blenders, plates, and spices Jenna uses.',
                                cta: { to: '/store', label: 'Shop the store' },
                            },
                        ].map((item) => (
                            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                                <Box
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        borderRadius: 4,
                                        bgcolor: 'background.default',
                                        border: '1px solid #eee',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1.5,
                                    }}
                                >
                                    {item.icon}
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
                                        {item.body}
                                    </Typography>
                                    <Button component={Link} to={item.cta.to} sx={{ alignSelf: 'flex-start', px: 0 }}>
                                        {item.cta.label} &rarr;
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* About Section */}
            <Box component="section" id="about" aria-labelledby="about-heading" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography
                                id="about-heading"
                                variant="h2"
                                sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.8rem' } }}
                            >
                                About{' '}
                                <Box component="span" sx={{ color: 'primary.main' }}>
                                    Jenna
                                </Box>
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}
                            >
                                I&apos;m Jenna Dominguez, a home cook based in Miami who shares the recipes I make for my own
                                family. Every recipe on this site has been cooked, plated, and approved at my own kitchen
                                table. You&apos;ll find breakfast, lunch, dinner, dessert, and snack ideas built around
                                fresh, in-season ingredients and the kind of pantry staples most homes already have.
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Button component={Link} to="/recipes" variant="contained" size="large">
                                    See Jenna&apos;s favorite recipes
                                </Button>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                component="img"
                                src="/Images/Jenna.jpg"
                                alt="Jenna Dominguez, home cook and founder of Jenna's Recipes"
                                width={800}
                                height={1000}
                                loading="lazy"
                                decoding="async"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 4,
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'scale(1.02)' },
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Story Section */}
            <Box
                component="section"
                aria-labelledby="story-heading"
                sx={{
                    py: { xs: 6, md: 10 },
                    bgcolor: 'white',
                    borderTop: '1px solid #eee',
                    borderBottom: '1px solid #eee',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                component="img"
                                src="/Images/Jenna&Fr.webp"
                                alt="Jenna cooking with friends and family"
                                width={1000}
                                height={750}
                                loading="lazy"
                                decoding="async"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 4,
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'scale(1.02)' },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography
                                id="story-heading"
                                variant="h2"
                                sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.8rem' } }}
                            >
                                My{' '}
                                <Box component="span" sx={{ color: 'primary.main' }}>
                                    Story
                                </Box>
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}
                            >
                                Cooking started for me at my grandmother&apos;s kitchen table. She was the kind of cook who
                                didn&apos;t measure but always landed the dish, and watching her taught me that food is
                                really about pulling people together. As I got older I started writing my own recipes,
                                feeding my friends and family, and tracking what worked and what didn&apos;t. Jenna&apos;s
                                Recipes is where I publish the ones that work every time. Each recipe is one I&apos;ve
                                cooked at home and would happily serve to anyone who showed up hungry.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </Box>
    );
}
