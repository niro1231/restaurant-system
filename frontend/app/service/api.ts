const BASE_URL = "http://localhost:4000";


// =======================
// MENU API (PUBLIC or COOKIE AUTH if needed)
// =======================

export async function getMenu() {
  const res = await fetch(`${BASE_URL}/menu`, {
    credentials: "include",
  });

  return res.json();
}

export async function createMenu(data: any) {
  const res = await fetch(`${BASE_URL}/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 IMPORTANT
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateMenu(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteMenu(id: number) {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
}


// =======================
// USERS API
// =======================

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`, {
    credentials: "include",
  });

  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
}


// =======================
// CONTACT / MESSAGES API (FIXED)
// =======================

export async function sendMessage(message: string) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 COOKIE AUTH
    body: JSON.stringify({ message }),
  });

  return res.json();
}

export async function getMessages() {
  const res = await fetch(`${BASE_URL}/contact`, {
    credentials: "include",
  });

  return res.json();
}

export async function deleteMessage(id: number) {
  const res = await fetch(`${BASE_URL}/contact/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
}

export async function blockUser(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}/block`, {
    method: "PATCH",
    credentials: "include",
  });

  return res.json();
}

export async function unblockUser(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}/unblock`, {
    method: "PATCH",
    credentials: "include",
  });

  return res.json();
}