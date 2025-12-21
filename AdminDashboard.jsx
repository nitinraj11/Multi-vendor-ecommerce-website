import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchMe();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMe = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok && data.user) setCurrentUser(data.user);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // ignore
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          navigate('/login');
          return;
        }
        throw new Error(data.message || 'Failed to fetch users');
      }
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete user?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          navigate('/login');
          return;
        }
        throw new Error(data.message || 'Delete failed');
      }
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      String(u.id).includes(q)
    );
  });

  const totals = {
    all: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    vendors: users.filter(u => u.role === 'vendor').length,
    customers: users.filter(u => u.role === 'customer').length,
  };

  return (
    <div className="admin-wrap">
      <aside className="sidebar">
        <div className="brand">MyCommerce</div>
        <nav>
          <ul>
            <li className="active"><Link to="#">Users</Link></li>
            <li><Link to="#">Products</Link></li>
            <li><Link to="#">Orders</Link></li>
            <li><Link to="#">Settings</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="profile">
            <div className="avatar">{currentUser ? currentUser.name[0].toUpperCase() : 'A'}</div>
            <div>
              <div className="name">{currentUser ? currentUser.name : 'Admin'}</div>
              <div className="email">{currentUser ? currentUser.email : ''}</div>
            </div>
          </div>
          <div className="sidebar-actions">
            <button className="btn ghost" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); navigate('/login'); }}>Logout</button>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h2>Users</h2>
            <p className="muted">Manage all registered users</p>
          </div>
          <div className="header-right">
            <input className="search" placeholder="Search users by name, email, role or id" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </header>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-value">{totals.all}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totals.admins}</div>
            <div className="stat-label">Admins</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totals.vendors}</div>
            <div className="stat-label">Vendors</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totals.customers}</div>
            <div className="stat-label">Customers</div>
          </div>
        </section>

        <section className="panel">
          {loading && <p>Loading users...</p>}
          {error && <p className="error">{error}</p>}

          <div className="table-wrap">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={5}>No users match your search</td></tr>
                )}
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`role-pill role-${u.role}`}>{u.role}</span></td>
                    <td>
                      <button className="btn danger" onClick={() => deleteUser(u.id)} disabled={currentUser && u.id === currentUser.id} aria-label={`Delete user ${u.name}`} >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
