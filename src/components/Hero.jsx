import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

export default function Hero({ fragranceDetails, addToCart }) {
  const heroRef = useRef(null)
  const navigate = useNavigate()

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-[#2d140d]"
      style={{
        backgroundImage: "url('/banner1.jpeg')",
        backgroundSize: "covcer",
        backgroundPosition: "center"
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 h-full grid lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center pl-14 lg:pl-20 pt-16 text-white text-left">
          <p className="uppercase tracking-[0.32em] text-[11px] text-black mb-8 animate-fadeIn">
            One Life, Infinite Fragrances
          </p>

          <h1 className="serif text-[72px] leading-[0.95] font-light max-w-[560px] flex flex-col">
            {/* <span className="text-reveal-container">
              <span className="text-reveal-item inline-block" style={{ animationDelay: '0.2s' }}>A fragrance for every chapter of life,</span>
            </span> */}
            <span className="text-reveal-container">
              <span className="text-reveal-item inline-block" style={{ animationDelay: '0.5s' }}>Where every scent tells a story</span>
            </span>
          </h1>

          <button
            // onClick={() => {
            //   const irisNoir = fragranceDetails.find(f => f.name === 'Iris Noir')
            //   addToCart(irisNoir || fragranceDetails[0])
            // }}
            onClick={() => navigate('/perfumes')}
            className="mt-10 border border-white/30 w-fit px-8 py-4 uppercase tracking-[0.22em] text-[11px] hover:bg-[#c5a880] hover:text-[#1e120e] hover:border-[#c5a880] transition-all duration-300"
          >
            Check now ↗
          </button>
        </div>

      </div>
    </section>
  )
}
