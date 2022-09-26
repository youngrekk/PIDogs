import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByTemperament, resetFilters } from "../../../../../redux/actions";
import styles from "../temperaments/Temperamentos.module.css";





export default function Temperamentos(props) {
    
    const dispatch = useDispatch();
    
    const [isActiveA, setIsActiveA] = useState("")
    const [isActiveT, setIsActiveT] = useState("")
    // console.log(dsispatch)
    
    const handleOnClick = (t) => {
        props.dispatch(filterByTemperament(t))
    }

    function lol(t) {
        props.resetPage()
        if (isActiveT === t) {
            setIsActiveT("xd")
            dispatch(resetFilters())
        }
        else if (isActiveT !== t) {setIsActiveT(t)
        handleOnClick(t);
        }
    }
    
    return (
        <div className="filtros-temperaments">
            <div className={styles["accordion-title"]} onClick={() => setIsActiveA(!isActiveA)}>
                <div className={styles["accordion-item"]}>
                    <b>Temperaments</b>
                </div>
                <div className={styles["accordion-item"]}>{isActiveA ? "-" : "+"}</div>
            </div>
            {isActiveA && (
                <div className={styles["temperaments-container"]}>
                    {props.temperaments.map((t, index) => {
                    return (
                        <button 
                            key={index}
                            className={t === isActiveT ? styles["temperaments-item-selected"] : styles["temperaments-item"]} 
                            onClick={(t) => {lol(t.target.innerText)}}>
                            {t}
                        </button>
                    )
                    })};
                </div>                   
            )}         
        </div>
    )
}