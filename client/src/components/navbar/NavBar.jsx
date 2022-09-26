import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getAllDogs, resetFilters, setAllDogsinDogs } from "../../redux/actions";

import styles from "./Navbar.module.css";
// import Footer from "../Footer/Footer";

export default function Navbar() {

  const dispatch = useDispatch();

  function nashe() {

    dispatch(getAllDogs());
    dispatch(resetFilters());
  }

  return (
    <>
      <div className={styles["topnav"]}>
        <h1 className={styles["h1-navbar"]} onClick={nashe()}>
          <Link to="/home" className={styles["link-home"]}>
            Dogs
          </Link>
        </h1>

        <button className={styles["btn"]}>
          <Link to="/home/new-dog">Create Dog</Link>
        </button>
      </div>
      {/* <Outlet /> */}
      {/* <Footer /> */}
    </>
  );
}