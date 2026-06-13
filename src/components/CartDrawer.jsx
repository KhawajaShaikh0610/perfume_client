import React from "react";

export default function CartDrawer({
  cartOpen,
  setCartOpen,
  cart,
  setCart,
  onCheckout,
}) {
  const formatPrice = (price) => {
    return `₹${Number(price || 0).toFixed(2)}`;
  };

  const totalItemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartSubtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * item.quantity,
    0
  );

  const removeItem = (index) => {
    setCart((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateQuantity = (index, change) => {
    setCart((prev) => {
      const updated = [...prev];

      const newQty =
        updated[index].quantity + change;

      if (newQty <= 0) {
        return updated.filter(
          (_, i) => i !== index
        );
      }

      updated[index] = {
        ...updated[index],
        quantity: newQty,
      };

      return updated;
    });
  };

  console.log("cart::", cart)
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${cartOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#1e120e] text-[#fbf9f6] shadow-2xl p-8 flex flex-col transition-transform duration-300 ${cartOpen
          ? "translate-x-0"
          : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <h3 className="serif text-2xl tracking-wide uppercase">
            Shopping Bag ({totalItemCount})
          </h3>

          <button
            onClick={() => setCartOpen(false)}
            className="text-2xl hover:text-[#c5a880] transition"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <i className="ri-shopping-bag-line text-5xl text-white/20 mb-4"></i>

              <p className="serif text-xl text-white/60">
                Your shopping bag is empty
              </p>

              <button
                onClick={() => setCartOpen(false)}
                className="mt-6 border border-white/20 px-6 py-3 uppercase tracking-wider text-[10px] hover:bg-[#fbf9f6] hover:text-[#1e120e] transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item._id || item.name}-${item.size}`}
                className="flex gap-4 border-b border-white/10 pb-6"
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-white/5 rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="serif text-lg leading-tight">
                        {item.name}
                      </h4>

                      <p className="text-[10px] text-[#c5a880] uppercase tracking-wider mt-1">
                        {item.size}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(idx)}
                      className="text-white/40 hover:text-red-400 transition"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-white/10 rounded overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(idx, -1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition"
                      >
                        -
                      </button>

                      <span className="w-10 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(idx, 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Price */}
                    <div className="text-right">
                      <p className="text-[#c5a880] font-semibold">
                        {formatPrice(
                          Number(item.price) *
                          item.quantity
                        )}
                      </p>

                      <p className="text-[11px] text-white/40">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 pt-6 mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60">
                Subtotal
              </span>

              <span className="font-semibold text-[#c5a880] text-xl">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <p className="text-xs text-white/40 mb-6">
              Shipping & duties calculated at
              checkout.
            </p>

            <button
              onClick={onCheckout}
              className="w-full bg-[#c5a880] hover:bg-[#b4936b] text-[#1e120e] py-4 uppercase tracking-[0.2em] text-xs font-semibold transition duration-300"
            >
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}