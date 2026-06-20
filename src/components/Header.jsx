import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header({ cart, setSearchOpen, setCartOpen, shakeCart, hideNav }) {
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#1e120ebd]/45 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-0 py-4 flex items-center justify-between text-white">

        <div className=''>
          <img src="/logo-2.png" alt="logo" className='w-27 h-16 cursor-pointer'
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/')
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          />
        </div>

        {!hideNav && (
          <nav className="hidden md:flex items-center gap-10 uppercase tracking-[0.2em] text-[11px]">
            <a href="#shop" className="hover:text-[#c5a880] transition">Shop</a>
            <a href="#fragrances" className="hover:text-[#c5a880] transition">Fragrances</a>
            <a href="#ritual" className="hover:text-[#c5a880] transition">Ritual</a>
            {/* <a href="#bodycare" className="hover:text-[#c5a880] transition">Body Care</a> */}
            <a href="#sustainability" className="hover:text-[#c5a880] transition">House</a>
          </nav>
        )}

        <div className="flex items-center gap-5 text-sm text-white">
          <button onClick={() => setSearchOpen && setSearchOpen(true)} className="focus:outline-none hover:text-[#c5a880] transition">
            <i className="ri-search-line text-[18px] cursor-pointer"></i>
          </button>
          {/* <button className="focus:outline-none hover:text-[#c5a880] transition relative group">
            <i className="ri-heart-line text-[18px] cursor-pointer"></i>
          </button> */}
          <button
            onClick={() => setCartOpen(true)}
            className={`focus:outline-none hover:text-[#c5a880] transition relative ${shakeCart ? 'animate-shake' : ''}`}
          >
            <i className="ri-shopping-bag-line text-[18px] cursor-pointer"></i>
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#c5a880] text-[#1e120e] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header >
  )
}
