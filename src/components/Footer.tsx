import { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import GavelIcon from '@mui/icons-material/Gavel';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);

    const handleSubscribe = () => {
        if (email) {
            setSnackOpen(true);
            setEmail('');
        }
    };

    return (
        <Box
            component="footer"
            sx={{
                background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
                color: 'white',
                mt: 'auto',
                pt: 6,
                pb: 3,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Contact */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Playfair Display", serif' }}>
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <HomeIcon fontSize="small" sx={{ opacity: 0.8 }} />
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Po Box 186, Miami, FL, 33211
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <EmailIcon fontSize="small" sx={{ opacity: 0.8 }} />
                                <Typography
                                    component="a"
                                    href="mailto:JennaRecipe@gmail.com"
                                    variant="body2"
                                    sx={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                >
                                    JennaRecipe@gmail.com
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <PhoneIcon fontSize="small" sx={{ opacity: 0.8 }} />
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    (305) 967-8098
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white' } }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white' } }}>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white' } }}>
                                <TwitterIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* About */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Playfair Display", serif' }}>
                            About
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                            {[
                                { icon: <InfoIcon fontSize="small" />, label: 'About Us' },
                                { icon: <LockIcon fontSize="small" />, label: 'Privacy' },
                                { icon: <GavelIcon fontSize="small" />, label: 'Terms and Conditions' },
                            ].map((item) => (
                                <Box
                                    key={item.label}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        cursor: 'pointer',
                                        opacity: 0.8,
                                        transition: 'opacity 0.2s',
                                        '&:hover': { opacity: 1 },
                                    }}
                                >
                                    {item.icon}
                                    <Typography variant="body2">{item.label}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Newsletter */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Playfair Display", serif' }}>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, mt: 2, mb: 2 }}>
                            Subscribe to get the latest recipes and exclusive offers!
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                size="small"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'rgba(255,255,255,0.15)',
                                        borderRadius: 2,
                                        color: 'white',
                                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                        '&.Mui-focused fieldset': { borderColor: 'white' },
                                    },
                                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)' },
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSubscribe}
                                sx={{
                                    bgcolor: '#ff8c69',
                                    '&:hover': { bgcolor: '#ff613b' },
                                    borderRadius: 2,
                                    px: 3,
                                    background: 'linear-gradient(135deg, #ff8c69 0%, #ff613b 100%)',
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        borderTop: '1px solid rgba(255,255,255,0.15)',
                        mt: 4,
                        pt: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{ opacity: 0.6 }}>
                        © 2026 Jenna's Recipes. Made with love. ❤️
                    </Typography>
                </Box>
            </Container>

            <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
                <Alert severity="success" onClose={() => setSnackOpen(false)}>
                    Thanks for subscribing!
                </Alert>
            </Snackbar>
        </Box>
    );
}
