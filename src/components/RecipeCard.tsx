import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { hasSpoonacularApiKey, spoonacularApiKey } from '../config/env';

interface RecipeCardProps {
    title: string;
    image: string;
    id: number;
}

const hasSpoonacularKey = hasSpoonacularApiKey;

export default function RecipeCard({ title, image, id }: RecipeCardProps) {
    const handleView = async () => {
        if (!hasSpoonacularKey || !spoonacularApiKey) {
            console.warn('Spoonacular API key not set. Cannot open recipe details.');
            return;
        }

        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularApiKey}`
            );

            if (!response.ok) {
                const errorPayload = await response.json().catch(() => null);
                const apiMessage =
                    errorPayload && typeof errorPayload.message === 'string'
                        ? errorPayload.message
                        : `Spoonacular details request failed (${response.status}).`;
                throw new Error(apiMessage);
            }

            const data = await response.json();
            if (data.sourceUrl) {
                window.open(data.sourceUrl, '_blank');
            }
        } catch (error) {
            console.error('Failed to fetch recipe details:', error);
        }
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <CardMedia
                component="img"
                height="180"
                image={image}
                alt={title}
                loading="lazy"
                decoding="async"
                sx={{ objectFit: 'cover', aspectRatio: '16 / 9' }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    textAlign="center"
                    sx={{ lineHeight: 1.3 }}
                >
                    {title}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={handleView}
                    disabled={!hasSpoonacularKey}
                >
                    View Recipe
                </Button>
            </CardActions>
        </Card>
    );
}
