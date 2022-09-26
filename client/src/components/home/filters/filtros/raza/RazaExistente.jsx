import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByOrigin, resetFilters } from "../../../../../redux/actions";
import styles from "../raza/RazaExistente.module.css";



export default function RazaExistente(props) {

    const dispatch = useDispatch();

    const [isActiveA, setIsActiveA] = useState("");
    const [isActiveR, setIsActiveR] = useState("All");

    // const handleOnClick = (t) => {
    //     props.dispatch(filterByTemperament(t))
    // }

    const handleOnClick = (t) => {
        props.dispatch(filterByOrigin(t));
    };

    function lol(t) {

        props.resetPage();
        if (isActiveR === t) {
            setIsActiveR("xd")
            dispatch(resetFilters())
        } else if (isActiveR !== t) {setIsActiveR(t)
            handleOnClick(t);
        }
  
    };


    return (
        <div className="filtros-razaexistente">
            <div className={styles["accordion-title"]} onClick={() => setIsActiveA(!isActiveA)}>
                <div className={styles["accordion-item"]} >
                    <b>Raza</b>
                </div>
                <div className={styles["accordion-item"]}>{isActiveA ? "-" : "+"}</div>
            </div>
            {isActiveA && (
                <div className={styles["raza-container"]}>
                    <button 
                    key={"all"}
                    className={"All" === isActiveR ? styles["races-item-selected"] : styles["races-item"]}
                    onClick={(e)=>{lol(e.target.innerText)}}
                    >All</button>
                    <button
                    key={"existent"}
                    className={"Existent" === isActiveR ? styles["races-item-selected"] : styles["races-item"]}
                    onClick={(e)=>{lol(e.target.innerText)}}
                    >Existent</button>
                    <button
                    key={"own"}
                    className={"Own" === isActiveR ? styles["races-item-selected"] : styles["races-item"]}
                    onClick={(e)=>{lol(e.target.innerText)}}
                    >Own</button>
                </div>
            )}
        </div>
    )
}