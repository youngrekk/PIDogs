import React from "react";


const Pagination = ({dogsPerPage, totalDogs, paginar}) => {
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
        <ul>
            {pageNumbers.map(number => {
                <li key={number}>
                    <a onClick={paginar(number)} className="page-link">
                        {number}
                    </a>
                </li>
            })}            
        </ul>            
        </div>

    )
}

export default Pagination;