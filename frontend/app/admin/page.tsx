"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu,
  getUsers,
  deleteUser,
  getMessages, // ✅ ADD THIS
  deleteMessage,
  blockUser,
  unblockUser,
} from "../service/api";

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  blocked: boolean;
};

type Message = {
  id: number;
  message: string;
  createdAt?: string;
  email?: string; // ✅ NEW
};

export default function AdminPage() {
  const router = useRouter();

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [users, setUsers] = useState<User[]>([]); // ✅ FIXED
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"menu" | "users" | "notifications">("menu");
  const [search, setSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  // =========================
  // FETCH MENU
  // =========================
  const fetchMenu = async () => {
    const data = await getMenu();
    setMenu(data);
  };

  // =========================
  // FETCH USERS (ONLY CHANGE HERE)
  // =========================
  const fetchUsers = async () => {
    const res = await getUsers();

    const usersArray = res?.users || res?.data || res;

    setUsers(Array.isArray(usersArray) ? usersArray : []);
  };

  // =========================
  // FETCH MSG (ONLY CHANGE HERE)
  // =========================

  const fetchMessages = async () => {
    try {
      const data = await getMessages();

      // supports multiple backend formats
      const msgArray = data?.messages || data?.data || data;

      setMessages(Array.isArray(msgArray) ? msgArray : []);
    } catch (err) {
      console.error("Failed to fetch messages", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchUsers(); // ✅ added
    fetchMessages(); // ✅ ADD THIS
  }, []);

  // =========================
  // DELETE USERS (ONLY CHANGE HERE)
  // =========================

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  // =========================
  // DELETE USERS (ONLY CHANGE HERE)
  // =========================

  const handleDeleteMessage = async (id: number) => {
    await deleteMessage(id);
    fetchMessages();
  };

  // =========================
  // CREATE / UPDATE MENU
  // =========================
  const addItem = async () => {
    if (!form.name || !form.price || !form.category) return;

    if (editId) {
      await updateMenu(editId, {
        ...form,
        price: Number(form.price),
      });
    } else {
      await createMenu({
        ...form,
        price: Number(form.price),
      });
    }

    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });

    setEditId(null);
    setOpen(false);
    fetchMenu();
  };

  // =========================
  // Delete MENU
  // =========================

  const deleteItem = async (id: number) => {
    await deleteMenu(id);
    fetchMenu();
  };

  const handleBlockUser = async (id: number) => {
    await blockUser(id);
    fetchUsers();
  };

  const handleUnblockUser = async (id: number) => {
    await unblockUser(id);
    fetchUsers();
  };

  // =========================
  // MENU FILTER
  // =========================
  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        filter === "All" || item.category === filter;

      return matchesSearch && matchesCategory;
    });
  }, [menu, search, filter]);

  // =========================
  // USERS FILTER (SAFE)
  // =========================
  const filteredUsers = useMemo(() => {
    return (Array.isArray(users) ? users : []).filter((user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [users, userSearch]);

  // =========================
  // UI (UNCHANGED)
  // =========================
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      {/* HEADER */}
      <div className="px-8 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            🍔 Restaurant Admin Panel
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage menu items easily and in real-time
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab("notifications")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${tab === "notifications"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            🔔 Notifications
          </button>

          <button
            onClick={() => setTab("users")}
            className={`px-4 py-2 rounded-xl font-semibold transition ${tab === "users"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
              }`}
          >
            👤 Manage User
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="px-6 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        {tab === "menu" ? (
          <>
            <div className="flex flex-col md:flex-row gap-3 items-center w-full">

              <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/3 p-2.5 text-sm rounded-lg bg-gray-800 border border-white/10 text-white outline-none"
              />

              <div className="flex gap-2 flex-wrap">
                {["All", "Food", "Drink", "Dessert"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${filter === cat
                      ? "bg-blue-600"
                      : "bg-gray-800 hover:bg-gray-700"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setEditId(null);
                setForm({
                  name: "",
                  description: "",
                  price: "",
                  image: "",
                  category: "",
                });
                setOpen(true);
              }}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-lg whitespace-nowrap"
            >
              + Add Item
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full md:w-1/3 p-2.5 text-sm rounded-lg bg-gray-800 border border-white/10 text-white outline-none"
            />

            <button
              onClick={() => setTab("menu")}
              className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition font-semibold"
            >
              ← Back
            </button>
          </>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* MENU */}
        {tab === "menu" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 border border-white/10 rounded-md overflow-hidden hover:scale-[1.03] transition shadow-md"
              >
                {/* IMAGE */}
                <div className="aspect-square bg-black overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image.startsWith("/") ? item.image : `/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-3">

                  <h3 className="text-[14px] font-bold truncate">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-[11px] mt-1 uppercase">
                    {item.category}
                  </p>

                  <p className="text-gray-400 text-[11px] line-clamp-2 mt-1">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-400 text-[13px] font-bold">
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">

                    <button
                      onClick={() => {
                        setEditId(item.id);
                        setForm({
                          name: item.name,
                          description: item.description,
                          price: String(item.price),
                          image: item.image,
                          category: item.category,
                        });
                        setOpen(true);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-md bg-yellow-500 hover:bg-yellow-400 text-xs font-semibold transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-1 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-xs font-semibold transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* USERS */}
        {tab === "users" && (
          <div className="bg-white/10 border border-white/10 rounded-xl p-4 overflow-x-auto">

            <h2 className="text-lg font-semibold mb-4">👤 Users List</h2>

            <table className="w-full text-sm text-left">
              <thead className="text-gray-300 border-b border-white/10">
                <tr>
                  <th className="py-2">ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5">
                    <td className="py-2">{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      <div className="flex justify-center gap-2">

                        <button
                          disabled={user.id === 1}
                          onClick={() => {
                            if (user.id !== 1) {
                              if (user.blocked) {
                                handleUnblockUser(user.id);
                              } else {
                                handleBlockUser(user.id);
                              }
                            }
                          }}
                          className={`px-3 py-1 rounded-md text-xs font-semibold transition ${user.id === 1
                              ? "bg-gray-600 opacity-50 cursor-not-allowed"
                              : user.blocked
                                ? "bg-green-600 hover:bg-green-500"
                                : "bg-yellow-500 hover:bg-yellow-400 text-black"
                            }`}
                        >
                          {user.id === 1
                            ? "Admin"
                            : user.blocked
                              ? "Unblock"
                              : "Block"}
                        </button>

                        <button
                          disabled={user.id === 1}
                          onClick={() => {
                            if (user.id !== 1) {
                              setDeleteUserId(user.id);
                            }
                          }}
                          className={`px-3 py-1 rounded-md text-xs font-semibold transition ${user.id === 1
                              ? "bg-gray-600 opacity-50 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-500"
                            }`}
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

        {/* notifications */}

        {tab === "notifications" && (
          <div className="bg-white/10 border border-white/10 rounded-xl p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">🔔 Contact Messages</h2>

            <table className="w-full text-sm text-left">
              <thead className="text-gray-300 border-b border-white/10">
                <tr>
                  <th className="py-2">ID</th>
                  <th>Email</th> {/* ✅ NEW */}
                  <th>Message</th>
                  <th>Time</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-gray-400">
                      No messages found
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id} className="border-b border-white/5">
                      <td className="py-2">{msg.id}</td>
                      <td>{msg.email}</td> {/* ✅ NEW */}
                      <td>{msg.message}</td>

                      <td className="text-gray-400">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleString()
                          : "—"}
                      </td>

                      <td className="text-right">
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="px-3 py-1 rounded-md text-xs font-semibold bg-red-600 hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="w-[90%] max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl">

            <h2 className="text-xl font-semibold mb-4">
              {editId ? "✏️ Update Item" : "➕ Add New Item"}
            </h2>

            <div className="space-y-4">

              <input
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
                placeholder="Item Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

              <input
                className="w-full p-3 rounded-xl bg-white/10 border border-white/10 text-white outline-none"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />

              <select
                className="w-full p-3 rounded-xl bg-gray-800 border border-white/10 text-white outline-none"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Drink">Drink</option>
                <option value="Dessert">Dessert</option>
              </select>

              <div className="flex gap-3 pt-2">

                <button
                  onClick={addItem}
                  className="flex-1 py-2 rounded-xl bg-green-600 hover:bg-green-500 font-semibold"
                >
                  Save
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 font-semibold"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

      {deleteUserId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-gray-900 border border-white/10 rounded-xl p-6 w-[90%] max-w-sm text-center">

            <h2 className="text-lg font-semibold mb-3">
              ⚠️ Confirm Delete
            </h2>

            <p className="text-gray-400 text-sm mb-5">
              Are you sure you want to delete this user?
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => {
                  handleDeleteUser(deleteUserId);
                  setDeleteUserId(null);
                }}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-semibold"
              >
                Delete
              </button>

              <button
                onClick={() => setDeleteUserId(null)}
                className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 font-semibold"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}