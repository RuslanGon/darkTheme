import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications, setAuthToken, deleteApplication } from "../../features/applications/applicationsSlice";
import { FaTrash } from "react-icons/fa";
import css from "./MyApp.module.css";

const MyApp = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { list, loading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(fetchApplications());
    }
  }, [dispatch, token]);

  const handleDelete = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <div className={css.container}>
      <h2>My Applications</h2>

      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}

      <div className={css.list}>
        {list.map((app) => (
          <div key={app._id} className={css.item}>
            <p>title: {app.title}</p>
            <p>description: {app.description}</p>
            <FaTrash
              className={css.deleteIcon}
              onClick={() => handleDelete(app._id)}
              title="Delete"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApp;
