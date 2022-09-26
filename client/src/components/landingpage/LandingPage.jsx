
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getTemperaments, setAllDogsinDogs } from "../../redux/actions/index";
import styles from "../landingpage/LandingPage.module.css"





function LandingPage() {
    const dispatch = useDispatch();

  
    useEffect(() => {
      dispatch(getAllDogs());
      dispatch(getTemperaments());
    }, [dispatch]);
  
    
    const allDogs = useSelector((state) => state.allDogs)
  
    return (
        <div className={styles["gral"]}>
            <div className={styles["container-landing"]}>
                <h1 className={styles["h1-landing"]}>Dogs!</h1>
                <p className={styles["p-landing"]}>
                    Hello, click
                    <Link to="/home" className={styles["link"]}>
                        {" here "}
                    </Link>
                    to see the list of dogs.
                </p>
            </div>

        </div>
    );
};

export default LandingPage;

// export const mapStateToProps = (state) => ({
//     allDogs: state.allDogs,
//     temperaments: state.temperaments
// });
  
// export const mapDispatchToProps = {
//     getAllDogs,
//     getTemperaments
// }

// export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);