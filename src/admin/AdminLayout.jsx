import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'ri-dashboard-3-line', end: true },
  { to: '/admin/perfumes', label: 'Perfumes', icon: 'ri-flask-line' },
  { to: '/admin/categories', label: 'Categories', icon: 'ri-price-tag-3-line' },
  { to: '/admin/orders', label: 'Orders', icon: 'ri-shopping-bag-3-line' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="admin-sidebar-header">
          <div className="admin-brand">
            <span className="admin-brand-name">LOREN</span>
            {sidebarOpen && <span className="admin-brand-sub">Admin Panel</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} id="sidebar-toggle-btn">
            <i className={sidebarOpen ? 'ri-arrow-left-s-line' : 'ri-arrow-right-s-line'} />
          </button>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <i className={item.icon} />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <NavLink to="/" className="admin-nav-item">
            <i className="ri-store-2-line" />
            {sidebarOpen && <span>View Store</span>}
          </NavLink>
          <button className="admin-nav-item admin-logout" onClick={handleLogout} id="admin-logout-btn">
            <i className="ri-logout-box-r-line" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <h2 className="admin-topbar-title">Admin Panel</h2>
          </div>
          <div className="admin-topbar-right">
            <div className="admin-user-badge">
              <div className="admin-user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">{user?.name}</span>
                <span className="admin-user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
