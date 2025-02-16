import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials } from '../types/auth';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { control, handleSubmit } = useForm<LoginCredentials>();
  const login = useAuthStore(state => state.login);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
      // 로그인 성공 후 이전 페이지로 리다이렉트 (없으면 홈으로)
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Username is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Username"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
