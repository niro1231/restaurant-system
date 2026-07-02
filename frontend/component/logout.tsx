"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;
  const logout = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.replace("/");
    router.refresh(); 
  };

  return (
    <button
      onClick={logout}
      className="ml-2 px-4 py-2 rounded-lg bg-red-600 text-white"
    >
      Logout
    </button>
  );
}