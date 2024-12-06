import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, CircularProgress } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CheckListPage from './pages/CheckListPage';
import { useAuth } from './context/AuthContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#640D5F'
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    }
  }
});

function App() {
  const { logout, isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default'
        }}
      >
        {isAuthenticated ? (
          <>
            <Navbar onLogout={logout} />
            <Box
              component="main"
              sx={{
                mt: 8,
                mb: 4,
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/checklist" element={<CheckListPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
