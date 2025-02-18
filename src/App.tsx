import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Header from './components/Header';
import AppRoutes from './routes';
import { useAuthStore } from './store/authStore';
import './App.css';

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
      <div style={{ minWidth: '600px', maxWidth: '768px' , margin: '0 auto' }}>
          <AppRoutes />
      </div>
        </Router>
    </ThemeProvider>
  );
};

export default App;