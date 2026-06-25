import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe, it, expect, vi,
} from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LoginInput from './LoginInput';
import RegisterInput from './RegisterInput';
import Navbar from './Navbar';

describe('React Component Tests', () => {
  it('1. LoginInput memanggil fungsi login dengan email dan password yang benar', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Masuk' });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password123' });
  });

  it('2. RegisterInput memanggil fungsi register dengan data yang benar', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);

    await userEvent.type(screen.getByPlaceholderText('Nama'), 'John Doe');
    await userEvent.type(screen.getByPlaceholderText('Email'), 'john@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'pass123');
    await userEvent.click(screen.getByRole('button', { name: 'Daftar' }));

    expect(mockRegister).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@test.com', password: 'pass123' });
  });

  it('3. Navbar merender link Login ketika tidak ada authUser', () => {
    const store = configureStore({ reducer: { authUser: () => null } });
    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('4. Navbar merender tombol Logout ketika ada authUser', () => {
    const store = configureStore({ reducer: { authUser: () => ({ id: 1, name: 'Test', avatar: 'ava.png' }) } });
    render(<Provider store={store}><BrowserRouter><Navbar /></BrowserRouter></Provider>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
