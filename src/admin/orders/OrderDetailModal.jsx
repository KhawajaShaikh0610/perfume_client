import React from 'react';

const STATUS_COLORS = {
  pending: '#f59e0b', processing: '#3b82f6', shipped: '#8b5cf6',
  delivered: '#10b981', cancelled: '#ef4444',
};

export default function OrderDetailModal({ order, onClose }) {
  const items = order.items || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Order Details</h2>
            <p className="modal-subtitle">#{order.id}</p>
          </div>
          <button className="modal-close" onClick={onClose} id="order-modal-close">
            <i className="ri-close-line" />
          </button>
        </div>

        <div className="order-detail-grid">
          {/* Customer Info */}
          <div className="order-detail-section">
            <h3 className="detail-section-title"><i className="ri-user-line" /> Customer</h3>
            <div className="detail-rows">
              <div className="detail-row"><span>Name</span><strong>{order.customerName || 'Guest'}</strong></div>
              <div className="detail-row"><span>Email</span><strong>{order.customerEmail || '—'}</strong></div>
              <div className="detail-row"><span>Phone</span><strong>{order.customerPhone || '—'}</strong></div>
            </div>
          </div>

          {/* Order Info */}
          <div className="order-detail-section">
            <h3 className="detail-section-title"><i className="ri-shopping-bag-3-line" /> Order Info</h3>
            <div className="detail-rows">
              <div className="detail-row">
                <span>Status</span>
                <span className="status-badge" style={{ '--s-color': STATUS_COLORS[order.status] }}>
                  {order.status}
                </span>
              </div>
              <div className="detail-row"><span>Payment</span><strong>{order.paymentMethod} · {order.paymentStatus}</strong></div>
              <div className="detail-row"><span>Total</span><strong className="amount-cell">₹{parseFloat(order.totalAmount).toFixed(2)}</strong></div>
            </div>
          </div>

          {/* Shipping */}
          <div className="order-detail-section" style={{ gridColumn: '1 / -1' }}>
            <h3 className="detail-section-title"><i className="ri-map-pin-line" /> Shipping Address</h3>
            <p className="shipping-address">{order.shippingAddress}</p>
          </div>

          {/* Items */}
          {items.length > 0 && (
            <div className="order-detail-section" style={{ gridColumn: '1 / -1' }}>
              <h3 className="detail-section-title"><i className="ri-flask-line" /> Order Items</h3>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.perfume?.name || `Product ${item.perfumeId?.slice(0, 8)}`}</td>
                        <td>{item.quantity}</td>
                        <td>₹{parseFloat(item.price).toFixed(2)}</td>
                        <td className="amount-cell">₹{(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
