import React, { useEffect, useState, useCallback } from 'react';
import { getCategories, deleteCategory } from '../../api/categoryService';
import CategoryModal from './CategoryModal';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
      showToast('Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (c) => { setEditTarget(c); setModalOpen(true); };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      await deleteCategory(id);
      showToast(`"${name}" deleted`);
      fetchData();
    } catch {
      showToast('Delete failed', 'error');
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="admin-page-title">Categories</h1>
          <p className="admin-page-subtitle">{categories.length} categories defined</p>
        </div>
        <button className="btn-primary" onClick={openCreate} id="add-category-btn">
          <i className="ri-add-line" /> Add Category
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <i className="ri-search-line" />
          <input
            type="text"
            placeholder="Search categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="category-search"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {loading ? (
          <div className="table-empty"><i className="ri-loader-4-line spin" /> Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="table-empty">No categories found</div>
        ) : filtered.map((c) => (
          <div key={c.id} className="category-card">
            <div className="category-card-icon">
              <i className="ri-price-tag-3-line" />
            </div>
            <div className="category-card-body">
              <h3 className="category-card-name">{c.name}</h3>
              <p className="category-card-desc">{c.description || 'No description'}</p>
              <p className="category-card-id">ID: {c.id.slice(0, 8)}…</p>
            </div>
            <div className="category-card-actions">
              <button className="action-btn edit" onClick={() => openEdit(c)} title="Edit">
                <i className="ri-edit-line" />
              </button>
              <button className="action-btn delete" onClick={() => handleDelete(c.id, c.name)} title="Delete">
                <i className="ri-delete-bin-line" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Also show as table */}
      <div className="admin-section" style={{ marginTop: '2rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>All Categories (Table View)</h2>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="id-cell">{c.id.slice(0, 8)}…</td>
                  <td><span className="badge badge-gold">{c.name}</span></td>
                  <td className="desc-cell">{c.description || '—'}</td>
                  <td>
                    <div className="action-btns">
                      <button className="action-btn edit" onClick={() => openEdit(c)}><i className="ri-edit-line" /></button>
                      <button className="action-btn delete" onClick={() => handleDelete(c.id, c.name)}><i className="ri-delete-bin-line" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <CategoryModal
          category={editTarget}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); fetchData(); showToast(editTarget ? 'Category updated!' : 'Category created!'); }}
        />
      )}
    </div>
  );
}
