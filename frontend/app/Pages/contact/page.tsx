"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendMessage } from "../../service/api";

export default function ContactPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      await sendMessage(message); // 🔥 only message

      setShowPopup(true);
      setMessage("");

      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center px-6 py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white px-6 py-4 rounded-xl shadow-xl text-center">
            <p className="text-green-600 font-medium text-sm">
              Message Sent ✅
            </p>
          </div>
        </div>
      )}

      {/* CARD */}
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl p-6">

        <h1 className="text-2xl font-bold">Contact Us 📞</h1>

        <p className="text-sm text-slate-500 mt-2 mb-6">
          We’re here to help you anytime. Reach out to us below.
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div>
            <div className="mb-3 p-3 bg-slate-50 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-700">📧 Email</h3>
              <p className="text-sm text-slate-900">Foodie@example.com</p>
            </div>

            <div className="mb-3 p-3 bg-slate-50 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-700">📱 Phone</h3>
              <p className="text-sm text-slate-900">+94 74 58 26 286</p>
            </div>

            <div className="mb-3 p-3 bg-slate-50 rounded-lg">
              <h3 className="text-sm font-semibold text-slate-700">📍Head Quarters Location</h3>
              <p className="text-sm text-slate-900">Wellawatta, Colombo, Sri Lanka</p>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              💬 Your Message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-900"
              rows={8}
              placeholder="Type your message here..."
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 rounded-lg transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}