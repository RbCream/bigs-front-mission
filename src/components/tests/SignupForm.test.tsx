import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignupForm from '../SignupForm';
import { useAuthStore } from '../../store/authStore';

// Mock the useAuthStore
jest.mock('../../store/authStore');

describe('SignupForm', () => {
  it('renders signup form', () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('submits the form with user input', async () => {
    const mockSignup = jest.fn();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ signup: mockSignup });

    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});
