import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createApplication } from "../../features/applications/applicationsSlice";
import { useNavigate } from "react-router-dom";
import css from "./Applications.module.css";

const Applications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    const result = await dispatch(createApplication(form));

    if (result.type === "applications/createApplication/fulfilled") {
      setForm({ title: "", description: "" });
      navigate("/my-app"); // редирект на MyApp
    }
  };

  return (
    <div className={css.container}>
      <h2>Create Application</h2>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Create Application</button>
      </form>
    </div>
  );
};

export default Applications;
