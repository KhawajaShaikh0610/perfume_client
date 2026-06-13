import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { getPerfumes } from './api/perfumeService'
import { apiPerfumeToDisplay } from './data/perfumeData'

// Landing page components
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import NotesExplorer from './components/NotesExplorer'
import ProductGrid from './components/ProductGrid'
import Ritual from './components/Ritual'
import BathSection from './components/BathSection'
import FooterHero from './components/FooterHero'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchModal from './components/SearchModal'
import QuickViewModal from './components/QuickViewModal'
import CheckoutModal from './components/CheckoutModal'

// Auth pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminLoginPage from './pages/AdminLoginPage'

// Shop pages
import ProductsPage from './pages/ProductsPage'

// Admin pages
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import PerfumesPage from './admin/perfumes/PerfumesPage'
import CategoriesPage from './admin/categories/CategoriesPage'
import OrdersPage from './admin/orders/OrdersPage'

// Protected route wrapper
function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/admin/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

// Main landing page
function LandingPage({
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
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeScentTab, setActiveScentTab] = useState(0)
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })

  // Data state
  const [fragranceDetails, setFragranceDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPerfumes();
        const apiPerfumes = res.data.map(apiPerfumeToDisplay);
        if (apiPerfumes.length > 0) {
          setFragranceDetails(apiPerfumes);
          // For body care, take first 8 names, or fallback to static if not enough
          const fetchedNames = apiPerfumes.map(p => p.name).slice(0, 8);
        } else {
          setFragranceDetails(fragranceDetails);
        }
      } catch (err) {
        console.error('Failed to fetch data, using fallback:', err);
        setFragranceDetails(fragranceDetails);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMouseCoords({ x: e.clientX, y: e.clientY })
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, select, textarea, [role="button"]')) {
        document.body.classList.add('hover-link')
      } else {
        document.body.classList.remove('hover-link')
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal-visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = document.querySelectorAll(
      '.reveal-element, .reveal-scale, .reveal-left, .reveal-right'
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeScentTab, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-[#c5a880] animate-spin block mb-4" />
          <p className="text-sm text-[#8d7f75]">Loading the house of One Life Perfumes…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbf9f6] text-[#1e120e] overflow-hidden min-h-screen relative">
      <CustomCursor mouseCoords={mouseCoords} />
      <Header cart={cart} setSearchOpen={setSearchOpen} setCartOpen={setCartOpen} shakeCart={shakeCart} />
      <Hero fragranceDetails={fragranceDetails} addToCart={addToCart} />
      <Manifesto />
      <NotesExplorer fragranceDetails={fragranceDetails} activeScentTab={activeScentTab} setActiveScentTab={setActiveScentTab} handleQuickView={handleQuickView} addToCart={addToCart} />
      <ProductGrid fragranceDetails={fragranceDetails} handleQuickView={handleQuickView} addToCart={addToCart} />
      <Ritual />
      <BathSection />
      <FooterHero />
      <Footer />
      <SearchModal searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} fragranceDetails={fragranceDetails} handleQuickView={handleQuickView} addToCart={addToCart} />
    </div>
  )
}

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [shakeCart, setShakeCart] = useState(false)

  // Lifted QuickView state
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('100ml')

  const handleQuickView = (product) => {
    setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0].size : '100ml')
    setQuickViewProduct(product)
  }

  const addToCart = (product, size) => {
    if (!product) return;

    // If the product has sizes, and no size is specified, open the size selection modal
    if (product.sizes && product.sizes.length > 0 && !size) {
      setSelectedSize(product.sizes[0].size);
      setQuickViewProduct(product);
      return;
    }

    const finalSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0].size : '100ml');

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => (item.id ? item.id === product.id : item.name === product.name) && item.size === finalSize
      )
      const selectedSizeData = product.sizes?.find(s => s.size === finalSize);

      let numericPrice = 0;
      if (selectedSizeData) {
        numericPrice = parseFloat(selectedSizeData.price) || 0;
      } else if (typeof product.numericPrice === 'number') {
        numericPrice = product.numericPrice;
      } else if (product.price) {
        const cleanPriceStr = String(product.price)
          .replace('From', '')
          .replace('₹', '')
          .trim();
        numericPrice = parseFloat(cleanPriceStr) || 0;
      }

      if (existingIndex > -1) {
        const newCart = [...prevCart]
        newCart[existingIndex] = { ...newCart[existingIndex], quantity: newCart[existingIndex].quantity + 1 }
        return newCart
      } else {
        return [...prevCart, { ...product, size: finalSize, price: numericPrice, numericPrice, quantity: 1 }]
      }
    })
    setCartOpen(true)
    setShakeCart(true)
  }

  useEffect(() => {
    if (shakeCart) {
      const timer = setTimeout(() => setShakeCart(false), 500)
      return () => clearTimeout(timer)
    }
  }, [shakeCart])

  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={
          <LandingPage
            cart={cart}
            setCartOpen={setCartOpen}
            shakeCart={shakeCart}
            addToCart={addToCart}
            quickViewProduct={quickViewProduct}
            setQuickViewProduct={setQuickViewProduct}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            handleQuickView={handleQuickView}
          />
        } />
        <Route path="/perfumes" element={
          <ProductsPage
            cart={cart}
            setCartOpen={setCartOpen}
            shakeCart={shakeCart}
            addToCart={addToCart}
            quickViewProduct={quickViewProduct}
            setQuickViewProduct={setQuickViewProduct}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            handleQuickView={handleQuickView}
          />
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin (protected) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="perfumes" element={<PerfumesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen} cart={cart} setCart={setCart} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />
      {checkoutOpen && (
        <CheckoutModal cart={cart} onClose={() => setCheckoutOpen(false)} onSuccess={() => { setCart([]); setCheckoutOpen(false); }} />
      )}
      <QuickViewModal
        quickViewProduct={quickViewProduct}
        setQuickViewProduct={setQuickViewProduct}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        addToCart={addToCart}
      />
    </>
  )
}
