import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy, resetFilters } from "../../../../../redux/actions";
import styles from "../orderby/OrderBy.module.css";



export default function RazaExistente(props) {

    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.allDogs);
    const [isActiveA, setIsActiveA] = useState("");
    const [isActiveO, setIsActiveO] = useState("All");

    // const handleOnClick = (t) => {
    //     props.dispatch(filterByTemperament(t))
    // }


    const handleOnClick = (t) => {
        props.dispatch(orderBy(t));
    };

    function lol(t) {

        props.resetPage();
        if (isActiveO === t) {
            setIsActiveO("xd")
            dispatch(resetFilters())
        } else if (isActiveO !== t) {setIsActiveO(t)
            handleOnClick(t);
        }
  
    };


    return (
        <div className="filtros-orderby">
            <div className={styles["accordion-title"]} onClick={() => setIsActiveA(!isActiveA)}>
                <div className={styles["accordion-item"]} >
                    <b>Order By</b>
                </div>
                <div className={styles["accordion-item"]}>{isActiveA ? "-" : "+"}</div>
            </div>
            {isActiveA && (
                <div className={styles["order-container"]}>
                    <button 
                    key={"A-Z"}
                    className={"A-Z" === isActiveO ? styles["order-item-selected"] : styles["order-item"]}
                    onClick={(e)=>{lol(e.target.innerText)}}
                    >A-Z</button>
                    <button
                    key={"Z-A"}
                    className={"Z-A" === isActiveO ? styles["order-item-selected"] : styles["order-item"]}
                    onClick={(e)=>{lol(e.target.innerText)}}
                    >Z-A</button>
                    <button
                    key={"Highest Max Weight"}
                    className={"Highest Max Weight" === isActiveO ? styles["order-item-selected"] : styles["order-item"]}
                    onClick={(e)=>{lol(e.target.innerText)}}
                    >Highest Max Weight</button>
                    <button
                    key={"Lower Max Weight"}
                    className={"Lower Max Weight" === isActiveO ? styles["order-item-selected"] : styles["order-item"]}
                    onClick={(e)=>{lol(e.target.innerText)}}
                    >Lower Max Weight</button>
                </div>
            )}
        </div>
    )
}