"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCard() {
  const router = useRouter();

  const [flipped, setFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [blockedPopup, setBlockedPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // LOGIN
  const login = async () => {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 🔥 IMPORTANT
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {

      localStorage.setItem("user", JSON.stringify(data));
      
    if (email === "admin@gmail.com") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/Pages/Home";
    }
    } else {
      // 👇 instead of alert
      setErrorMsg(data.message || "Login failed");
      setBlockedPopup(true);
    }
  };

  // REGISTER
  const register = async () => {
    setError("");
    setSuccess("");

    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess("Account created! Please login");
      setFlipped(false);

      setName("");
      setEmail("");
      setPassword("");
    } else {
      // 👇 backend error message (like "Email already exists")
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="w-[380px] perspective">

      <div className={`relative w-full min-h-[450px] transition-transform duration-700 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}>

        {/* ================= LOGIN ================= */}
        <div className="absolute w-full h-full backface-hidden bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Login
          </h2>

          <input
            className="w-full p-3 mb-4 rounded bg-white text-black"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 mb-6 rounded bg-white text-black"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-200 mt-4">
            Don’t have account?{" "}
            <span
              onClick={() => setFlipped(true)}
              className="text-yellow-400 cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>

        {/* ================= REGISTER ================= */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/20 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6 text-white text-center">
            Create Account
          </h2>

          {error && (
            <p className="text-red-400 text-center mb-3">{error}</p>
          )}

          {success && (
            <p className="text-green-400 text-center mb-3">{success}</p>
          )}

          <input
            className="w-full p-3 mb-3 rounded bg-white text-black"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-3 mb-4 rounded bg-white text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 mb-6 rounded bg-white text-black"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={register}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-200 mt-4">
            Already have account?{" "}
            <span
              onClick={() => setFlipped(false)}
              className="text-yellow-400 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>

        {blockedPopup && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-white text-black p-6 rounded-xl shadow-lg w-[300px] text-center animate-bounce">

              <h2 className="text-xl font-bold mb-2">⚠️ Login Failed</h2>

              <p className="text-sm mb-4">{errorMsg}</p>

              <button
                onClick={() => setBlockedPopup(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}