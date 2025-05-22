import React, { useState } from "react";
import "./Login.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const username = (form.username as any).value;
    const password = (form.password as any).value;
    try {
      const response = await fetch("/userfactory/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.detail || data.error || "Login failed");
      } else {
        setError("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="login-form-input">
            <label htmlFor="username" className="login-form-input-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="login-form-input-field"
              placeholder="username"
              disabled={loading}
            />
          </div>
          <div className="login-form-input">
            <label htmlFor="password" className="login-form-input-label">
              Password
            </label>
            <div className="login-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="login-form-input-field"
                placeholder="password"
                disabled={loading}
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="login-form-button"
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "0.25rem" }}>
          <h5>Forgot password? Get new here!</h5>
          <h5>
            Don't have an account?
            <Link to="/userfactory/register"> Create one here!</Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Login;
