"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center px-6 py-16">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-xl p-10">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            About <span className="text-blue-600">Us</span>
          </h1>

          <h3 className="text-lg font-semibold text-gray-700 mt-4">
            Discover Our Team's Story
          </h3>

          <p className="text-gray-500 mt-4 leading-relaxed">
            We are a team of passionate individuals dedicated to providing high-quality food and services.
          </p>

          <p className="text-gray-500 mt-3 leading-relaxed">
            We create unforgettable dining experiences for our customers.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6 text-gray-600">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-blue-600 hover:text-white cursor-pointer transition">
              <FaFacebookF />
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-blue-400 hover:text-white cursor-pointer transition">
              <FaTwitter />
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-pink-500 hover:text-white cursor-pointer transition">
              <FaInstagram />
            </div>
          </div>

          <button
            onClick={() => router.push("/#world-map")}
            className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            LEARN MORE
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/about2.jpg"
              alt="About us"
              loading="lazy"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-600 rounded-xl rotate-12 opacity-80"></div>
        </div>

      </div>
    </main>
  );
}