import React from 'react'
import { Link } from 'react-router-dom'
import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.homeContainer}>
        <h1 className={css.title}>The chemical negatively charged</h1>
        <p className={css.text}>
          Numerous calculations predict, and experiments confirm, that the force field reflects the beam, 
          while the mass defect is not formed. The chemical compound is negatively charged. While the mass defect is
        </p>
        <Link to="/get-start" className={css.homeLink}>Get Started</Link>
    </div>
  )
}

export default Home
