import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPerfumes } from '../api/perfumeService';
import { getCategories } from '../api/categoryService';
import { getOrders } from '../api/orderService';

function StatCard({ icon, label, value, color, to }) {
  return (
    <Link to={to} className="stat-card" style={{ '--accent': color }}>
      <div className="stat-icon">
        <i className={icon} />
      </div>
      <div className="stat-info">
        <span className="stat-value">{value ?? '—'}</span>
        <span className="stat-label">{label}</span>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ perfumes: null, categories: null, orders: null, revenue: null });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [perfRes, catRes, ordRes] = await Promise.all([
          getPerfumes(),
          getCategories(),
          getOrders().catch(() => ({ data: [] })),
        ]);
        const orders = ordRes.data || [];
        const revenue = orders.reduce((sum, o) => sum + parseFloat(o.totalAmount || 0), 0);
        setStats({
          perfumes: perfRes.data.length,
          categories: catRes.data.length,
          orders: orders.length,
          revenue: revenue.toFixed(2),
        });
        setRecentOrders(orders.slice(0, 5));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusColor = {
    pending: '#f59e0b',
    processing: '#3b82f6',
    shipped: '#8b5cf6',
    delivered: '#10b981',
    cancelled: '#ef4444',
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Welcome back! Here's what's happening.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard icon="ri-flask-line" label="Total Perfumes" value={loading ? '…' : stats.perfumes} color="#c5a880" to="/admin/perfumes" />
        <StatCard icon="ri-price-tag-3-line" label="Categories" value={loading ? '…' : stats.categories} color="#8b5cf6" to="/admin/categories" />
        <StatCard icon="ri-shopping-bag-3-line" label="Total Orders" value={loading ? '…' : stats.orders} color="#3b82f6" to="/admin/orders" />
        <StatCard icon="ri-money-dollar-circle-line" label="Total Revenue" value={loading ? '…' : `₹${stats.revenue}`} color="#10b981" to="/admin/orders" />
      </div>

      {/* Recent Orders */}
      <div className="admin-section">
        <div className="section-header">
          <h2 className="section-title">Recent Orders</h2>
          <Link to="/admin/orders" className="section-link">View all <i className="ri-arrow-right-line" /></Link>
        </div>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="table-empty"><i className="ri-loader-4-line spin" /> Loading…</td></tr>
              ) : recentOrders.length === 0 ? (
                <tr><td colSpan={5} className="table-empty">No orders yet</td></tr>
              ) : recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id-cell">#{order.id.slice(0, 8)}…</td>
                  <td>{order.customerName || 'Guest'}</td>
                  <td className="amount-cell">₹{parseFloat(order.totalAmount).toFixed(2)}</td>
                  <td><span className="badge badge-outline">{order.paymentMethod}</span></td>
                  <td>
                    <span className="status-badge" style={{ '--s-color': statusColor[order.status] || '#888' }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
