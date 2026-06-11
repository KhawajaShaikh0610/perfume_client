import React, { useEffect, useState, useCallback } from 'react';
import { getPerfumes, deletePerfume } from '../../api/perfumeService';
import { getCategories } from '../../api/categoryService';
import PerfumeModal from './PerfumeModal';

export default function PerfumesPage() {
  const [perfumes, setPerfumes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
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
      const params = filterCat ? { categoryId: filterCat } : {};
      const [perfRes, catRes] = await Promise.all([getPerfumes(params), getCategories()]);
      setPerfumes(perfRes.data);
      setCategories(catRes.data);
    } catch (e) {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [filterCat]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (p) => { setEditTarget(p); setModalOpen(true); };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deletePerfume(id);
      showToast(`"${name}" deleted successfully`);
      fetchData();
    } catch {
      showToast('Delete failed', 'error');
    }
  };

  const filtered = perfumes.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="admin-page-title">Perfumes</h1>
          <p className="admin-page-subtitle">{perfumes.length} products in catalog</p>
        </div>
        <button className="btn-primary" onClick={openCreate} id="add-perfume-btn">
          <i className="ri-add-line" /> Add Perfume
        </button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-box">
          <i className="ri-search-line" />
          <input
            type="text"
            placeholder="Search by name or brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="perfume-search"
          />
        </div>
        <select
          className="filter-select"
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          id="perfume-cat-filter"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Size</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="table-empty"><i className="ri-loader-4-line spin" /> Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="table-empty">No perfumes found</td></tr>
            ) : filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="product-cell">
                    {p.imageUrls && p.imageUrls.length > 0
                      ? <img src={p.imageUrls[0]} alt={p.name} className="product-thumb" />
                      : <div className="product-thumb-placeholder"><i className="ri-flask-line" /></div>
                    }
                    <span className="product-name">{p.name}</span>
                  </div>
                </td>
                <td>{p.brand}</td>
                <td>
                  {p.category
                    ? <span className="badge badge-gold">{p.category.name}</span>
                    : <span className="badge badge-muted">Uncategorized</span>
                  }
                </td>
                <td className="amount-cell">
                  {p.sizes && p.sizes.length > 0
                    ? `From ₹${Math.min(...p.sizes.map(s => parseFloat(s.price) || 0)).toFixed(2)}`
                    : '—'}
                </td>
                <td>{p.sizes ? `${p.sizes.length} sizes` : '—'}</td>
                <td>
                  {p.sizes && p.sizes.length > 0 ? (
                    (() => {
                      const totalStock = p.sizes.reduce((acc, s) => acc + (parseInt(s.stock) || 0), 0);
                      return (
                        <span className={`stock-badge ${totalStock === 0 ? 'out' : totalStock < 5 ? 'low' : 'ok'}`}>
                          {totalStock}
                        </span>
                      );
                    })()
                  ) : (
                    <span className="stock-badge out">0</span>
                  )}
                </td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn edit" onClick={() => openEdit(p)} title="Edit">
                      <i className="ri-edit-line" />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(p.id, p.name)} title="Delete">
                      <i className="ri-delete-bin-line" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <PerfumeModal
          perfume={editTarget}
          categories={categories}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); fetchData(); showToast(editTarget ? 'Perfume updated!' : 'Perfume created!'); }}
        />
      )}
    </div>
  );
}
