import React from 'react'

export default function FooterHero() {
  return (
    <section id="sustainability" className="relative h-[500px] overflow-hidden bg-gradient-to-r from-[#1b0905] via-[#3a1f16] to-[#5d392d] flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=1600&auto=format&fit=crop"
        alt="Rose Flowers sourcing backdrop"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="relative z-10 text-center text-white max-w-4xl px-8 reveal-scale">
        <div className="serif text-7xl mb-8 tracking-wide">ONE LIFE PERFUME</div>

        <p className="leading-8 text-white/85 text-sm">
          Crafted to capture emotion in every note, our fragrances blend timeless elegance with modern sophistication. Each scent is thoughtfully composed to leave a lasting impression — a reflection of individuality, confidence, and the beauty of living one unforgettable life.        </p>
      </div>
    </section>
  )
}
