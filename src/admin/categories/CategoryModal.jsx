import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../../api/categoryService';

export default function CategoryModal({ category, onClose, onSaved }) {
  const isEdit = !!category;
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setForm({ name: category.name || '', description: category.description || '' });
    } else {
      setForm({ name: '', description: '' });
    }
  }, [category]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isEdit) {
        await updateCategory(category.id, form);
      } else {
        await createCategory(form);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Edit Category' : 'Add Category'}</h2>
          <button className="modal-close" onClick={onClose} id="cat-modal-close">
            <i className="ri-close-line" />
          </button>
        </div>

        {error && <div className="modal-error"><i className="ri-error-warning-line" /> {error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="cat-name">Category Name *</label>
            <input
              id="cat-name"
              name="name"
              type="text"
              placeholder="e.g. Oriental, Floral, Woody…"
              value={form.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cat-desc">Description</label>
            <textarea
              id="cat-desc"
              name="description"
              rows={4}
              placeholder="Describe this category…"
              value={form.description}
              onChange={handleChange}
              className="form-input form-textarea"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading} id="cat-save-btn">
              {loading
                ? <><i className="ri-loader-4-line spin" /> Saving…</>
                : <><i className="ri-save-line" /> {isEdit ? 'Update' : 'Create'} Category</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
