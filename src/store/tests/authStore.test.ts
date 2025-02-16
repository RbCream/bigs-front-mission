import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthStore } from '../authStore';
import * as authService from '../../services/auth';

jest.mock('../../services/auth');

describe('authStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.getState().logout();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.accessToken).toBeNull();
    expect(result.current.refreshToken).toBeNull();
  });

  it('should login user', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
    const mockResponse = { user: mockUser, accessToken: 'token', refreshToken: 'refresh' };
    (authService.login as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.accessToken).toBe('token');
    expect(result.current.refreshToken).toBe('refresh');
  });

  it('should signup user', async () => {
    const mockUser = { id: 2, username: 'newuser', email: 'new@example.com' };
    const mockResponse = { user: mockUser, accessToken: 'newtoken', refreshToken: 'newrefresh' };
    (authService.signup as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.signup({ username: 'newuser', email: 'new@example.com', password: 'newpassword' });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.accessToken).toBe('newtoken');
    expect(result.current.refreshToken).toBe('newrefresh');
  });

  it('should logout user', async () => {
    const { result } = renderHook(() => useAuthStore());

    // First, login the user
    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(result.current.isAuthenticated).toBe(true);

    // Then, logout
    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.accessToken).toBeNull();
    expect(result.current.refreshToken).toBeNull();
  });

  it('should refresh access token', async () => {
    const mockResponse = { accessToken: 'newtoken', refreshToken: 'newrefresh' };
    (authService.refreshToken as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuthStore());

    // First, set some initial state
    act(() => {
      useAuthStore.setState({ refreshToken: 'oldrefresh' });
    });

    await act(async () => {
      await result.current.refreshAccessToken();
    });

    expect(result.current.accessToken).toBe('newtoken');
    expect(result.current.refreshToken).toBe('newrefresh');
  });

  it('should handle login failure', async () => {
    (authService.login as jest.Mock).mockRejectedValue(new Error('Login failed'));

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await expect(result.current.login({ email: 'test@example.com', password: 'wrong' })).rejects.toThrow('Login failed');
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.accessToken).toBeNull();
    expect(result.current.refreshToken).toBeNull();
  });
});
