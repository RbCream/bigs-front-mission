import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          My Blog
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography variant="subtitle1" style={{ marginRight: '1rem' }}>
              Welcome, {user?.username}
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
