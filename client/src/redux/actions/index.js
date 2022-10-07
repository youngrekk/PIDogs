
import axios from "axios";

import { REACT_API_URL } from "./config.js"

export const getAllDogs = () => {

  return async (dispatch) => {
    try {
      console.log(process.env)
      const allDogs = await axios.get(`${REACT_API_URL}/dogs`)
      dispatch({type: "GET_ALL_DOGS", payload: allDogs.data})
    } catch (error) {
      console.error("Error in GET ALL DOGS", error.message)
    }
  }
};

export const setAllDogsinDogs = () => {
  return async (dispatch) => {
    try {
      const allDogsinDogs = await axios.get("http://localhost:3001/dogs")
      dispatch({type: "SET_DOGS", payload: allDogsinDogs.data})
    } catch (error) {
      console.error("Error in SET ALL DOGS IN DOGS", error.message)
    }
  }
}

export const getDogByName = (name) => {
  return async (dispatch) => {
    try {
      const dogName = await axios.get(`http://localhost:3001/dogs?name=${name}`)
      dispatch({type: "GET_DOG_BY_NAME", payload: dogName.data})
    } catch (error) {
      console.error("Error in GET DOG BY NAME", error.message)
    }
  }
}

export const getDog = (id) => {
  return async (dispatch) => {
    try {
      const dogById = await axios.get(`http://localhost:3001/dogs/${id}`)
      dispatch({type: "GET_DOG", payload: dogById.data})
    } catch (error) {
      console.error("Error in GET DOG", error.message)
    }
  // return await axios.get(`http://localhost:3001/dogs/${id}`)
  // .then (r => r.json())
  // .then (d => dispatch({type: "GET_DOG", payload: d.data}))
  // .catch (e => console.log(e));
  }
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const dogTemperaments = await axios.get(`http://localhost:3001/temperaments`);
      dispatch({type: "GET_TEMPERAMENTS", payload: dogTemperaments.data})
    } catch (error) {
      console.error("Error in GET TEMPERAMENTS", error.message);
    }
  }
  // return async (dispatch) => await axios.get(`${process.env.REACT_API_URL}/temperaments`)
  // .then(r => r.json())
  // .then(d => dispatch({type: "GET_TEMPERAMENTS", payload: d.data}))
  // .catch(e => console.log(e))
}

export const postDog = (formData) => {
  return async (dispatch) => {
    try {
      const dogCreated = await axios.post(`http://localhost:3001/dogs`, formData);
      dispatch({type: "POST_DOG", payload: dogCreated});
    } catch (error) {
      console.error("Error in POST DOG", error.message);
    }
  }
};

export const resetFilters = () => {
  return {
    type: "RESET_FILTERS",
  };
};

export const filterByTemperament = (temperament) => {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload: temperament
  };
};

export const orderBy = (order) => {
  return {
    type: "ORDER_BY",
    payload: order
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: "FILTER_BY_ORIGIN",
    payload: origin,
  };
};

export const addTemperament = (temperament) => {
  return {
    type: "ADD_TEMPERAMENT",
    payload: temperament
  }
}