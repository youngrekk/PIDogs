const axios = require("axios");




const arrayTemperamentos = axios.get('https://api.thedogapi.com/v1/breeds')
            .then(function (p){
            let dogs = p.data.filter(dog => dog.id < 30);
            return dogs;
            })
            .then(perros => {
                let temperamentos = [];
                for (let i = 0; i < perros.length; i++) {
                    let perro = perros[i];
                    let perrolol = perro.temperament.split(", ");
                    perrolol.forEach(element => {
                        temperamentos.push(element);
                    });
                }
                let temperamentosFiltrados = temperamentos.filter(function(ele , pos){
                    return temperamentos.indexOf(ele) == pos;
                }) 
                return temperamentosFiltrados;
});



// function temperamentsHandler () {
//     var temperamentos2 = [];
//     axios.get('https://api.thedogapi.com/v1/breeds')
//         .then(p => {
//             let dogs = p.data.filter(dog => dog.id < 101);
//             for (let i = 0; i < dogs.length; i++) {
//                 let dog = dogs[i];
//                 let temperamentosDog = dog.temperament.split(", ");
//                 for (let j = 0; j < temperamentosDog.length; i++) {
//                     temperamentos2.push(temperamentosDog[j])
//                 }
//             }
//             return "hola";
//         });
//     const filteredArray = temperamentos2.filter(function(ele,pos) {
//         return temperamentos2.indexOf(ele) == pos;
//     })

//     return temperamentos = filteredArray;
// };

// temperamentsHandler();



module.exports = {arrayTemperamentos}