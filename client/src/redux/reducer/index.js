

const initialState = {
    // Tus estados acá 
    dogs: [],
    allDogs: [],
    dog: {},
    temperaments: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_DOGS": 
            return {
                ...state,
                allDogs: action.payload
            };

        case "GET_DOG_BY_NAME": 
            let noName = action.payload;
            if (action.payload.length < 1) noName = "noName"
            
            return {
                ...state,
                dogs: noName
            }

        case "SET_DOGS" :
            return {
                ...state,
                dogs: action.payload
            }

        case "GET_DOG" :
            return {
                ...state,
                dog: action.payload
            };
        
        case "GET_TEMPERAMENTS" :
            return {
                ...state,
                temperaments: action.payload
            }

        case "POST_DOG":
            return {
                ...state
                
            };
        
        case "FILTER_BY_TEMPERAMENT":
            let filtro = state.allDogs.filter(d => d.temperament.includes(action.payload) == true)
            

            return {
                ...state,
                dogs: filtro,
            };

        case "RESET_FILTERS": 
            
            return {
                ...state, 
                dogs: []
            };

        case "FILTER_BY_ORIGIN" :

            let filterOrigin = "";
            if (action.payload === "Existent") {
               let existent = state.allDogs.filter(d => typeof d.id === "number")
               filterOrigin = existent;
            } else if (action.payload === "Own") {
                let own = state.allDogs.filter(d => typeof d.id === "string")
                if (own.length > 0) filterOrigin = own;
                else filterOrigin = "noData"
            }
            return {
                ...state,
                dogs: filterOrigin
            };
        
        case "ORDER_BY": 
            let filterOrderBy = [...state.allDogs];

            if (action.payload === "A-Z") {
                filterOrderBy = filterOrderBy.sort((a, b) =>
                a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            } else if (action.payload === "Z-A") {
                filterOrderBy = filterOrderBy.sort((a, b) =>
                a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
                console.log(filterOrderBy);
            } else if (action.payload === "Highest Max Weight") {
                filterOrderBy = filterOrderBy.sort((a, b) =>
                a.maxWeight - b.maxWeight 
                ).reverse()
            } else if (action.payload === "Lower Max Weight") {
                filterOrderBy = filterOrderBy.sort((a, b) =>
                a.maxWeight - b.maxWeight
                )
            }

            return {
                ...state,
                dogs: filterOrderBy
            }
        
        default :
        return {...state};
    };
};

export default rootReducer;