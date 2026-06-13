import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPerfumes } from '../api/perfumeService';
import { getCategories } from '../api/categoryService';
import { apiPerfumeToDisplay } from '../data/perfumeData';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProductsPage({
  cart,
  setCartOpen,
  shakeCart,
  addToCart,
  quickViewProduct,
  setQuickViewProduct,
  selectedSize,
  setSelectedSize,
  handleQuickView
}) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  useEffect(() => {
    const load = async () => {
      try {
        const [perfRes, catRes] = await Promise.all([getPerfumes(), getCategories()]);
        setProducts(perfRes.data.map(apiPerfumeToDisplay));
        setCategories(catRes.data);
      } catch (e) {
        console.error('Failed to load products:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);



  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory) {
      list = list.filter((p) => p.categoryId === selectedCategory);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.numericPrice - b.numericPrice);
        break;
      case 'price-desc':
        list.sort((a, b) => b.numericPrice - a.numericPrice);
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      default:
        list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, selectedCategory, search, sortBy]);

  const cartItemCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="bg-[#fbf9f6] text-[#1e120e] min-h-screen">
      {/* Top navigation bar */}
      <Header
        cart={cart}
        setCartOpen={setCartOpen}
        shakeCart={shakeCart}
        hideNav={true}
        setSearchOpen={() => {
          const el = document.querySelector('input[placeholder="Search fragrances…"]');
          if (el) {
            el.focus();
            window.scrollTo({ top: el.offsetTop - 150, behavior: 'smooth' });
          }
        }}
      />

      {/* Hero banner */}
      <section className="relative h-screen overflow-hidden bg-[#2d140d]"
        style={{
          backgroundImage: "url('/banner1.jpeg')",
          backgroundSize: "covcer",
          backgroundPosition: "center"
        }}>
        <div className="h-screen flex flex-col items-start justify-center px-8 text-left">
          <p className="uppercase tracking-[0.35em] text-[10px] text-[#c5a880] mb-4 font-semibold">THE COLLECTION</p>
          <h1 className="serif text-6xl mb-4">Our Fragrances</h1>
          <p className="text-white/60 max-w-xl text-sm leading-relaxed text-black">
            Discover meticulously crafted scents, each telling its own story of elegance, emotion, and artistry.
          </p>
        </div>
      </section>

      {/* Filters & Controls */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[#8d7f75]" />
            <input
              type="text"
              placeholder="Search fragrances…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#cdbfb0] bg-transparent text-sm text-[#1e120e] placeholder-[#cdbfb0] outline-none focus:border-[#c5a880] transition rounded"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-[#cdbfb0] bg-transparent px-4 py-2.5 text-[11px] uppercase tracking-wider text-[#1e120e] outline-none focus:border-[#c5a880] transition rounded cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[#cdbfb0] bg-transparent px-4 py-2.5 text-[11px] uppercase tracking-wider text-[#1e120e] outline-none focus:border-[#c5a880] transition rounded cursor-pointer"
            >
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[11px] text-[#8d7f75] uppercase tracking-wider mt-4 font-semibold">
          {loading ? 'Loading…' : `${filtered.length} fragrance${filtered.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <i className="ri-loader-4-line text-4xl text-[#c5a880] animate-spin block mb-4" />
              <p className="text-sm text-[#8d7f75]">Loading collection…</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32">
            <i className="ri-flask-line text-5xl text-[#cdbfb0] block mb-4" />
            <p className="serif text-2xl text-[#8d7f75] mb-2">No fragrances found</p>
            <p className="text-sm text-[#cdbfb0]">Try adjusting your filters or search.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-[#eae3da] rounded-lg overflow-hidden hover:shadow-xl hover:border-[#c5a880]/40 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-72 bg-[#f5f1ea] overflow-hidden flex items-center justify-center p-6">
                  {/* Rating badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[9px] font-bold text-[#8d7f75] uppercase tracking-wider z-10">
                    ★ {product.rating}
                  </div>

                  {/* Stock badge */}
                  {product.stock < 5 && product.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-[#f59e0b]/10 text-[#f59e0b] px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider z-10">
                      Low Stock
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute top-3 right-3 bg-red-50 text-red-500 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider z-10">
                      Sold Out
                    </div>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
                    <button
                      onClick={() => handleQuickView(product)}
                      className="px-5 py-2.5 bg-[#fbf9f6] text-[#1e120e] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#c5a880] transition duration-300 rounded"
                    >
                      Quick View
                    </button>
                    {product.stock > 0 && (
                      <button
                        onClick={() => addToCart(product)}
                        className="px-5 py-2.5 bg-[#1e120e] text-[#fbf9f6] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#c5a880] hover:text-[#1e120e] transition duration-300 rounded"
                      >
                        Add to Bag
                      </button>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 text-left">
                  {product.categoryName && (
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold mb-1">
                      {product.categoryName}
                    </p>
                  )}
                  <h3 className="serif text-xl text-[#1e120e] mb-1">{product.name}</h3>
                  <p className="text-[11px] text-[#8d7f75] mb-3 line-clamp-2 leading-relaxed">
                    {product.tagline || product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="serif text-lg text-[#c5a880]">{product.price}</span>
                    <span className="text-[10px] text-[#cdbfb0] uppercase tracking-wider">{product.sizes ? `${product.sizes.length} sizes` : ''}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <Footer /> */}

    </div>
  );
}