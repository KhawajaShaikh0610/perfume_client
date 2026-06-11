import React, { useEffect, useState, useCallback } from 'react';
import { getOrders, deleteOrder, updateOrderStatus } from '../../api/orderService';
import OrderDetailModal from './OrderDetailModal';

const STATUS_COLORS = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444',
};

const PAYMENT_COLORS = {
  paid: '#10b981',
  pending: '#f59e0b',
  failed: '#ef4444',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch {
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStatusChange = async (id, field, value) => {
    try {
      await updateOrderStatus(id, { [field]: value });
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, [field]: value } : o));
      showToast('Order updated!');
    } catch {
      showToast('Update failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this order? This cannot be undone.')) return;
    try {
      await deleteOrder(id);
      showToast('Order deleted');
      fetchData();
    } catch {
      showToast('Delete failed', 'error');
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch = (o.customerName || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.customerEmail || '').toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus ? o.status === filterStatus : true;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.reduce((s, o) => s + parseFloat(o.totalAmount || 0), 0);

  return (
    <div className="admin-page">
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          <i className={toast.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'} />
          {toast.msg}
        </div>
      )}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Orders</h1>
          <p className="admin-page-subtitle">{orders.length} orders · Total revenue: ₹{totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-box">
          <i className="ri-search-line" />
          <input
            type="text"
            placeholder="Search by customer or order ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="order-search"
          />
        </div>
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          id="order-status-filter"
        >
          <option value="">All Statuses</option>
          {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="table-empty"><i className="ri-loader-4-line spin" /> Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="table-empty">No orders found</td></tr>
            ) : filtered.map((order) => (
              <tr key={order.id}>
                <td className="order-id-cell" title={order.id}>#{order.id.slice(0, 8)}…</td>
                <td>
                  <div className="customer-cell">
                    <span className="customer-name">{order.customerName || 'Guest'}</span>
                    {order.customerEmail && <span className="customer-email">{order.customerEmail}</span>}
                  </div>
                </td>
                <td className="amount-cell">₹{parseFloat(order.totalAmount).toFixed(2)}</td>
                <td><span className="badge badge-outline">{order.paymentMethod}</span></td>
                <td>
                  <select
                    className="inline-select"
                    value={order.paymentStatus}
                    style={{ '--s-color': PAYMENT_COLORS[order.paymentStatus] || '#888' }}
                    onChange={(e) => handleStatusChange(order.id, 'paymentStatus', e.target.value)}
                  >
                    {['pending', 'paid', 'failed'].map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="inline-select"
                    value={order.status}
                    style={{ '--s-color': STATUS_COLORS[order.status] || '#888' }}
                    onChange={(e) => handleStatusChange(order.id, 'status', e.target.value)}
                  >
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn view" onClick={() => setSelectedOrder(order)} title="View Details">
                      <i className="ri-eye-line" />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(order.id)} title="Delete">
                      <i className="ri-delete-bin-line" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
