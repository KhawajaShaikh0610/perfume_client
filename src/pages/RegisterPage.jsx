import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerApi(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay" />
      <div className="login-card" style={{ maxWidth: '480px' }}>
        <div className="login-logo">
          <span className="login-logo-text">OL7</span>
          <span className="login-logo-sub">MAISON DE PARFUM</span>
        </div>

        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Join the house of OL7</p>

        {error && (
          <div className="login-error">
            <i className="ri-error-warning-line" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reg-name">Full Name</label>
              <div className="input-wrapper">
                <i className="ri-user-line input-icon" />
                <input id="reg-name" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="reg-phone">Phone</label>
              <div className="input-wrapper">
                <i className="ri-phone-line input-icon" />
                <input id="reg-phone" type="text" name="phone" placeholder="+1 234 567 890" value={form.phone} onChange={handleChange} className="form-input" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">Email Address</label>
            <div className="input-wrapper">
              <i className="ri-mail-line input-icon" />
              <input id="reg-email" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <div className="input-wrapper">
              <i className="ri-lock-line input-icon" />
              <input id="reg-password" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-address">Address</label>
            <div className="input-wrapper">
              <i className="ri-map-pin-line input-icon" />
              <input id="reg-address" type="text" name="address" placeholder="Your address" value={form.address} onChange={handleChange} className="form-input" />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? (
              <span className="btn-loading"><i className="ri-loader-4-line spin" /> Creating account…</span>
            ) : (
              <><i className="ri-user-add-line" /> Create Account</>
            )}
          </button>
        </form>

        <p className="login-footer-text">
          Already have an account?{' '}
          <Link to="/login" className="login-link">Sign in</Link>
        </p>
        <Link to="/" className="login-back-link">
          <i className="ri-arrow-left-line" /> Back to Store
        </Link>
      </div>
    </div>
  );
}
