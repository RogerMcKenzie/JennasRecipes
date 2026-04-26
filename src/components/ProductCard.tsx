import { Card, CardMedia, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../hooks/useCart';
import type { Product } from '../data/products';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    zIndex: 1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
            >
                {product.category}
            </Box>
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={`${product.name} \u2014 ${product.category}`}
                loading="lazy"
                decoding="async"
                sx={{ objectFit: 'cover', aspectRatio: '4 / 3' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1rem' }}>
                    {product.name}
                </Typography>
                <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={700}
                    sx={{ fontFamily: '"Outfit", sans-serif' }}
                >
                    ${product.price.toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => addToCart(product.name, product.price, product.id)}
                    sx={{ borderRadius: 3 }}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}
