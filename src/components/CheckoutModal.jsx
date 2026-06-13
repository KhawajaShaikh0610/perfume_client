import React, { useState } from 'react';
import { createOrder } from '../api/orderService';

export default function CheckoutModal({ cart, onClose, onSuccess }) {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    paymentMethod: 'cash',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);

  const subtotal = cart.reduce((sum, item) => {
    const price = typeof item.numericPrice === 'number'
      ? item.numericPrice
      : parseFloat(String(item.price).replace('₹', '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const orderItems = cart.map((item) => ({
        perfumeId: item.id,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      }));

      const payload = {
        orderItems,
        shippingAddress: form.shippingAddress,
        paymentMethod: form.paymentMethod,
        totalAmount: subtotal,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
      };

      const { data } = await createOrder(payload);
      setOrderId(data.id);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (orderId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => { onSuccess(); onClose(); }} />
        <div className="relative bg-[#fbf9f6] w-full max-w-md rounded-lg shadow-2xl p-10 z-10 border border-[#eae3da] text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c5a880] to-[#9c7a50] flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-3xl text-white" />
          </div>
          <h2 className="serif text-3xl text-[#1e120e] mb-2">Order Confirmed</h2>
          <p className="text-sm text-[#6f625a] mb-6">Thank you for your purchase, {form.customerName}!</p>

          <div className="bg-[#f5f1ea] rounded p-4 mb-6 text-left border border-[#eae3da]">
            <div className="flex justify-between text-xs text-[#8d7f75] mb-1">
              <span>Order ID</span>
              <span className="font-mono">{orderId.slice(0, 12)}…</span>
            </div>
            <div className="flex justify-between text-xs text-[#8d7f75] mb-1">
              <span>Total</span>
              <span className="font-semibold text-[#1e120e]">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#8d7f75]">
              <span>Payment</span>
              <span className="capitalize">{form.paymentMethod}</span>
            </div>
          </div>

          <button
            onClick={() => { onSuccess(); onClose(); }}
            className="w-full bg-[#1e120e] text-[#fbf9f6] py-3.5 uppercase tracking-[0.2em] text-[10px] font-semibold hover:bg-[#c5a880] hover:text-[#1e120e] transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#fbf9f6] w-full max-w-lg rounded-lg shadow-2xl overflow-hidden border border-[#eae3da] max-h-[92vh] overflow-y-auto z-10 animate-fadeIn">
        {/* Header */}
        <div className="bg-[#1e120e] p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition text-xl">
            <i className="ri-close-line" />
          </button>
          <p className="uppercase tracking-[0.25em] text-[10px] text-[#c5a880] mb-1 font-semibold">One Life Perfumes</p>
          <h2 className="serif text-2xl">Checkout</h2>
        </div>

        {/* Order summary */}
        <div className="bg-[#f5f1ea] px-6 py-4 border-b border-[#eae3da]">
          <div className="flex justify-between text-[10px] uppercase tracking-wider text-[#8d7f75] mb-2 font-semibold">
            <span>{cart.length} items</span>
            <span>Subtotal: ₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex-shrink-0 w-10 h-10 rounded bg-white/80 border border-[#eae3da] p-1">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded text-xs flex items-center gap-2">
            <i className="ri-error-warning-line" /> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8d7f75] mb-1.5 font-semibold">Full Name *</label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full border border-[#cdbfb0] bg-transparent px-4 py-2.5 text-sm text-[#1e120e] placeholder-[#cdbfb0] outline-none focus:border-[#c5a880] transition rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8d7f75] mb-1.5 font-semibold">Email *</label>
              <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full border border-[#cdbfb0] bg-transparent px-4 py-2.5 text-sm text-[#1e120e] placeholder-[#cdbfb0] outline-none focus:border-[#c5a880] transition rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8d7f75] mb-1.5 font-semibold">Phone</label>
              <input
                type="text"
                name="customerPhone"
                value={form.customerPhone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                className="w-full border border-[#cdbfb0] bg-transparent px-4 py-2.5 text-sm text-[#1e120e] placeholder-[#cdbfb0] outline-none focus:border-[#c5a880] transition rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8d7f75] mb-1.5 font-semibold">Shipping Address *</label>
            <textarea
              name="shippingAddress"
              value={form.shippingAddress}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Street, City, State, ZIP Code"
              className="w-full border border-[#cdbfb0] bg-transparent px-4 py-2.5 text-sm text-[#1e120e] placeholder-[#cdbfb0] outline-none focus:border-[#c5a880] transition rounded resize-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8d7f75] mb-2 font-semibold">Payment Method *</label>
            <div className="flex gap-3">
              {[
                { value: 'cash', label: 'Cash on Delivery', icon: 'ri-money-dollar-box-line' },
                { value: 'online', label: 'Online Payment', icon: 'ri-bank-card-line' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, paymentMethod: opt.value })}
                  className={`flex-1 flex items-center gap-2 justify-center py-3 border text-[11px] uppercase tracking-wider font-semibold transition rounded ${form.paymentMethod === opt.value
                    ? 'bg-[#1e120e] text-[#fbf9f6] border-[#1e120e]'
                    : 'border-[#cdbfb0] text-[#1e120e] hover:border-[#1e120e]'
                    }`}
                >
                  <i className={opt.icon} /> {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-[#eae3da]">
            <span className="text-xs text-[#8d7f75] uppercase tracking-wider font-semibold">Total</span>
            <span className="serif text-2xl text-[#1e120e]">₹{subtotal.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c5a880] hover:bg-[#b4936b] text-[#1e120e] py-4 uppercase tracking-[0.2em] text-xs font-semibold transition duration-300 disabled:opacity-60 rounded"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2"><i className="ri-loader-4-line animate-spin" /> Processing…</span>
            ) : (
              `Place Order — ₹${subtotal.toFixed(2)}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
