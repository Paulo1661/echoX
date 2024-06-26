import Footer from './components/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import { AllWalletsProvider } from './services/wallets/AllWalletsProvider';
import colorBackground from './assets/colors.png';
import { theme } from './theme';
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Buy from './pages/ByTable';
import Sell from './pages/SellTable';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AllWalletsProvider>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: '#222222',
            backgroundImage: `url(${colorBackground})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        >
          <Router>
            <header>
              <NavBar />
            </header>
            <Box flex={1} p={3}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Box>
            <Footer />
          </Router>
        </Box>
      </AllWalletsProvider>
    </ThemeProvider>
  );
}

export default App;
