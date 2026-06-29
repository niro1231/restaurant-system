"use client";

import AuthCard from "@/component/authcard";


export default function Home() {
  return (
    <div
      className="w-full min-h-[calc(100vh-64px)] flex relative"
      style={{
        backgroundImage: "url('/Foodie.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      <div className="relative z-10 w-full flex">

        {/* LEFT SIDE - LANDING CONTENT */}
        <div className="w-1/2 h-full flex flex-col justify-center px-20 text-white">

          <h1 className="text-6xl font-extrabold leading-tight">
            🍽️ Foodie Restaurant
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-xl">
            Welcome to Foodie Restaurant — where taste meets perfection.
            We serve fresh, delicious meals made by world-class chefs
            with passion and quality.
          </p>

          <div className="mt-8 space-y-2 text-gray-200">
            <p>🔥 Fresh Ingredients</p>
            <p>👨‍🍳 Expert Chefs</p>
            <p>🍕 Wide Variety of Dishes</p>
            <p>🚀 Fast Service</p>
          </div>

          <p className="mt-10 italic text-gray-300">
            “Great food brings great memories.”
          </p>

        </div>

        {/* RIGHT SIDE - LOGIN CARD */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <AuthCard />
        </div>

      </div>
    </div>
  );
}