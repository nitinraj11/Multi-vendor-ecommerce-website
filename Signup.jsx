import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Frontend validation (basic)
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      // store token and role if provided
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user && data.user.role) localStorage.setItem('role', data.user.role);

      // redirect based on role
      if (data.user && data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.user && data.user.role === 'vendor') {
        navigate('/vendor-dashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">
          Sign up to start selling or shopping
        </p>

        <form onSubmit={handleSubmit}>
          <div className={`form-field ${formData.name ? 'filled' : ''}`}>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className={`form-field ${formData.email ? 'filled' : ''}`}>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className={`form-field ${formData.password ? 'filled' : ''}`}>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className={`form-field ${formData.role ? 'filled' : ''}`}>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
            <label htmlFor="role">Role</label>
          </div>

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
