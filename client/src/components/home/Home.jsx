import React, { useEffect , useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getTemperaments } from "../../redux/actions/index";
import styles from "../home/Home.module.css";

import Search from "./search/Search.jsx"
import Filters from "./filters/Filters.jsx"
import Cards from "../cards/Cards.jsx";
import Pagination from "../pagination/Pagination.jsx";




export default function Home() {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    // const paginar = (pageNumber) => setCurrentPage(pageNumber);

    const dogs = useSelector((state) => state.dogs);
    const allDogs = useSelector((state) => state.allDogs);
    const temperaments = useSelector((state) => state.temperaments)

    const dispatch = useDispatch();

    const currentDogs = (dogs.length > 0 ? dogs : allDogs).slice(indexOfFirstDog, indexOfLastDog)


    // PAGINATION //

    let pages = [];
    let lastPage = "";

    let aux = Math.ceil((dogs.length > 0 ? dogs : allDogs).length / dogsPerPage)

    for (let i = 1; i <= aux; i++) {
        pages.push(i);
        lastPage = aux;
    }

    useEffect(() => {
        for (let i = 1; i <= aux; i++) {
            pages.push(i);
            lastPage = aux;
        }
    }, [])


    const onPageChange = (currentPage) => setCurrentPage(currentPage);

    const onNext = () => {
        onPageChange(currentPage + 1);
    };
    
    const onPrevious = () => {
        
        onPageChange(currentPage - 1);
    };

    const resetPage = () => {
        onPageChange(currentPage / currentPage)
    }

    // FILTERS


    return (
        <div>
            <div><Search resetPage={resetPage}/></div>


            <div className={styles["container"]}>
                <Filters temperamentos={temperaments} dispatch={dispatch} resetPage={resetPage}/>

                <div className={styles["container-cards"]}>
                    {dogs === "noData" ? <h2>You need to create a dog first!</h2> :
                    dogs === "noName" ? <h2>No dogs found with that name</h2> :
                    currentDogs.map(dog => <Cards key={dog.id} img={dog.image.url} name={dog.name} temperaments={dog.temperament} weight={dog.weight.imperial} id={dog.id}/>)}
                </div>
                <div className={styles['pagination']}>
                    <ul className={styles["pagination-container"]}>
                        <li className={currentPage === 1 ? styles["pagination-item-disabled"] : styles["pagination-item"]}
                            onClick={onPrevious}
                        >
                            {"<"}
                        </li>

                        {pages.map((page, index) => {
                            return (
                                <li
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={page == currentPage ? styles["pagination-item-selected"] : styles["pagination-item"]}>
                                {page}
                                </li>
                            );
                        })}

                        <li className={currentPage == lastPage ? styles["pagination-item-disabled"] : styles["pagination-item"]}
                            onClick={onNext}
                        >
                            {">"}
                        </li>                        
                    </ul>

                </div>
            </div>
        </div>
    )

}