import React from 'react'

export default function BathSection() {
  return (
    <section className="relative h-[760px] overflow-hidden text-white">
      <img
        src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop"
        alt="Bath Scented Ritual background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">
        <div className="max-w-xl text-left reveal-left">
          <p className="uppercase tracking-[0.25em] text-xs text-[#c5a880] mb-5">
            SIGNATURE EXPERIENCE
          </p>

          <h2 className="serif text-7xl leading-[0.95] font-light mb-12">
            More than a scent,
            <br />
            a lasting impression.
          </h2>

          {/* <div className="flex gap-8 uppercase tracking-[0.25em] text-xs">
            <button
              onClick={() => document.getElementById('bodycare')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-b border-[#c5a880] pb-2 text-[#c5a880] hover:text-white transition duration-300"
            >
              Shop Body Wash
            </button>
            <button
              onClick={() => document.getElementById('bodycare')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-b border-white pb-2 hover:text-[#c5a880] transition duration-300"
            >
              Shop Body Lotion
            </button>
          </div> */}
        </div>
      </div>
    </section>
  )
}
