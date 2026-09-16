const BACKEND_URL = 'https://ims-mern.onrender.com/api';

// User Signup
export const signupUser = async (email, password, name) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    // Store token in localStorage
    localStorage.setItem('auth-token', data.token);
    localStorage.setItem('user-id', data.user.id);
    localStorage.setItem('user-email', data.user.email);

    return data;
  } catch (error) {
    throw error;
  }
};

// User Login
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store token in localStorage
    localStorage.setItem('auth-token', data.token);
    localStorage.setItem('user-id', data.user.id);
    localStorage.setItem('user-email', data.user.email);

    return data;
  } catch (error) {
    throw error;
  }
};

// Get Auth Token
export const getAuthToken = () => {
  return localStorage.getItem('auth-token');
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('auth-token');
  localStorage.removeItem('user-id');
  localStorage.removeItem('user-email');
};

// Check if user is logged in
export const isUserLoggedIn = () => {
  return !!localStorage.getItem('auth-token');
};

// Add this at the end of authService.js

// Dispatch custom event when login/signup happens
export const dispatchAuthEvent = () => {
  window.dispatchEvent(new Event('auth-change'));
};