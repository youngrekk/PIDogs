const axios = require("axios");

const arrayPerros = axios.get('https://api.thedogapi.com/v1/breeds')
                    .then(p => {
                        let dogs = p.data.filter(dog => dog.id < 101)
                        return dogs;
})


module.exports = {arrayPerros};