import React from 'react'

export default function BodyCare({ bodyCare, addToCart }) {
  return (
    <section id="bodycare" className="bg-[#fbf9f6] py-28 px-8 border-b border-[#eae3da]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="flex justify-center reveal-left">
          <img
            src="/img-2.png"
            alt="Body Wash Product"
            className="
              w-[420px]
              object-contain
              drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]
              hover:scale-105
              transition
              duration-500
            "
          />
        </div>

        <div className="reveal-right text-left">
          <p className="uppercase tracking-[0.25em] text-[11px] text-[#8d7f75] mb-4 font-semibold">
            PERFUMED COLLECTION
          </p>

          <h2 className="serif text-5xl leading-[1] font-light text-[#1e120e] mb-8 max-w-xl">
            Luxury fragrance, elevated beyond perfume.
          </h2>

          <p className="text-[#6f625a] leading-8 max-w-xl mb-12 text-lg">
            Experience body care infused with the signature elegance of One Life Perfume. Designed to refresh, soften, and leave a subtle yet lasting scent on your skin throughout the day.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyCare.map((item, i) => (
              <div
                key={i}
                className="bg-[#f5f1ea] p-4 text-center rounded border border-transparent hover:border-[#cdbfb0] hover:scale-105 transition duration-300 cursor-pointer group flex flex-col justify-between"
                onClick={() => addToCart({
                  name: `${item} Body Wash`,
                  price: '₹45',
                  image: '/img-2.png'
                }, '300ml')}
              >
                <img
                  src="/img-2.png"
                  alt={item}
                  className="w-full h-[120px] object-contain mb-3 group-hover:scale-110 transition duration-300"
                />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#1e120e] font-semibold leading-5">
                    {item}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-[#8d7f75] mt-1 font-semibold">
                    ₹45 — Add to Bag
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
