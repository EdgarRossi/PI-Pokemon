import {
  GET_ALL_POKEMONS,
  GET_POKEMON_BY_ID,
  FILTER_CREATED_ORIGINAL,
  ORDER_BY_ATTACK,
  ORDER_BY_ALPHABETICAL,
  FILTER_BY_TYPES,
  GET_TYPES,
  GET_POKEMON_BY_NAME,
} from "../actions/actions";

let initialState = {
  pokemones: [],
  pokemonId: [],
  backap: [],
  types: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemones: action.payload, //{...},{...},{...}
        backap: action.payload,
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonId: action.payload,
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemones: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case "POST_POKEMONS":
      return {
        ...state,
      };

    case FILTER_CREATED_ORIGINAL:
      const allPokemons = state.backap;
      if (action.payload === "created") {
        var createdFilter = allPokemons.filter((e) => e.createInDb);
      } else if (action.payload === "api") {
        var createdFilter = allPokemons.filter((e) => !e.createInDb);
      } else {
        var createdFilter = allPokemons;
      }
      return {
        ...state,
        pokemones: createdFilter,
      };

    case ORDER_BY_ATTACK:
      const attack =
        action.payload === "MIN"
          ? state.pokemones.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemones.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemones: attack,
      };

    case ORDER_BY_ALPHABETICAL:
      const alphabetic =
        action.payload === "asc"
          ? state.pokemones.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemones.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemones: alphabetic,
      };

    case FILTER_BY_TYPES:
      const allPokemons2 = state.backap;

      const aux = [];
      if (action.payload === "all") {
        return {
          ...state,
          pokemones: state.backap,
        };
      } else {
        for (let i = 0; i < allPokemons2.length; i++) {
          let poke45 = allPokemons2[i].types.includes(action.payload);
          if (poke45) {
            aux.push(allPokemons2[i]);
          }
        }
        // const aux = allPokemons2.filter((e) => {
        //   e.types.includes(action.payload);
        // });
      }
      return {
        ...state,
        pokemones: aux,
      };

    default:
      return { ...state };
  }
}
