import React, { useState, useEffect } from 'react';
import { createPerfume, updatePerfume } from '../../api/perfumeService';

const empty = { name: '', brand: '', description: '', sizes: [{ size: '', price: '', stock: '' }], imageUrls: [''], videoUrls: [''], categoryId: '' };

export default function PerfumeModal({ perfume, categories, onClose, onSaved }) {
  const isEdit = !!perfume;
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (perfume) {
      setForm({
        name: perfume.name || '',
        brand: perfume.brand || '',
        description: perfume.description || '',
        sizes: perfume.sizes && perfume.sizes.length > 0 ? perfume.sizes.map(s => ({ size: s.size || '', price: s.price || '', stock: s.stock ?? '' })) : [{ size: '', price: '', stock: '' }],
        imageUrls: perfume.imageUrls && perfume.imageUrls.length > 0 ? [...perfume.imageUrls] : [''],
        videoUrls: perfume.videoUrls && perfume.videoUrls.length > 0 ? [...perfume.videoUrls] : [''],
        categoryId: perfume.categoryId || '',
      });
    } else {
      setForm(empty);
    }
  }, [perfume]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...form.sizes];
    newSizes[index][field] = value;
    setForm({ ...form, sizes: newSizes });
  };

  const addSize = () => setForm({ ...form, sizes: [...form.sizes, { size: '', price: '', stock: '' }] });
  const removeSize = (index) => {
    const newSizes = form.sizes.filter((_, i) => i !== index);
    setForm({ ...form, sizes: newSizes.length > 0 ? newSizes : [{ size: '', price: '', stock: '' }] });
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...form.imageUrls];
    newUrls[index] = value;
    setForm({ ...form, imageUrls: newUrls });
  };

  const addImageUrl = () => setForm({ ...form, imageUrls: [...form.imageUrls, ''] });
  const removeImageUrl = (index) => {
    const newUrls = form.imageUrls.filter((_, i) => i !== index);
    setForm({ ...form, imageUrls: newUrls.length > 0 ? newUrls : [''] });
  };

  const handleVideoUrlChange = (index, value) => {
    const newUrls = [...form.videoUrls];
    newUrls[index] = value;
    setForm({ ...form, videoUrls: newUrls });
  };

  const addVideoUrl = () => setForm({ ...form, videoUrls: [...form.videoUrls, ''] });
  const removeVideoUrl = (index) => {
    const newUrls = form.videoUrls.filter((_, i) => i !== index);
    setForm({ ...form, videoUrls: newUrls.length > 0 ? newUrls : [''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const processedSizes = form.sizes
      .filter(s => s.size && s.price !== '') // filter out empty sizes
      .map(s => ({
        size: s.size,
        price: parseFloat(s.price),
        stock: parseInt(s.stock) || 0
      }));

    const processedImageUrls = form.imageUrls.filter(url => url.trim() !== '');
    const processedVideoUrls = form.videoUrls ? form.videoUrls.filter(url => url.trim() !== '') : [];

    const payload = {
      ...form,
      sizes: processedSizes,
      imageUrls: processedImageUrls,
      videoUrls: processedVideoUrls,
      categoryId: form.categoryId || null,
    };

    try {
      if (isEdit) {
        await updatePerfume(perfume.id, payload);
      } else {
        await createPerfume(payload);
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
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto', width: '600px' }}>
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Edit Perfume' : 'Add New Perfume'}</h2>
          <button className="modal-close" onClick={onClose} id="perfume-modal-close">
            <i className="ri-close-line" />
          </button>
        </div>

        {error && <div className="modal-error"><i className="ri-error-warning-line" /> {error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="p-name">Name *</label>
              <input id="p-name" name="name" type="text" placeholder="e.g. Noir Absolu" value={form.name} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="p-brand">Brand *</label>
              <input id="p-brand" name="brand" type="text" placeholder="e.g. Loren" value={form.brand} onChange={handleChange} required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="p-desc">Description</label>
            <textarea id="p-desc" name="description" rows={3} placeholder="Scent notes and mood…" value={form.description} onChange={handleChange} className="form-input form-textarea" />
          </div>

          <div className="form-group">
            <label htmlFor="p-category">Category</label>
            <select id="p-category" name="categoryId" value={form.categoryId} onChange={handleChange} className="form-input">
              <option value="">— None —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Sizes Section */}
          <div className="form-group border-t pt-4 mt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold">Sizes *</label>
              <button type="button" onClick={addSize} className="text-xs bg-[#f5f1ea] px-2 py-1 rounded text-[#1e120e] hover:bg-[#eae3da]">
                + Add Size
              </button>
            </div>
            {form.sizes.map((s, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input type="text" placeholder="Size (e.g. 50ml)" value={s.size} onChange={(e) => handleSizeChange(index, 'size', e.target.value)} className="form-input w-40" required />
                <input type="number" min="0" step="0.01" placeholder="Price" value={s.price} onChange={(e) => handleSizeChange(index, 'price', e.target.value)} required className="form-input w-24" />
                <input type="number" min="0" placeholder="Stock" value={s.stock} onChange={(e) => handleSizeChange(index, 'stock', e.target.value)} className="form-input w-20" />
                <button type="button" onClick={() => removeSize(index)} className="text-red-500 hover:text-red-700">
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            ))}
          </div>

          {/* Images Section */}
          <div className="form-group border-t pt-4 mt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold">Image URLs</label>
              <button type="button" onClick={addImageUrl} className="text-xs bg-[#f5f1ea] px-2 py-1 rounded text-[#1e120e] hover:bg-[#eae3da]">
                + Add Image
              </button>
            </div>
            {form.imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input type="text" placeholder="https://…" value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} className="form-input flex-1" />
                <button type="button" onClick={() => removeImageUrl(index)} className="text-red-500 hover:text-red-700">
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            ))}
          </div>

          {form.imageUrls.filter(u => u.trim() !== '').length > 0 && (
            <div className="image-preview flex gap-2 overflow-x-auto pb-2">
              {form.imageUrls.filter(u => u.trim() !== '').map((url, i) => (
                <img key={i} src={url} alt={`Preview ${i}`} onError={(e) => e.target.style.display = 'none'} className="h-16 object-contain" />
              ))}
            </div>
          )}

          {/* Videos Section */}
          <div className="form-group border-t pt-4 mt-2">
            <div className="flex justify-between items-center mb-2">
              <label className="font-bold">Video URLs</label>
              <button type="button" onClick={addVideoUrl} className="text-xs bg-[#f5f1ea] px-2 py-1 rounded text-[#1e120e] hover:bg-[#eae3da]">
                + Add Video
              </button>
            </div>
            {(form.videoUrls || ['']).map((url, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input type="text" placeholder="https://…" value={url} onChange={(e) => handleVideoUrlChange(index, e.target.value)} className="form-input flex-1" />
                <button type="button" onClick={() => removeVideoUrl(index)} className="text-red-500 hover:text-red-700">
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            ))}
          </div>

          {(form.videoUrls || []).filter(u => u.trim() !== '').length > 0 && (
            <div className="video-preview flex gap-2 overflow-x-auto pb-2">
              {(form.videoUrls || []).filter(u => u.trim() !== '').map((url, i) => (
                <video key={i} src={url} className="h-16 w-24 object-cover border rounded" controls preload="metadata" onError={(e) => e.target.style.display = 'none'} />
              ))}
            </div>
          )}

          <div className="modal-actions border-t pt-4 mt-2">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading} id="perfume-save-btn">
              {loading ? <><i className="ri-loader-4-line spin" /> Saving…</> : <><i className="ri-save-line" /> {isEdit ? 'Update' : 'Create'} Perfume</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
