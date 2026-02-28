import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import type { FavoriteRecipe } from '../data/favorites';

interface FlipCardProps {
    recipe: FavoriteRecipe;
}

export default function FlipCard({ recipe }: FlipCardProps) {
    const [flipped, setFlipped] = useState(false);

    return (
        <Box
            onClick={() => setFlipped(!flipped)}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            sx={{
                width: '100%',
                maxWidth: 300,
                height: 420,
                perspective: '1000px',
                cursor: 'pointer',
                mx: 'auto',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Front */}
                <Paper
                    elevation={4}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        borderRadius: 4,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        component="img"
                        src={recipe.image}
                        alt={recipe.title}
                        sx={{
                            width: '100%',
                            height: '75%',
                            objectFit: 'cover',
                        }}
                    />
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 2,
                            background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 600,
                                textAlign: 'center',
                                color: '#2d2d2d',
                            }}
                        >
                            {recipe.title}
                        </Typography>
                    </Box>
                </Paper>

                {/* Back */}
                <Paper
                    elevation={4}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 600,
                                mb: 2,
                                textAlign: 'center',
                                borderBottom: '1px solid rgba(255,255,255,0.3)',
                                pb: 1,
                            }}
                        >
                            {recipe.title}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ opacity: 0.7, mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}
                        >
                            Ingredients
                        </Typography>
                        <Box component="ul" sx={{ m: 0, pl: 2, flex: 1, overflow: 'auto' }}>
                            {recipe.ingredients.map((ing, i) => (
                                <Typography
                                    key={i}
                                    component="li"
                                    variant="body2"
                                    sx={{ mb: 0.5, opacity: 0.9, fontSize: '0.85rem' }}
                                >
                                    {ing}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
