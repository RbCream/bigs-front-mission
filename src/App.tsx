import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Header from './components/Header';
import AppRoutes from './routes';
import { useAuthStore } from './store/authStore';

const App: React.FC = () => {
  const refreshAccessToken = useAuthStore(state => state.refreshAccessToken);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;