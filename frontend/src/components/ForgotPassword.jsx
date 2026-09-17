import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../config/api';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(buildApiUrl('/api/auth/forgot-password'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Reset token generated! Redirecting to reset password page...');
        setResetToken(data.testingToken);
        setEmail('');

        // Auto-redirect ke 2 seconds baad
        setTimeout(() => {
          navigate(`/reset-password/${data.testingToken}`);
        }, 2000);
      } else {
        setError(data.error || 'Failed to send reset link');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password?</h2>
        <p className="subtitle">Enter your email to receive reset instructions</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {resetToken && (
          <div className="token-box">
            <p className="token-label">Reset Token (for testing):</p>
            <code className="token-value">{resetToken}</code>
            <button
              type="button"
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(resetToken)}
            >
              Copy Token
            </button>
          </div>
        )}

        <p className="login-link">
          Remember your password? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;