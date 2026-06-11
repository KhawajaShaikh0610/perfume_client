import React from 'react'

export default function Ritual() {
  return (
    <section id="ritual" className="relative h-[700px] bg-black text-white overflow-hidden">
      <img
        src="/img-3.png"
        alt="Perfume Ritual"
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/35" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">
        <div className="max-w-xl ml-auto text-right reveal-element">
          <p className="uppercase tracking-[0.25em] text-xs text-[#c5a880] mb-5">
            THE ESSENCE
          </p>

          <h2 className="serif text-5xl leading-[1] font-light mb-10">
            Fragrance crafted for the moments that stay with you
          </h2>
          <p className='tracking-[0.25em] text-xs  mb-8'>Discover a world where elegance, depth, and emotion blend into every bottle. One Life Perfume creates timeless fragrances designed to express confidence, individuality, and modern luxury.</p>

          <div className="flex gap-8 justify-end uppercase tracking-[0.25em] text-xs">
            <button
              onClick={() => document.getElementById('fragrances')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-b border-[#c5a880] pb-2 text-[#c5a880] hover:text-white transition duration-300"
            >
              Discover the Ritual
            </button>
            <button
              onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-b border-white pb-2 hover:text-[#c5a880] transition duration-300"
            >
              Shop Fragrances
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
