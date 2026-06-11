import React from "react";

export default function Manifesto() {
  return (
    <section className="bg-[#fbf9f6] py-24 px-6 lg:px-8 border-b border-[#eae3da]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_350px] gap-16 items-center">

        {/* Content */}
        <div>
          <p className="uppercase tracking-[0.25em] text-[11px] text-[#8d7f75] mb-6">
            Brand Manifesto
          </p>

          <h2 className="serif text-4xl md:text-5xl leading-tight font-light text-[#1e120e] max-w-4xl mb-8">
            One Life Perfume believes fragrance is more than scent —
            it is identity, emotion, and memory captured in a moment.
          </h2>

          <p className="text-[#6f625a] leading-8 max-w-4xl text-lg">
            Crafted with a balance of elegance and depth, each fragrance is
            designed to express individuality through timeless compositions.
            From soft florals to rich woody notes, One Life Perfume creates
            scents that feel luxurious, modern, and unforgettable.
            <br />
            <br />
            Rooted in quality, refinement, and lasting impressions, our
            collection is made for every mood, every occasion, and every
            chapter of life — because with one life to live, every moment
            deserves a signature fragrance.
          </p>
        </div>

        {/* Mobile Video Mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[350px] h-[600px] bg-black rounded-[36px] p-3 shadow-2xl border border-[#d9cfc3] overflow-hidden">

            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 my-1 bg-black rounded-full z-20" />

            {/* Video */}
            <video
              src="public/rel1.mov"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-[28px]"
            />

            {/* Optional Glass Overlay */}
            <div className="absolute inset-0 rounded-[28px] border border-white/10 pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}