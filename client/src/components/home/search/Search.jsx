import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName, resetFilters, setAllDogsinDogs} from "../../../redux/actions/index.js"
import styles from "./Search.module.css";

export default function Search(props) {
  const dispatch = useDispatch();
  const [dogByName, setDogByName] = useState("a");

  let resetPage = props.resetPage

  function capitalizeFirstLetter(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    document
    .querySelectorAll("#formFilters")
    .forEach((element) => element.reset());

    let inputMayusculeado = capitalizeFirstLetter(dogByName);

    dogByName && dispatch(getDogByName(inputMayusculeado));

    props.resetPage();
  };

  const handleChange = (e) => {
    setDogByName(e.target.value);
  };

//   useEffect(() => {
//     dogByName.length > 1||
//       (() => {
//         dispatch(resetFilters());
//         resetPage();
//       })();

//     // return () => {};
//   }, [dispatch, dogByName, resetPage]);

  return (
    <form id="search-bar" className={styles["form-search"]} onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        placeholder="Search for dogs..."
        type="text"
        className={styles["form-input"]}
      />
      <input type="submit" value="Search" className={styles["btn"]} />
    </form>
  );
}