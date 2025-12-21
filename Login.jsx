import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login1.css";

// Optional: demo credentials for testing
// admin@example.com / pass123 (admin role)
// vendor@example.com / pass123 (vendor role)
// customer@example.com / pass123 (customer role)

/*
  Note: To avoid CORS in development, the frontend requests to /api/* are proxied to the backend.
  If running the backend separately on port 4000, create a dev proxy or start both servers.
*/

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.role) {
      setError("All fields are required");
      return;
    }

    setError("");

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // store token and role
      if (data.token) localStorage.setItem('token', data.token);
      if (data.role) localStorage.setItem('role', data.role);

      // redirect based on role returned by backend
      if (data.role === 'admin') navigate('/admin-dashboard');
      else if (data.role === 'vendor') navigate('/vendor-dashboard');
      else navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Log in to your account</h2>
        <p className="subtitle">Welcome back 👋</p>

        <form onSubmit={handleSubmit}>
          <div className={`form-field ${form.email ? 'filled' : ''}`}>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className={`form-field ${form.password ? 'filled' : ''}`}>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className={`form-field ${form.role ? 'filled' : ''}`}>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="" disabled></option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
            <label htmlFor="role">Role</label>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit">Login</button>
        </form>

        <div className="footer-links">
          <a href="#">Forgot password?</a>
          <Link to="/signup">Create account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
