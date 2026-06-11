import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#eae3da] px-10 lg:px-16 py-20 border-t border-[#eae3da]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-20 items-start">

          {/* LEFT LINKS */}
          <div className="grid grid-cols-3 gap-12 text-left">
            {/* CUSTOMER CARE */}
            <div className="reveal-element">
              <h4 className="serif text-[24px] text-[#1e120e] mb-5">
                Customer Care
              </h4>

              <ul className="space-y-3 text-[13px] text-[#6e5e58]">
                <li className="hover:text-[#c5a880] cursor-pointer transition">FAQ</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Shipping & Returns</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Track Your Order</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Contact Us</li>
              </ul>
            </div>

            {/* ABOUT */}
            <div className="reveal-element reveal-delay-1">
              <h4 className="serif text-[24px] text-[#1e120e] mb-5">
                About OL7
              </h4>

              <ul className="space-y-3 text-[13px] text-[#6e5e58]">
                <li className="hover:text-[#c5a880] cursor-pointer transition">Our House</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Ingredients & Sourcing</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Journal</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Sustainability</li>
              </ul>
            </div>

            {/* SHOP */}
            <div className="reveal-element reveal-delay-2">
              <h4 className="serif text-[24px] text-[#1e120e] mb-5">
                Shop
              </h4>

              <ul className="space-y-3 text-[13px] text-[#6e5e58]">
                <li className="hover:text-[#c5a880] cursor-pointer transition">All Fragrances</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Bath & Body</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Discovery Set</li>
                <li className="hover:text-[#c5a880] cursor-pointer transition">Gift Card</li>
              </ul>
            </div>
          </div>

          {/* RIGHT NEWSLETTER */}
          <div className="flex flex-col items-end pt-2 reveal-element reveal-delay-3">
            <h2 className="serif text-[42px] leading-[1] text-[#1e120e] mb-4 text-right">
              Stay close to the house
            </h2>

            <p className="text-[#6e5e58] text-[13px] leading-6 mb-8 max-w-[420px] text-right">
              Receive new fragrance chapters, rituals, and occasional updates.
            </p>

            {/* EMAIL */}
            <div className="flex w-full max-w-[360px] border border-[#cdbfb0] bg-[#fbf9f6] h-[46px] rounded overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="
                  flex-1
                  bg-transparent
                  px-4
                  text-[13px]
                  text-[#1e120e]
                  placeholder:text-[#8b8179]
                  outline-none
                "
              />

              <button
                onClick={() => alert('Thank you for subscribing to OL7 newsletter!')}
                className="
                  bg-[#1e120e]
                  text-white
                  px-7
                  uppercase
                  tracking-[0.18em]
                  text-[10px]
                  hover:bg-[#c5a880]
                  hover:text-[#1e120e]
                  transition
                  font-medium
                "
              >
                Join ↗
              </button>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-5 mt-10 text-[#1e120e] text-[18px]">
              <i className="ri-tiktok-fill hover:text-[#c5a880] cursor-pointer transition"></i>
              <i className="ri-instagram-line hover:text-[#c5a880] cursor-pointer transition"></i>
              <i className="ri-pinterest-fill hover:text-[#c5a880] cursor-pointer transition"></i>
              <i className="ri-facebook-circle-fill hover:text-[#c5a880] cursor-pointer transition"></i>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-20 flex flex-col lg:flex-row items-start lg:items-center justify-between border-t border-[#cdbfb0] pt-10 text-left">
          <div>
            <div className="serif text-[52px] leading-none text-[#1e120e]">
              OL7
            </div>

            <p className="text-[12px] text-[#8d7f75] mt-3">
              &copy; 2026 One Life Perfumes. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
