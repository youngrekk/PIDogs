import React from "react";
import styles from "../cards/Cards.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDog } from "../../redux/actions";

export default function Cards({img, name, temperaments, weight, id}) {
    const dispatch = useDispatch();

    let esDb = "";

    if (typeof id === "string") {
        esDb = "y";
    }
    function onClickHandle() {
        dispatch(getDog(id))
    }
    return (
        <div className={styles["cards"]}>
            <Link to={`/home/${id}?db=${esDb}`}>
                <img src={img} alt="sprites" className={styles["img"]} onClick={onClickHandle}></img>
            </Link>

            <div className={styles["div-description"]}>
                <h1 className={styles["div-name"]}>{name}</h1>
                <p>{temperaments}</p>
                <p>{weight} KG</p>
            </div>
        </div>
    )
}