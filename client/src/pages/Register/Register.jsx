import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice.js";
import { useNavigate, Link } from "react-router-dom";
import login from '../../assets/login.png'; 
import css from "./Register.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (result.type === "auth/registerUser/fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className={css.loginWrapper}>
      <div className={css.imageContainer}>
        <img src={login} alt="register" />
      </div>
      <div className={css.formContainer}>
        <h2>Register</h2>
        {error && <p className={css.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={css.form}>
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className={css.signUpText}>
          Already have an account? <Link to="/login" className={css.signUpLink}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
