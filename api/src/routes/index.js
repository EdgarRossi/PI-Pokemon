const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Pokemon, Type } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
    const pokeUrl = apiUrl.data.results;
    const pokeMap = pokeUrl.map((p) => axios.get(p.url));
    const pokeAll = await axios.all(pokeMap);
    const pokeAllMap = pokeAll.map((p) => p.data);
    var obj = {};
    const final = pokeAllMap.map((p) => {
      var stats = p.stats
        .map((e) => {
          return {
            [e.stat.name]: e.base_stat,
          };
        })
        .filter((e) => !e.hasOwnProperty("special-attack") && !e.hasOwnProperty("special-defense"));
      for (let i = 0; i < stats.length; i++) {
        for (const props in stats[i]) {
          obj[props] = stats[i][props];
        }
      }
      return {
        id: p.id,
        name: p.name,
        types: p.types.map((e) => e.type.name),
        image: p.sprites.versions["generation-v"]["black-white"].animated.front_default,
        hp: obj.hp,
        attack: obj.attack,
        defense: obj.defense,
        speed: obj.speed,
        height: p.height,
        weight: p.weight,
      };
    });
    console.log(final);
    return final;
  } catch (error) {
    console.log(error);
  }
};

const getDbInfo = async () => {
  // return await Pokemon.findAll({
  //   //esto hace que me traigas todos los pokemones
  //   include: {
  //     //y que me incluyas este modelo Tipo
  //     model: Type,
  //     attributes: ["name"], //y de este modelo Type traeme este atibuto
  //     through: {
  //       //mediante los atributos, es una comprobacion.
  //       attributes: [],
  //     },
  //   },
  // });
  let puchimones = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  let pokepeso = puchimones.map((e) => {
    return {
      id: e.id,
      name: e.name,
      hp: e.hp,
      attack: e.attack,
      defense: e.defense,
      speed: e.speed,
      weight: e.weight,
      height: e.height,
      image: e.image,
      createInDb: e.createInDb,
      types: e.types.map((r) => r.name),
    };
  });
  return pokepeso;
};

const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  // console.log(infoTotal)
  return infoTotal;
};

router.get("/pokemons", async (req, res) => {
  const name = req.query.name;

  let pokemonesTotal = await getAllPokemons();
  if (name) {
    let pokemonName = await pokemonesTotal.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
    pokemonName.length //pregunto si encontr algo aca
      ? res.status(200).send(pokemonName)
      : res.status(400).send("No existe el Pokemon, lo siento!!");
  } else {
    res.status(200).send(pokemonesTotal);
  }
});

router.get("/types", async (req, res) => {
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
  const types = typesApi.data.results.map((e) => e.name);

  types.forEach((el) => {
    Type.findOrCreate({
      where: { name: el },
    });
  });

  const allType = await Type.findAll();
  res.send(allType);
});

//esto es lo que le llega por body
router.post("/pokemons/create", async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;

  //esto es lo que crea al personaje
  const pokemonCreated = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
    //no paso type porque tengo que hacer la relacion aparte
  });

  //esto me lo traigo del modelo de Tipo
  const tipoDb = await Type.findAll({
    where: { name: types },
  });
  pokemonCreated.addType(tipoDb);
  res.send("Pokemon creado con exito!!");
});

router.get("/pokemons/:id", async (req, res) => {
  const id = req.params.id;
  // const {id} = req.params;
  const pokeTodos = await getAllPokemons();

  if (id) {
    let pokeFiltrado = await pokeTodos.filter((e) => e.id == id);
    pokeFiltrado.length ? res.status(200).json(pokeFiltrado) : res.status(404).send("No se encontró tu personaje");
  }
});

module.exports = router;
