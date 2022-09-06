const { Router } = require('express');
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const { Dog, Temperament, conn } = require('../db.js');
const { arrayTemperamentos } = require("./temperamentos.js");
const { arrayPerros } = require("./perros.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



// ------------- GETS --------------------

router.get('/dogs', async (req, res) => {
    const perros = await arrayPerros;

    if(req.query.hasOwnProperty("name")) {
            let nombre = req.query;
            let dogs = perros.filter(dog => dog.name === nombre.name)
            return res.json(dogs)

    }else{
        let dogsFiltered = [];
        for (let i = 0; i < perros.length; i++) {
            dogsFiltered.push({
                image: perros[i].image,
                name: perros[i].name,
                temperament: perros[i].temperament,
                weight: perros[i].weight
            })
        }
          return res.json(dogsFiltered);
    }
});

router.get("/dogs/:idRaza", async (req, res) => {
    let id = req.params; // {idRaza: ""}

    const perros = await arrayPerros;

    let filteredDogs = perros.filter(d => d.id == id.idRaza)
    let filteredDogs2 = {
        image: filteredDogs[0].image,
        name: filteredDogs[0].name,
        temperament: filteredDogs[0].temperament,
        weight: filteredDogs[0].weight,
        height: filteredDogs[0].height,
        life_span: filteredDogs[0].life_span,
    }
    res.json(filteredDogs2);
})

router.get("/temperaments", async (req, res) => {
    const temperamentos = await arrayTemperamentos;
    Temperament.sync({alter:true}).then(async d => {
        const xd = temperamentos.forEach(async t => await Temperament.findOrCreate({
            where: {name : t},
            defaults: {name : t}
            })
            )
        return xd;
    })
    .catch(e => console.log(e));
    res.json("hola");
})

// ---------------- POSTS ----------------------
router.post("/dogs", async (req, res) => {
    let {name, height, weight, life_span, temperament} = req.body;
    Dog.sync({alter: true}).then(async p => await Dog.create({
        name,
        height,
        weight,
        life_span,
        temperament
    }));
    return res.json(height); 
})

module.exports = router;
