import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, dispatchAuthEvent } from '../services/authService';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(email, password);
      dispatchAuthEvent();
      
      // Delay - browser ko password save karne ka time de
      setTimeout(() => {
        navigate('/products');
      }, 800);
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} method="POST" name="loginForm">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-links">
          <p className="signup-link">
            Don't have an account?{' '}
            <a href="/signup">Sign up here</a>
          </p>
          <p className="forgot-password-link">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;