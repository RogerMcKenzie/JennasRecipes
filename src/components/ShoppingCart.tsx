import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../hooks/useCart';

export default function ShoppingCart() {
    const { items, removeFromCart, total } = useCart();

    if (items.length === 0) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    bgcolor: 'rgba(46, 125, 50, 0.04)',
                    borderRadius: 4,
                    border: '2px dashed rgba(46, 125, 50, 0.2)',
                }}
            >
                <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.4, mb: 1 }} />
                <Typography color="text.secondary">Your cart is empty</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Browse the store and add some items!
                </Typography>
            </Paper>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <ShoppingCartIcon color="primary" />
                <Typography variant="h5" fontWeight={600}>
                    Shopping Cart
                </Typography>
                <Chip label={`${items.length} items`} size="small" color="primary" variant="outlined" />
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'rgba(46, 125, 50, 0.06)' }}>
                            <TableCell sx={{ fontWeight: 600 }}>Item</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>Qty</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="center">
                                    <Chip label={item.quantity} size="small" variant="outlined" />
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 500 }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </TableCell>
                                <TableCell align="right" sx={{ width: 50 }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => removeFromCart(item.id)}
                                        color="error"
                                        sx={{ opacity: 0.6, '&:hover': { opacity: 1 } }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Paper
                elevation={0}
                sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" fontWeight={600}>
                    Total
                </Typography>
                <Typography variant="h5" fontWeight={700} color="primary">
                    ${total.toFixed(2)}
                </Typography>
            </Paper>
        </Box>
    );
}
