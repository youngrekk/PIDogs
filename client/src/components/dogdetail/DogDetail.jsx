import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDog } from "../../redux/actions";
import styles from "../dogdetail/DogDetail.module.css";

export function DogDetail() {  

    const dispatch = useDispatch();

    const id = useParams();
    const allDogs = useSelector((state) => state.allDogs)
    const details = useSelector((state) => state.dog)

    return (
        (details.hasOwnProperty("name") && <div className={styles["container-detail"]}>
            <div className={styles["border-detail"]}>
                <div className={styles["detail-card"]}>
                    <div className={styles["img-detail-card"]}>
                        <img src={details.image.url} className={styles["img-dog"]}></img>
                    </div>
                    <div className={styles["details-detail-card"]}>
                        <h2>{details.name}</h2>
                        <h4>Temperaments</h4>
                        <p>{details.temperament}</p>
                        <h4>Weight</h4>
                        <p>{details.weight.imperial} KG</p>
                        <h4>Height</h4>
                        <p>{details.height.imperial} M</p>
                        <h4>Life Span</h4>
                        <p>{details.life_span}</p>
                    </div>

                </div>
            </div>

        </div>)

    )
}