import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/banner1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00000090] via-[#00000050] to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex items-center h-screen">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 xl:px-0">
          <div className="max-w-2xl">

            {/* Tagline */}
            <p className="uppercase tracking-[0.35em] text-[11px] sm:text-xs text-[#d4b483] mb-6 animate-fadeIn">
              One Life, Infinite Fragrances
            </p>

            {/* Heading */}
            <h1
              className="
                font-serif
                text-white
                font-light
                leading-[1]
                text-3xl
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
                mb-8
              "
            >
              Where every scent
              <br />
              tells a story.
            </h1>

            {/* Description */}
            <p className="text-white/80 text-base sm:text-md max-w-lg leading-relaxed mb-10">
              Discover luxurious fragrances crafted to elevate every moment.
              Each bottle captures elegance, emotion, and timeless sophistication.
            </p>

            {/* Button */}
            <button
              onClick={() => navigate("/perfumes")}
              className="
                group
                border
                border-[#d4b483]
                text-[#d4b483]
                px-8
                py-4
                uppercase
                tracking-[0.25em]
                text-xs
                transition-all
                duration-500
                hover:bg-[#d4b483]
                hover:text-black
              "
            >
              Explore Collection
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}