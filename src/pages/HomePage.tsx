import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function HomePage() {
    return (
        <Box>
            {/* Hero Section */}
            <Box
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
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
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
                        Jenna's Recipes
                    </Typography>
                    <Typography
                        variant="h5"
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
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.05rem',
                            }}
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

            {/* About Section */}
            <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h2" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                                About{' '}
                                <Box component="span" sx={{ color: 'primary.main' }}>
                                    Me
                                </Box>
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}
                            >
                                Welcome to Jenna's Recipes, the website where you can find easy and delicious recipes
                                for every occasion. My name is Jenna Dominguez, and I am a home cook who loves to share
                                my passion for food with you. Whether you are looking for breakfast, lunch, dinner,
                                dessert, or snack ideas, you will find something to suit your taste and budget here. All
                                my recipes are made with fresh and seasonal ingredients, and they are tested and approved
                                by my family and friends. So, what are you waiting for? Browse through my website and
                                discover the joy of cooking and baking with me.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                component="img"
                                src="/Images/Jenna.jpg"
                                alt="Jenna Dominguez"
                                sx={{
                                    width: '100%',
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
                                alt="Jenna and friends"
                                sx={{
                                    width: '100%',
                                    borderRadius: 4,
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'scale(1.02)' },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h2" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.8rem' } }}>
                                My{' '}
                                <Box component="span" sx={{ color: 'primary.main' }}>
                                    Story
                                </Box>
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}
                            >
                                My name is Jenna Dominguez, and my journey in the kitchen began when I was a little
                                girl, watching my grandmother cook. Her kitchen was a magical place, filled with the
                                aroma of spices and the warmth of love. She taught me that cooking wasn't just about
                                feeding people, but about bringing them together, creating memories, and expressing love.
                                As I grew older, this passion for food only grew stronger. I started experimenting with
                                different ingredients, creating my own recipes, and sharing them with my family and
                                friends. Their smiles and compliments were my biggest reward. Today, I want to share this
                                joy with you. Through Jenna's Recipes, I hope to inspire you to create your own culinary
                                masterpieces, to explore the world of flavors, and to discover the joy of cooking. Every
                                recipe on this site is a piece of my heart, made with love and passion. So, come join me
                                on this delicious journey. Let's create beautiful memories, one recipe at a time.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
