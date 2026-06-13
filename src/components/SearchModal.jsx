import React from 'react'

export default function SearchModal({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  fragranceDetails,
  bodyCare,
  handleQuickView,
  addToCart
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => {
          setSearchOpen(false)
          setSearchQuery('')
        }}
      />

      <div
        className={`relative bg-[#fbf9f6] w-full max-w-2xl rounded-lg shadow-2xl p-8 z-10 border border-[#eae3da] transform transition-all duration-300 ${searchOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
      >
        <button
          onClick={() => {
            setSearchOpen(false)
            setSearchQuery('')
          }}
          className="absolute top-4 right-4 text-2xl text-[#1e120e] hover:text-[#c5a880] transition"
        >
          <i className="ri-close-line"></i>
        </button>

        <h3 className="serif text-3xl mb-6 text-[#1e120e] text-left">Search the House</h3>

        <div className="relative border-b border-[#cdbfb0] pb-2 flex items-center mb-8">
          <i className="ri-search-line text-[#8d7f75] text-lg mr-3"></i>
          <input
            type="text"
            placeholder="Search fragrances, body care, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[#1e120e] placeholder-[#cdbfb0] text-sm"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#8d7f75] hover:text-[#1e120e]"
            >
              <i className="ri-close-circle-fill"></i>
            </button>
          )}
        </div>

        {/* Results list */}
        <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1 text-left">
          {searchQuery ? (
            (() => {
              const results = [
                ...fragranceDetails,
                ...bodyCare.map((name) => ({
                  name: `${name} Body Wash`,
                  price: '₹45',
                  image: '/img-2.png',
                  description: 'A luxurious body care treatment delicately perfumed.',
                  notes: null
                }))
              ].filter(
                (item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  (item.notes && (
                    item.notes.top.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.notes.heart.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.notes.base.toLowerCase().includes(searchQuery.toLowerCase())
                  ))
              )

              if (results.length === 0) {
                return <p className="text-sm text-[#8d7f75] text-center py-6">No matching house items found.</p>
              }

              return results.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                    if (item.notes) {
                      handleQuickView(item)
                    } else {
                      addToCart(item, '300ml')
                    }
                  }}
                  className="flex items-center gap-4 p-2 rounded hover:bg-[#f5f1ea] cursor-pointer transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain bg-[#f5f1ea] p-1 rounded"
                  />
                  <div>
                    <p className="font-semibold text-sm text-[#1e120e]">{item.name}</p>
                    <p className="text-[10px] text-[#8d7f75] uppercase tracking-wider font-semibold">
                      {item.notes ? 'Eau de Parfum' : 'Body Wash'} — {item.price}
                    </p>
                  </div>
                  <i className="ri-arrow-right-line ml-auto text-[#cdbfb0]"></i>
                </div>
              ))
            })()
          ) : (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#8d7f75] mb-3 font-semibold">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['OL7 EDITION'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3.5 py-2 bg-[#f5f1ea] hover:bg-[#eae3da] text-[11px] text-[#1e120e] rounded transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
