import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(form.email, form.password);
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay" />
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-text">OL7</span>
          <span className="login-logo-sub">MAISON DE PARFUM</span>
        </div>

        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to access your account</p>

        {error && (
          <div className="login-error">
            <i className="ri-error-warning-line" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="input-wrapper">
              <i className="ri-mail-line input-icon" />
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <i className="ri-lock-line input-icon" />
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="btn-loading"><i className="ri-loader-4-line spin" /> Signing in…</span>
            ) : (
              <><i className="ri-login-box-line" /> Sign In</>
            )}
          </button>
        </form>

        <p className="login-footer-text">
          Don't have an account?{' '}
          <Link to="/register" className="login-link">Create one</Link>
        </p>
        <Link to="/" className="login-back-link">
          <i className="ri-arrow-left-line" /> Back to Store
        </Link>
      </div>
    </div>
  );
}
