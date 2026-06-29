"use client";

import Link from "next/link";
import "./globals.css";
import LogoutButton from "@/component/logout";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide navigation links on landing page
  const hideNavbar = pathname === "/";

  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">

        {/* Background Glow */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full" />
        </div>

        {/* Header */}
        <header className="h-[64px] sticky top-0 z-50 flex items-center border-b border-white/10 backdrop-blur-xl bg-slate-900/60">
          <div className="w-full flex items-center justify-between px-6">

            {/* Logo - Always Visible */}
            <Link href="/" className="text-2xl font-extrabold tracking-wide">
              <span className="text-yellow-400">🍽️</span>{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Foodie
              </span>
            </Link>

            {/* Navigation - Hidden only on Landing Page */}
            {!hideNavbar && (
              <nav className="flex items-center gap-2 text-sm">

                <Link
                  href="/Pages/Home"
                  className="px-3 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  Home
                </Link>

                <Link
                  href="/Pages/about"
                  className="px-3 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  About
                </Link>

                <Link
                  href="/Pages/contact"
                  className="px-3 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  Contact
                </Link>

                <LogoutButton />

              </nav>
            )}

          </div>
        </header>

        {/* Main Content */}
        <main
          className={`w-full ${
            hideNavbar
              ? "min-h-[calc(100vh-64px)]"
              : "min-h-[calc(100vh-64px)]"
          }`}
        >
          {children}
        </main>

      </body>
    </html>
  );
}