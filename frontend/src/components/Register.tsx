import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const email = (form.email as any).value;
    const username = (form.username as any).value;
    const password = (form.password as any).value;
    try {
      const response = await fetch("/userfactory/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
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
      <div className="register-container">
        <h1 className="register-title">Registration</h1>
        <form>
          <div className="register-form-input">
            <label htmlFor="email" className="register-form-input-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className="register-form-input-field"
              placeholder="email"
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="username" className="register-form-input-label">
              Username
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="register-form-input-field"
              placeholder="username"
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="password" className="register-form-input-label">
              Password
            </label>
            <div className="register-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="register-form-input-field"
                placeholder="password"
                disabled={loading}
              />
              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="register-form-input">
            <label htmlFor="password" className="register-form-input-label">
              Confirm password
            </label>
            <div className="register-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className="register-form-input-field"
                placeholder="confirm password"
                disabled={loading}
              />
              <button
                type="button"
                className="register-password-toggle"
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
            className="register-form-button"
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <br />
          <h5>
            Already have an account?
            <Link to="/userfactory/login"> Log in here!</Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Register;
