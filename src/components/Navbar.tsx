import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Badge,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../hooks/useCart';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Recipes', path: '/recipes' },
    { label: 'Store', path: '/store' },
];

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { itemCount } = useCart();

    return (
        <>
            <AppBar position="sticky" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
                <Toolbar sx={{ gap: 1 }}>
                    {isMobile && (
                        <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            textDecoration: 'none',
                            color: 'inherit',
                            flexGrow: isMobile ? 1 : 0,
                        }}
                    >
                        <Box
                            component="img"
                            src="/Images/JennaRecipe.jpeg"
                            alt="Jenna's Recipes"
                            sx={{
                                width: 45,
                                height: 45,
                                borderRadius: '50%',
                                border: '2px solid rgba(255,255,255,0.4)',
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 700,
                                letterSpacing: '0.5px',
                            }}
                        >
                            Jenna's Recipes
                        </Typography>
                    </Box>

                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    color="inherit"
                                    sx={{
                                        fontSize: '1rem',
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 6,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: location.pathname === item.path ? '60%' : '0%',
                                            height: 2,
                                            bgcolor: 'white',
                                            borderRadius: 1,
                                            transition: 'width 0.3s ease',
                                        },
                                        '&:hover::after': {
                                            width: '60%',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}

                    <IconButton component={Link} to="/store" color="inherit" sx={{ ml: isMobile ? 0 : 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 260, pt: 8 }}>
                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={location.pathname === item.path}
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{ fontWeight: 500, fontSize: '1.1rem' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
