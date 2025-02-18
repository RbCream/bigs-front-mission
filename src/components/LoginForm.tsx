import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials } from '../types/auth';

const StyledPaper = {
  padding: '20px',
  marginTop: '20px'
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { control, handleSubmit } = useForm<LoginCredentials>();
  const login = useAuthStore(state => state.login);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);

      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      if (error instanceof Error) {
        alert('로그인 실패: 아이디나 비밀번호가 일치하지 않습니다.' );       } else {
        alert('로그인 실패');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={StyledPaper}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: '아이디는 필수 입력 항목입니다.' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Login ID"
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
            rules={{ required: '비밀번호는 필수 입력 항목입니다.' }}
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