import React from 'react'

export default function NotesExplorer({
  fragranceDetails,
  activeScentTab,
  setActiveScentTab,
  handleQuickView,
  addToCart
}) {
  return (
    <section id="fragrances" className="bg-[#fbf9f6] py-24 px-8 border-b border-[#eae3da]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal-element">
          <p className="uppercase tracking-[0.25em] text-[11px] text-[#8d7f75] mb-3">
            FRAGRANCE COLLECTION
          </p>
          <h2 className="serif text-5xl text-[#1e120e]">The Language of Scent</h2>
          <p className="text-[#6f625a] mt-4 max-w-xl mx-auto text-sm leading-6">
            Each fragrance by One Life Perfume is thoughtfully composed to capture emotion, elegance, and individuality. Explore refined blends where fresh notes, florals, woods, and spices come together in perfect harmony.
          </p>
        </div>

        {/* Fragrance Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal-element reveal-delay-1">
          {fragranceDetails.map((frag, idx) => (
            <button
              key={frag.name}
              onClick={() => setActiveScentTab(idx)}
              className={`px-5 py-2.5 uppercase tracking-[0.15em] text-[10px] border transition-all duration-300 ${activeScentTab === idx
                ? 'bg-[#1e120e] text-[#fbf9f6] border-[#1e120e]'
                : 'border-[#cdbfb0] text-[#1e120e] hover:border-[#1e120e]'
                }`}
            >
              {frag.name}
            </button>
          ))}
        </div>

        {/* Explorer Display */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#f5f1ea] p-8 lg:p-12 rounded-lg border border-[#eae3da] reveal-element reveal-delay-2 text-left">

          {/* Scent Pyramid - 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="serif text-3xl border-b border-[#cdbfb0] pb-2 text-[#1e120e]">
              Scent Pyramid
            </h3>

            <div className="space-y-5">
              <div className="border-l-2 border-[#c5a880] pl-4">
                <p className="uppercase tracking-widest text-[9px] text-[#8d7f75] font-semibold">Top Notes</p>
                <p className="serif text-lg text-[#1e120e] mt-0.5">{fragranceDetails[activeScentTab].notes.top}</p>
                <p className="text-[10px] text-[#6f625a]">Initial burst, bright and volatile.</p>
              </div>

              <div className="border-l-2 border-[#8d7a64] pl-4">
                <p className="uppercase tracking-widest text-[9px] text-[#8d7f75] font-semibold">Heart Notes</p>
                <p className="serif text-lg text-[#1e120e] mt-0.5">{fragranceDetails[activeScentTab].notes.heart}</p>
                <p className="text-[10px] text-[#6f625a]">The core character, expressive and full.</p>
              </div>

              <div className="border-l-2 border-[#1e120e] pl-4">
                <p className="uppercase tracking-widest text-[9px] text-[#8d7f75] font-semibold">Base Notes</p>
                <p className="serif text-lg text-[#1e120e] mt-0.5">{fragranceDetails[activeScentTab].notes.base}</p>
                <p className="text-[10px] text-[#6f625a]">The lingering trail, warm and anchoring.</p>
              </div>
            </div>
          </div>

          {/* Scent Profile Chart - 4 cols */}
          <div className="lg:col-span-4 space-y-6 bg-[#fbf9f6] p-6 rounded border border-[#eae3da] h-full flex flex-col justify-center">
            <div>
              <h3 className="serif text-3xl border-b border-[#cdbfb0] pb-2 text-[#1e120e] mb-4">
                Scent Profile
              </h3>

              <div className="space-y-4">
                {Object.entries(fragranceDetails[activeScentTab].profile).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider mb-1">
                      <span className="text-[#1e120e] font-semibold">{key}</span>
                      <span className="text-[#8d7f75]">{val}%</span>
                    </div>
                    <div className="w-full bg-[#eae3da] h-[4px] rounded-full overflow-hidden">
                      <div
                        className="bg-[#c5a880] h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fragrance Card Quick Info - 4 cols */}
          <div className="lg:col-span-4 flex flex-col items-center text-center justify-between h-full py-2">
            <div className="h-48 flex items-center justify-center mb-4 w-full">
              <img
                src={fragranceDetails[activeScentTab].image}
                alt={fragranceDetails[activeScentTab].name}
                className="h-full object-contain max-w-[160px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition duration-500"
              />
            </div>
            <div>
              <h3 className="serif text-3xl text-[#1e120e]">{fragranceDetails[activeScentTab].name}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7f75] mt-1 font-semibold">
                {fragranceDetails[activeScentTab].price} — Eau de Parfum
              </p>
              <p className="text-xs text-[#6f625a] mt-3 line-clamp-3 px-4 leading-relaxed">
                {fragranceDetails[activeScentTab].description}
              </p>
            </div>
            <div className="flex gap-3 mt-5 w-full px-4">
              <button
                onClick={() => handleQuickView(fragranceDetails[activeScentTab])}
                className="flex-1 py-2 border border-[#1e120e] text-[10px] uppercase tracking-[0.15em] hover:bg-[#1e120e] hover:text-[#fbf9f6] transition duration-300"
              >
                Quick View
              </button>
              <button
                onClick={() => addToCart(fragranceDetails[activeScentTab])}
                className="flex-1 py-2 bg-[#1e120e] text-[#fbf9f6] text-[10px] uppercase tracking-[0.15em] hover:bg-[#c5a880] hover:text-[#1e120e] transition duration-300"
              >
                Add to Bag
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
