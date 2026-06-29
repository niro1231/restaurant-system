"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
};

export default function Home() {
  const router = useRouter();

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [menuLoading, setMenuLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  // 🎯 OFFERS SLIDER STATE
  const offers = [
    {
      id: 1,
      title: "🔥 50% OFF Burgers",
      desc: "Limited time offer on all burgers",
      image: "/burger50.jpg",
    },
    {
      id: 2,
      title: "🥤 Free Drink Combo",
      desc: "Get a free drink with any meal",
      image: "/free.jpg",
    },
    {
      id: 3,
      title: "🍰 Dessert Deal",
      desc: "Japaneese 50% Free Desserts",
      image: "/dessert.jpg",
    },
  ];

  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const normalize = (v?: string) => (v ?? "").toString().trim().toLowerCase();

  // 🔐 AUTH CHECK
  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie.includes("token=");
      if (!token) {
        router.replace("/");
      }
    };

    checkAuth();
    window.addEventListener("pageshow", checkAuth);

    return () => window.removeEventListener("pageshow", checkAuth);
  }, [router]);

  // 🍽️ FETCH MENU
  useEffect(() => {
    fetch("http://localhost:4000/menu")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch menu");
        return res.json();
      })
      .then((data) => {
        setMenu(data);
        setMenuLoading(false);
      })
      .catch(() => {
        setError("Failed to load menu 😢");
        setMenuLoading(false);
      });
  }, []);

  const handleOrder = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // 🔎 FILTER MENU
  const filtered = useMemo(() => {
    const active = normalize(activeCategory);
    const q = search.toLowerCase().trim();

    return menu.filter((item) => {
      const name = item.name ?? "";
      const desc = item.description ?? "";
      const cat = normalize(item.category);

      const matchSearch =
        name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);

      const matchCategory = active === "all" || cat === active;

      return matchSearch && matchCategory;
    });
  }, [menu, search, activeCategory]);

  const food = filtered.filter((i) => normalize(i.category) === "food");
  const drink = filtered.filter((i) => normalize(i.category) === "drink");
  const dessert = filtered.filter((i) => normalize(i.category) === "dessert");

  const Section = ({ title, emoji, items }: any) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
          <span className="text-sm font-bold text-white">
            {emoji} {title}
          </span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((item: MenuItem) => (
            <div
              key={item.id}
              className="bg-white/10 border border-white/10 rounded-md overflow-hidden hover:scale-[1.03] transition shadow-md"
            >
              <div className="aspect-square bg-black overflow-hidden">
                <img
                  src={`/${item.image}`}
                  className="w-full h-full object-cover"
                  alt={item.name}
                />
              </div>

              <div className="p-3">
                <h3 className="text-[14px] font-bold truncate">{item.name}</h3>

                <p className="text-gray-400 text-[11px] line-clamp-2 mt-1">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-400 text-[13px] font-bold">
                    ${item.price.toFixed(2)}
                  </span>

                  <button
                    onClick={handleOrder}
                    className="px-4 py-1.5 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-500 transition shadow-sm"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (menuLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white">
        Loading menu...
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-4 py-6">

      {/* 🎯 OFFERS SLIDER */}
      <div>

        <div className="relative w-full h-80 rounded-xl overflow-hidden border border-white/10">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`absolute inset-0 transition-opacity duration-700 ${index === currentOffer ? "opacity-100" : "opacity-0"
                }`}
            >
              <img
                src={offer.image}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-center px-6">
                <h2 className="text-xl font-bold">{offer.title}</h2>
                <p className="text-sm text-gray-200 mt-1">{offer.desc}</p>

                <button
                  onClick={() => {
                    setSelectedOffer({
                      title: "🎁 Special Foodie Offer",
                      desc: "Enjoy exclusive deals at your nearest Foodie restaurant. Limited time only!"
                    });
                    setShowOfferModal(true);
                  }}
                  className="mt-3 w-fit px-4 py-2 bg-blue-600 rounded-md text-xs hover:bg-blue-500 transition"
                >
                  Grab Offer
                </button>
              </div>
            </div>
          ))}

          {/* DOTS */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {offers.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentOffer(i)}
                className={`w-2 h-2 rounded-full cursor-pointer ${i === currentOffer ? "bg-blue-500" : "bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* HEADER */}

      <div className="mt-8 mb-6">
        <div />
        <div className="relative h-full flex flex-col justify-center px-4 text-center">
          <h1 className="text-lg sm:text-xl font-bold">🍽️ Restaurant Menu</h1>

          <p className="text-gray-200 text-[10px] mt-1">
            Search & explore delicious food
          </p>

          <div className="w-full max-w-xl mx-auto mt-3">
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white text-black text-xs outline-none"
            />
          </div>

          <div className="flex justify-center gap-2 flex-wrap mt-3">
            {["All", "Food", "Drink", "Dessert"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-[10px] rounded-full border transition ${activeCategory === cat
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-center text-red-400 text-sm mb-3">
          {error}
        </div>
      )}

      {/* MENU */}
      <Section title="Food" emoji="🍔" items={food} />
      <Section title="Drinks" emoji="🥤" items={drink} />
      <Section title="Desserts" emoji="🍰" items={dessert} />

      {/* 🌍 WORLD MAP SECTION */}
      <div id="world-map" className="mt-10">
        <div className="relative w-full h-[340px] rounded-xl overflow-hidden border border-white/10">
          <img src="/world.png" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="text-left max-w-sm">
              <h2 className="text-xl font-bold">🍽️ Foodie Global Presence</h2>
              <p className="text-gray-200 text-xs mt-2">
                We are expanding worldwide with premium food experience.
              </p>
            </div>

            <div className="flex flex-col items-center">

              <div className="w-36 h-36 rounded-lg overflow-hidden border border-white/20">
                <img
                  src="/singapore.jpg"
                  className="w-full h-full object-cover"
                  alt="Singapore Branch"
                />
              </div>

              <p className="mt-2 text-xs text-gray-300 text-center">
                ⭐ Featured Shop:{" "}
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* 🏆 SERVICE & LEGACY SECTION */}
      <div id="team" className="mt-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">

          <h2 className="text-xl font-bold mb-3">
            🍽️ Our Service & Legacy
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed max-w-3xl mx-auto">
            For years, we have been dedicated to delivering high-quality food experiences
            that bring people together. From humble beginnings to a growing global presence,
            our journey is built on passion, consistency, and customer satisfaction.
          </p>

          <p className="text-gray-300 text-sm leading-relaxed max-w-3xl mx-auto mt-3">
            We believe food is more than just a meal — it is an experience, a memory,
            and a connection between cultures. Our chefs and team work every day to
            maintain excellence, innovation, and trust in every dish we serve.
          </p>

          <div className="mt-5 flex justify-center gap-4 flex-wrap text-xs text-gray-200">
            <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
              ⭐ 10+ Years Experience
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
              🌍 Global Expansion
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
              👨‍🍳 Expert Chefs
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
              ❤️ Customer First
            </span>
          </div>

        </div>
      </div>

      {/* 👑 OWNER / PARTNERS SECTION (COMPACT VERSION) */}
      <div className="mt-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">

          <h2 className="text-lg font-bold text-center mb-5">
            👑 Our Owners & Partners
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* 👑 FOUNDER (COMPACT) */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">

              <div className="w-40 h-40 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
                <img
                  src="/seeman.jpg"
                  className="w-full h-full object-cover"
                  alt="Founder"
                />
              </div>

              <div className="text-center md:text-left">

                <h3 className="text-base font-bold">
                  👑 Founder & CEO
                </h3>

                <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                  15+ years experience in hospitality and culinary excellence.
                  Focused on quality, innovation, and customer satisfaction.
                </p>

                <p className="text-gray-300 text-xs mt-2 leading-relaxed">
                  Expert in Culinary Arts & Restaurant Management with global exposure.
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-gray-200 justify-center md:justify-start">

                  <span className="px-2 py-1 bg-white/10 rounded-full border border-white/10">
                    🎓 Certified
                  </span>

                  <span className="px-2 py-1 bg-white/10 rounded-full border border-white/10">
                    ⭐ 15+ Years
                  </span>

                  <span className="px-2 py-1 bg-white/10 rounded-full border border-white/10">
                    🌍 Global
                  </span>

                </div>

              </div>
            </div>

            {/* 👨‍🍳 PARTNER (COMPACT) */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">

              <div className="w-40 h-40 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
                <img
                  src="/cm.jpg"
                  className="w-full h-full object-cover"
                  alt="Partner"
                />
              </div>

              <div className="text-center md:text-left">

                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h3 className="text-base font-bold">
                    👑 Strategic Partner
                  </h3>

                  <span className="text-[9px] px-2 py-0.5 bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 rounded-full">
                    Co-Founder
                  </span>
                </div>

                <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                  15+ years in restaurant operations and business growth.
                  Focused on scaling and improving customer experience.
                </p>

                <p className="text-gray-300 text-xs mt-2 leading-relaxed">
                  Expert in operations, expansion, and global quality standards.
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-gray-200 justify-center md:justify-start">

                  <span className="px-2 py-1 bg-white/10 rounded-full border border-white/10">
                    📈 Strategy
                  </span>

                  <span className="px-2 py-1 bg-white/10 rounded-full border border-white/10">
                    🌍 Expansion
                  </span>

                  <span className="px-2 py-1 bg-white/10 rounded-full border border-white/10">
                    🏢 Operations
                  </span>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ORDER MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-bold mb-2">⚙️ System Maintenance Notice</h2>

            <p className="text-sm mb-3 text-gray-700">
              The ordering service is currently under scheduled maintenance.
            </p>

            <p className="text-sm mb-3 text-gray-700">
              We are working to restore full functionality as soon as possible.
              During this period, online ordering is temporarily unavailable.
            </p>

            <p className="text-sm mb-3 text-gray-700">
              However, selected items may be available at{" "}
              <span className="font-bold text-black">
                nearby partner restaurants or outlets.
              </span>{" "}
            </p>

            <p className="text-xs text-gray-500 mb-4">
              Please try again later. We appreciate your patience and understanding.
            </p>
            <button
              onClick={closeModal}
              className="w-full py-2 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showOfferModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl max-w-sm w-full shadow-lg text-center">

            <h2 className="text-xl font-bold mb-2">
              🎉 {selectedOffer.title}
            </h2>

            <p className="text-sm text-gray-700 mb-3">
              {selectedOffer.desc}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-xs mb-4">
              🍽️ Exclusive Foodie Offer Activated! <br />
              Visit your nearest <b>Foodie Partner Shop</b> or order online to claim this deal before it ends.
            </div>

            <p className="text-xs text-gray-500 mb-4">
              ⚡ Limited time offer — Don’t miss out!
            </p>

            <button
              onClick={() => setShowOfferModal(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </main>
  );
}