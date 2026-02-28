import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Snackbar,
    Alert,
    Divider,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useCart } from '../hooks/useCart';

export default function CheckoutForm() {
    const { clearCart, total } = useCart();
    const [snackOpen, setSnackOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSnackOpen(true);
        clearCart();
    };

    return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e0e0e0' }}>
            <Box component="form" onSubmit={handleSubmit}>
                {/* Shipping */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <LocalShippingIcon color="primary" />
                    <Typography variant="h6" fontWeight={600}>
                        Shipping Details
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Full Name" placeholder="John Doe" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Email" type="email" placeholder="example@example.com" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Address" placeholder="1234 Street" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="City" placeholder="Miami" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="State" placeholder="Florida" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="Zip Code" placeholder="12345" size="small" />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Payment */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <CreditCardIcon color="primary" />
                    <Typography variant="h6" fontWeight={600}>
                        Payment Details
                    </Typography>
                    <Box
                        component="img"
                        src="/card_img.png"
                        alt="Accepted cards"
                        sx={{ height: 28, ml: 'auto', filter: 'drop-shadow(0 0 1px #000)' }}
                    />
                </Box>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Name on Card" placeholder="John Doe" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Card Number" placeholder="1111-2222-3333-4444" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="Exp Month" placeholder="January" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="Exp Year" placeholder="2026" type="number" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="CVV" placeholder="123" size="small" />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={total === 0}
                    sx={{
                        mt: 3,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: 3,
                    }}
                >
                    Checkout · ${total.toFixed(2)}
                </Button>
            </Box>

            <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)}>
                <Alert severity="success" onClose={() => setSnackOpen(false)}>
                    Order placed successfully! Thank you for shopping with Jenna's Recipes.
                </Alert>
            </Snackbar>
        </Paper>
    );
}
