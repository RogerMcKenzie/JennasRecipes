import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Jenna's Kitchen Mock Client
        </Typography>
        <Typography variant="body1">
          Initial Setup - Components will be added via PRs
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
