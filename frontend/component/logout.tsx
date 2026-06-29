"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("http://localhost:4000/auth/logout", {
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