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
    const perrosDb = await Dog.findAll();
    let dogsFiltered = [];


    for (let i = 0; i < perros.length; i++) {
        let maxWeightt = perros[i].weight.imperial.split(" ")[2]
        dogsFiltered.push({
            id: perros[i].id,
            name: perros[i].name,
            temperament: perros[i].temperament,
            maxWeight: maxWeightt,
            weight: perros[i].weight,
            image: perros[i].image
        })
    }

    for (let i = 0; i < perrosDb.length; i++) {
        let maxWeightt = perrosDb[i].weight.split(" ")[2]
        dogsFiltered.push({
            id: `${perrosDb[i].dbId}db`,
            name: perrosDb[i].name,
            temperament: perrosDb[i].temperament,
            maxWeight: maxWeightt,
            height: {
                imperial: perrosDb[i].height
            },
            weight: {
                imperial: perrosDb[i].weight
            },
            image: {
                url: "https://img1.freepng.es/20180401/zww/kisspng-shiba-inu-dogecoin-clip-art-doge-5ac19a4e7ef1f4.89995344152263739052.jpg"
            }
        });
    }


    if(req.query.hasOwnProperty("name")) {
            let nombre = req.query;
            let dogsByName = dogsFiltered.filter(dog => dog.name === nombre.name)
            return res.json(dogsByName)
    }else return res.json(dogsFiltered);
});

router.get("/dogs/:idRaza", async (req, res) => {
    let id = req.params; // {idRaza: ""}
    let dbOrNot = req.query;
    const perros = await arrayPerros;
    const perrosDb = await Dog.findAll();

    if(dbOrNot.db == "y") {
        let filteredDogs = perrosDb.filter(d => d.dbId == id.idRaza);
        let filteredDogs2 = {
            image: filteredDogs[0].image,
            name: filteredDogs[0].name,
            temperament: filteredDogs[0].temperament,
            weight: filteredDogs[0].weight,
            height: filteredDogs[0].height,
            life_span: filteredDogs[0].life_span,
        }
        return res.json(filteredDogs2);
    }else{
        let filteredDogs = perros.filter(d => d.id == id.idRaza)
        let filteredDogs2 = {
            image: filteredDogs[0].image,
            name: filteredDogs[0].name,
            temperament: filteredDogs[0].temperament,
            weight: filteredDogs[0].weight,
            height: filteredDogs[0].height,
            life_span: filteredDogs[0].life_span,
        }
        return res.json(filteredDogs2);
    }

})

router.get("/temperaments", async (req, res) => {
    const temperamentos = await arrayTemperamentos;
    Temperament.sync({alter:true}).then(async d => {
        const xd = temperamentos.forEach(async t => await Temperament.findOrCreate({
            where: {name : t},
            defaults: {name : t}
            })
            )
        return res.json(temperamentos);
    })
    .catch(e => console.log(e));
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
