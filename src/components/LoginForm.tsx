import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useAuthStore } from '../store/authStore';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<{ email: string; password: string }>();
  const login = useAuthStore(state => state.login);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data);
      navigate('/');
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
            rules={{ required: 'Email is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
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
