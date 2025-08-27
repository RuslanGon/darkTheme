import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice.js";
import { useNavigate, Link } from "react-router-dom";
import login from '../../assets/login.png';
import css from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (result.type === "auth/loginUser/fulfilled") {
      navigate("/my-app");
    }
  };

  return (
    <div className={css.loginWrapper}>
      <div className={css.imageContainer}>
        <img src={login} alt="login" />
      </div>
      <div className={css.formContainer}>
        <h2>Login</h2>
        {error && <p className={css.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={css.form}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <p className={css.signUpText}>
          Don’t have account? <Link to="/register" className={css.signUpLink}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
