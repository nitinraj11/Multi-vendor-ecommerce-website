import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "admin") {
      navigate("/");
      return;
    }

    fetchMe();
    fetchUsers();
  }, []);

  /* 👤 CURRENT ADMIN */
  const fetchMe = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCurrentUser(data.user);
    } catch {}
  };

  /* 👥 USERS */
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ❌ DELETE USER */
  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch {
      alert("Delete failed");
    }
  };

  /* 🔍 SEARCH */
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  const totals = {
    all: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    vendors: users.filter((u) => u.role === "vendor").length,
    customers: users.filter((u) => u.role === "customer").length,
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <h1 className="text-xl font-bold text-green-400 mb-6">
          Pet-Pashu Admin
        </h1>

        <nav className="space-y-2">
          <Link className="block px-4 py-2 rounded bg-white/10" to="#">
            Users
          </Link>
          <Link className="block px-4 py-2 rounded hover:bg-white/10" to="#">
            Products
          </Link>
          <Link className="block px-4 py-2 rounded hover:bg-white/10" to="#">
            Orders
          </Link>
          <Link className="block px-4 py-2 rounded hover:bg-white/10" to="#">
            Settings
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center font-bold">
              {currentUser?.name?.[0] || "A"}
            </div>
            <div>
              <p className="font-semibold">{currentUser?.name || "Admin"}</p>
              <p className="text-xs text-slate-400">
                {currentUser?.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full py-2 rounded bg-red-500 hover:bg-red-600 font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold">Users</h2>
            <p className="text-slate-500">
              Manage all registered users
            </p>
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="px-4 py-2 border rounded-lg w-80"
          />
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Stat title="Total Users" value={totals.all} />
          <Stat title="Admins" value={totals.admins} />
          <Stat title="Vendors" value={totals.vendors} />
          <Stat title="Customers" value={totals.customers} />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow p-6">
          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-slate-500">
                    No users found
                  </td>
                </tr>
              )}

              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b hover:bg-slate-50">
                  <td className="py-3">{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs text-white
                        ${
                          u.role === "admin"
                            ? "bg-slate-800"
                            : u.role === "vendor"
                            ? "bg-purple-600"
                            : "bg-teal-500"
                        }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <button
                      disabled={u.id === currentUser?.id}
                      onClick={() => deleteUser(u.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-slate-500 text-sm">{title}</p>
  </div>
);

export default AdminDashboard;
