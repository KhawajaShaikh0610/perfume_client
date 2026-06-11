import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const { adminLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!secretKey.trim()) {
      setError('Please enter the admin secret key.');
      return;
    }
    try {
      await adminLogin(secretKey);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Invalid secret key.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay" />
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-text">LOREN</span>
          <span className="login-logo-sub">MAISON DE PARFUM</span>
        </div>

        {/* Admin shield icon */}
        <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #c5a880 0%, #9c7a50 100%)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(197,168,128,0.35)',
          }}>
            <i className="ri-shield-keyhole-line" style={{ fontSize: '1.6rem', color: '#1e120e' }} />
          </div>
        </div>

        <h1 className="login-title">Admin Access</h1>
        <p className="login-subtitle">Enter the secret key to access the admin panel</p>

        {error && (
          <div className="login-error">
            <i className="ri-error-warning-line" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="admin-secret-key">Secret Key</label>
            <div className="input-wrapper">
              <i className="ri-key-2-line input-icon" />
              <input
                id="admin-secret-key"
                type={showKey ? 'text' : 'password'}
                placeholder="Enter admin secret key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                className="form-input"
                autoComplete="off"
                style={{ paddingRight: '2.6rem' }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute', right: '0.7rem', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: '#9c8575',
                  fontSize: '1rem', padding: '2px',
                }}
                tabIndex={-1}
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                <i className={showKey ? 'ri-eye-off-line' : 'ri-eye-line'} />
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full" disabled={loading} id="admin-login-btn">
            {loading ? (
              <span className="btn-loading"><i className="ri-loader-4-line spin" /> Authenticating…</span>
            ) : (
              <><i className="ri-shield-check-line" /> Access Admin Panel</>
            )}
          </button>
        </form>

        <Link to="/" className="login-back-link">
          <i className="ri-arrow-left-line" /> Back to Store
        </Link>
      </div>
    </div>
  );
}
