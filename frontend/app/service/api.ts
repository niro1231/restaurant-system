const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }

  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// =======================
// MENU API
// =======================

export async function getMenu() {
  const res = await fetch(`${BASE_URL}/menu`, {
    headers: getAuthHeaders(),
  });

  return res.json();
}

export async function createMenu(data: any) {
  const res = await fetch(`${BASE_URL}/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateMenu(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteMenu(id: number) {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return res.json();
}


// =======================
// USERS API
// =======================

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: getAuthHeaders(),
  });

  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return res.json();
}


// =======================
// CONTACT / MESSAGES API (FIXED)
// =======================

export async function sendMessage(message: string) {
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  const email = user?.email || "";

  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ message, email }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send message");
  }

  return res.json();
}

export async function getMessages() {
  const res = await fetch(`${BASE_URL}/contact`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to load messages");
  }

  return res.json();
}

export async function deleteMessage(id: number) {
  const res = await fetch(`${BASE_URL}/contact/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return res.json();
}

export async function blockUser(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}/block`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  return res.json();
}

export async function unblockUser(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}/unblock`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  return res.json();
}