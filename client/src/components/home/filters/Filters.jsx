import React from "react";
import { useSelector } from "react-redux";
import Temperamentos from "./filtros/temperaments/Temperamentos.jsx"
import RazaExistente from "./filtros/raza/RazaExistente.jsx";
import OrderBy from "./filtros/orderby/OrderBy.jsx"
import styles from "../filters/Filters.module.css"

const Filters = (props) => {

    
    return (
            <div className={styles["filters-container"]}>
                <Temperamentos temperaments={props.temperamentos} dispatch={props.dispatch} resetPage={props.resetPage}/>
                <RazaExistente dispatch={props.dispatch} resetPage={props.resetPage}/>
                <OrderBy dispatch={props.dispatch} resetPage={props.resetPage}/>
            </div>
    )
}


export default Filters;