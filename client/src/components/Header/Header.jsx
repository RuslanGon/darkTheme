import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>Zenbit Tech</Link>
      <nav>
        {user ? (
          <div className={styles.userMenu}>
            <span className={styles.userName}>Hello, {user.name}</span>
            <Link to="/applications" className={styles.navLink}> Add applications</Link>
            <Link to="/my-app" className={styles.navLink}> My applications</Link>

            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>Log In</Link>
            <Link to="/register" className={styles.navLink}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
