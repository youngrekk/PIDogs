import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, postDog } from "../../redux/actions";
import styles from "../createdog/CreateDog.module.css"

let formInputs = {
    name: "",
    height: {
        min: 0,
        max: 1
    },    
    weight: {
        min: 0,
        max: 1
    },
    life_span: "",
    temperament: [],
};




export default function Form () {

    performance.getEntriesByType("navigation")[0].type === "reload" &&
    window.location.replace("/error404");

    const [name, setName] = useState("");
    const [life_span, setlife_span] = useState();
    const [height, setHeight] = useState({min: "", max: ""});
    const [weight, setWeight] = useState({min: "", max: ""});
    const [isActiveT, setIsActiveT] = useState([]);
    const [errors, setErrors] = useState({});

    const temperaments = useSelector((state) => state.temperaments);

    const dispatch = useDispatch();

    function validate(input) {
        let error = "";
        if ( input.name === "name" && input.value === "") {
            error = setErrors({...errors, name: "Complete this field"})
        } else if (input.name === "name" && !(/^([^0-9]*)$/).test(input.value) || !(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g).test(input.value)) {
            error = setErrors({...errors, name: "Can't contain numbers o special characters"})
        } else if (input.name === "name") error = setErrors({...errors, name: null})
    
        if (input.name === "min-height" && parseInt(input.min) > parseInt(input.max)) {
            error = setErrors({...errors, minHeight: "El minimo no puede ser mayor al maximo"});
        } else if (input.name === "max-height" && parseInt(input.max) < parseInt(input.min)) {
            error = setErrors({...errors, maxHeight: "El maximo no puede ser menor al minimo"})
        } else if (input.name === "max-height" || input.name === "min-height") error = setErrors({...errors, maxHeight: null, minHeight: null})
    
        if (input.name === "min-weight" && parseInt(input.min) > parseInt(input.max)) {
            error= setErrors({...errors, minWeight: "El minimo no puede ser mayor al maximo"})
        } else if (input.name === "max-weight" && parseInt(input.max) < parseInt(input.min)) {
            error = setErrors({...errors, maxWeight: "El maximo no puede ser menor al minimo"})
        } else if (input.name === "max-weight" || input.name === "min-weight") error = setErrors({...errors, maxWeight: null, minWeight: null})


        return error;
    };


    const handleInputChange = function(e) {


        if (e.target.name === "name") {
            formInputs.name = e.target.value;
            setName(e.target.value)
            validate({name: e.target.name, value: e.target.value});
        }
        else if (e.target.name === "life-span") {
            formInputs.life_span = e.target.value;
            setlife_span(e.target.value);
            
        } else if (e.target.name === "min-height") {
            formInputs.height.min = e.target.value;
            setHeight({...height, min : e.target.value});
            validate({...height, min : e.target.value, name: "min-height"});

            // setErrors(validate({...height ,minHeight: e.target.value}));
        } else if (e.target.name === "max-height") {
            formInputs.height.max = e.target.value;
            setHeight({...height, max : e.target.value})
            validate({...height, max: e.target.value, name: "max-height"})

            // setErrors(validate({...height ,maxHeight: e.target.value}));
        } else if (e.target.name === "min-weight") {
            formInputs.weight.min = e.target.value;
            setWeight({...weight, min : e.target.value})
            validate({...weight, min: e.target.value, name: "min-weight"})
        } else if (e.target.name === "max-weight") {
            formInputs.weight.max = e.target.value;
            setWeight({...weight, max : e.target.value})
            validate({...weight, max: e.target.value, name: "max-weight"})
        }
    };

    function onClickTemperaments(t) {
        if (formInputs.temperament.includes(t) === true) {
            let indice = formInputs.temperament.indexOf(t); 
            formInputs.temperament.splice(indice, 1);
            setIsActiveT({...isActiveT, [t]: null})
        } else {
            formInputs.temperament.push(t);
            setIsActiveT({...isActiveT, [t]: t})
        }
        
        // console.log(isActiveT)
        // console.log(formInputs.temperament)

    }

    function handleSubmit(e) {
        e.preventDefault();
        let temperaments = formInputs.temperament.join(", ");
        formInputs.temperament = temperaments;

        let altura = `${formInputs.height.min} - ${formInputs.height.max}`
        formInputs.height = altura;

        let peso = `${formInputs.weight.min} - ${formInputs.weight.max}`
        formInputs.weight = peso;

        function capitalizeFirstLetter(str) {
            const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

            return capitalized;
        }

        formInputs.name = capitalizeFirstLetter(formInputs.name);

        function resetForm() {
            document.getElementById("formCreate").reset();
            formInputs = {
                name: "",
                height: {
                    min: 0,
                    max: 1
                },    
                weight: {
                    min: 0,
                    max: 1
                },
                life_span: 0,
                temperament: [],
            };
        }
        
        function xd() {
            alert("done");
            dispatch(postDog(formInputs));
            resetForm();
        }
        

        // resetForm();
        xd();

    }



    return (
        <div className={styles["form-container"]}>
            <div className={styles["form-border"]}>
                <form id="formCreate"className={styles["formCreate"]} onSubmit={handleSubmit}>
                    <header>
                        <h2 className={styles["h2-create"]}>Create your dog race!</h2>
                    </header>
                    <div className={styles["name-life_span-container"]}>
                        <div className={styles["name-container"]} htmlFor="name">
                            <label htmlFor="name">Name:</label>
                            <br/>
                            <input 
                                type="text" name="name" value={name} onChange={ev => handleInputChange(ev)}
                            />
                            {errors.name && (<p className={styles["danger"]}>{errors.name}</p>)}                            
                        </div>
                        <div className={styles["life_span-container"]}>
                            <label>Life Span (range)</label>
                            <br/>
                            <input type="number" name="life-span" className={styles["life_span-inputs"]} value={life_span} onChange={ev => handleInputChange(ev)} />                               
                        </div>
                                        
                    </div>

                    <br/>

                    <div className={styles["height-weight-container"]}>
                        
                        <div className={styles["height-container"]}>
                            <label>Height(m):</label>
                            <div className={styles["min-height-weight"]}>
                                <label className={styles["min-max-label"]}>Min:</label>
                                <input type="number" name="min-height" value={height.min} onChange={ev => handleInputChange(ev)}></input>
                                {errors.minHeight && (<p className={styles["danger"]}>{errors.minHeight}</p>)}
                            </div>
                            <div className={styles["max-height"]}>
                                <label className={styles["min-max-label"]} >Max:</label>
                                <input type="number" name="max-height" value={height.max} onChange={ev => handleInputChange(ev)}></input>
                                {errors.maxHeight && (<p className={styles["danger"]}>{errors.maxHeight}</p>)}
                            </div>         
                        </div>
                        
                        <div className={styles["weight-container"]}>
                            <label>Weight(kg):</label>
                            <div className={styles["min-height-weight"]}>
                                <label className={styles["min-max-label"]}>Min:</label>
                                <input type="number" name="min-weight" value={weight.min} onChange={ev => handleInputChange(ev)}></input>
                                {errors.minWeight && (<p className={styles["danger"]}>{errors.minWeight}</p>)}
                            </div>
                            <div className={styles["max-height-weight"]}>
                                <label className={styles["min-max-label"]} >Max:</label>
                                <input type="number" name="max-weight" value={weight.max} onChange={ev => handleInputChange(ev)}></input>
                                {errors.maxWeight && (<p className={styles["danger"]}>{errors.maxWeight}</p>)}
                            </div>
                            {}
                        </div>
                    
                    </div>
                    <br/>
                    <label>Temperaments:</label>
                    <div id="temperaments-buttons" className={styles["temperaments-buttons"]}>
                        {temperaments.map((t, index) => {
                            return (
                                <React.Fragment key={index}>
                                {/* <input
                                    onChange={console.log(t)}
                                    type="checkbox"
                                    className={styles["checkbox"]}
                                    value={t}
                                    name="temperaments"
                                    id={`${t}-${index}`}
                                />
                                <label
                                    htmlFor={`${t}-${index}`}
                                    className={styles["btn-types"]}
                                >
                                    {t}
                                </label> */}
                                <button 
                                    type="button"
                                    key={index}
                                    className={Object.values(isActiveT).includes(t) === true ? styles["temperaments-item-selected"] : styles["temperaments-item"]} 
                                    onClick={(t) => {onClickTemperaments(t.target.innerText)}}>
                                {t}
                                </button>
                                </React.Fragment>
                            );
                            })}
                    </div>

                    <input type="submit" value="Create" className={styles["submit-button"]}></input>
                </form>                
            </div>

        </div>
    )
};