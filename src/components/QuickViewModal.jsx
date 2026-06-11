import React, { useState, useEffect } from "react";

export default function QuickViewModal({
  quickViewProduct,
  setQuickViewProduct,
  selectedSize,
  setSelectedSize,
  addToCart,
}) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(0);
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const images =
    quickViewProduct.images?.length > 0
      ? quickViewProduct.images
      : [quickViewProduct.image];



  const selectedSizeData = quickViewProduct.sizes?.find(
    (s) => s.size === selectedSize
  );

  const displayPrice = selectedSizeData
    ? `₹${parseFloat(selectedSizeData.price).toFixed(2)}`
    : quickViewProduct.price;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal */}
      <div className="relative bg-[#fbf9f6] w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden border border-[#eae3da] max-h-[90vh] overflow-y-auto z-10 flex flex-col md:flex-row animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 text-2xl text-[#1e120e] hover:text-[#c5a880] transition z-50"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 bg-[#f5f1ea] p-8 lg:p-12 flex items-center justify-center relative min-h-[500px] overflow-hidden">

          {/* Rating Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-[#8d7f75] z-30">
            ★ {quickViewProduct.rating || "5.0"}
          </div>

          {/* Slider Container */}
          <div className="relative w-full overflow-hidden">

            {/* Images */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${images.length * 100}%`,
                transform: `translateX(-${currentImage * (100 / images.length)
                  }%)`,
              }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: `${100 / images.length}%`,
                  }}
                >
                  <img
                    src={img}
                    alt={`${quickViewProduct.name}-${index}`}
                    className="max-h-[450px] w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition"
              >
                ❮
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition"
              >
                ❯
              </button>
            )}

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentImage === index
                      ? "w-6 bg-[#1e120e]"
                      : "w-2 bg-[#c5a880]"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-between text-left">
          <div>
            <p className="uppercase tracking-[0.25em] text-[10px] text-[#8d7f75] mb-2 font-semibold">
              Eau de Parfum
            </p>

            <h2 className="serif text-4xl text-[#1e120e] mb-3">
              {quickViewProduct.name}
            </h2>

            <p className="serif text-2xl text-[#c5a880] mb-5">
              {displayPrice}
            </p>

            <p className="text-xs text-[#6f625a] leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {quickViewProduct.notes && (
              <div className="bg-[#f5f1ea] p-4 rounded mb-6 text-[10px] space-y-2.5 border border-[#eae3da]">
                <p className="font-bold text-[#1e120e] uppercase tracking-wider">
                  Olfactory Profile
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[#8d7f75] uppercase block font-semibold text-[8px]">
                      Top
                    </span>
                    <span className="text-[#1e120e] font-medium">
                      {quickViewProduct.notes.top.split(",")[0]}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#8d7f75] uppercase block font-semibold text-[8px]">
                      Heart
                    </span>
                    <span className="text-[#1e120e] font-medium">
                      {quickViewProduct.notes.heart.split(",")[0]}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#8d7f75] uppercase block font-semibold text-[8px]">
                      Base
                    </span>
                    <span className="text-[#1e120e] font-medium">
                      {quickViewProduct.notes.base.split(",")[0]}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Sizes */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-wider text-[#1e120e] font-bold block mb-2.5">
                Select Size
              </span>

              <div className="flex gap-3">
                {(quickViewProduct.sizes || []).map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`px-4 py-2 border text-[10px] font-semibold uppercase tracking-widest transition ${selectedSize === s.size
                      ? "bg-[#1e120e] text-[#fbf9f6] border-[#1e120e]"
                      : "border-[#cdbfb0] text-[#1e120e] hover:border-[#1e120e]"
                      }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add To Cart */}
          <button
            onClick={() => {
              addToCart(quickViewProduct, selectedSize);
              setQuickViewProduct(null);
            }}
            className="w-full bg-[#1e120e] text-[#fbf9f6] py-3.5 uppercase tracking-[0.2em] text-[10px] font-semibold hover:bg-[#c5a880] hover:text-[#1e120e] transition duration-300"
          >
            Add to Bag — {displayPrice}
          </button>
        </div>
      </div>
    </div>
  );
}