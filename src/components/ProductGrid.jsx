import React, { useEffect, useState } from "react";

function ProductShowcase({
  item,
  index,
  handleQuickView,
  addToCart,
}) {
  const images =
    item.images && item.images.length > 0
      ? item.images
      : [item.image];

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    item.sizes?.[0]?.size || "30ml"
  );

  const isEven = index % 2 === 0;

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="border-b border-[#eae3da]">
      <div className="grid md:grid-cols-2 min-h-[600px] md:min-h-[700px]">
        {/* Product Details */}
        <div
          className={`flex items-center justify-center p-8 md:p-20 ${isEven ? "order-1" : "order-2"
            }`}
        >
          <div className="max-w-lg">
            <p className="uppercase tracking-[0.3em] text-[12px] text-[#c5a880] mb-4 font-medium">
              Eau de Parfum
            </p>

            <h2 className="text-4xl md:text-6xl font-light text-[#1e120e] mb-6">
              {item.name}
            </h2>

            {item.description && (
              <p className="text-[#666] leading-8 mb-8">
                {item.description}
              </p>
            )}

            <div className="mb-8">
              <span className="text-2xl font-semibold text-[#1e120e]">
                ₹ {item.price}
              </span>
            </div>

            {/* Sizes */}
            {item.sizes?.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {item.sizes.map((sizeObj, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(sizeObj.size)}
                    className={`px-5 py-3 border transition-all duration-300 ${selectedSize === sizeObj.size
                      ? "bg-[#1e120e] text-white border-[#1e120e]"
                      : "bg-white text-[#1e120e] border-[#d8d0c8] hover:border-[#1e120e]"
                      }`}
                  >
                    {sizeObj.size}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  handleQuickView(
                    item,
                    selectedSize
                  )
                }
                className="px-8 py-3 border border-[#1e120e] text-[#1e120e] uppercase tracking-wider text-sm font-medium hover:bg-[#1e120e] hover:text-white transition-all duration-300"

              >
                Quick View
              </button>

              <button
                onClick={() =>
                  addToCart(
                    item,
                    selectedSize
                  )
                }

                className="px-8 py-3 bg-[#1e120e] text-white uppercase tracking-wider text-sm font-medium hover:bg-[#c5a880] hover:text-[#1e120e] transition-all duration-300"

              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Images Slider */}
        <div
          className={`relative h-[500px] md:h-[700px] overflow-hidden ${isEven ? "order-2" : "order-1"
            }`}
        >
          {images.map((img, imgIndex) => (
            <img
              key={imgIndex}
              src={img}
              alt={`${item.name}-${imgIndex}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${currentImage === imgIndex
                ? "opacity-100"
                : "opacity-0"
                }`}
            />
          ))}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Slider Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setCurrentImage(dotIndex)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentImage === dotIndex
                    ? "bg-white scale-125"
                    : "bg-white/50"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({
  fragranceDetails,
  handleQuickView,
  addToCart,
}) {
  return (
    <section
      id="shop"
      className="bg-[#fbf9f6]"
    >
      {fragranceDetails
        .filter((f) => f.name !== "Iris Noir")
        .map((item, index) => (
          <ProductShowcase
            key={item._id || index}
            item={item}
            index={index}
            handleQuickView={handleQuickView}
            addToCart={addToCart}
          />
        ))}
    </section>
  );
}