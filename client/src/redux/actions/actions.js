import axios from "axios";
export const GET_ALL_POKEMONS = "OBTENER TODOS LOS POKEMONES";
export const URL_ALL_POKEMONS = "http://localhost:3001/pokemons";
export const GET_POKEMON_BY_ID = "OBTENER TODOS LOS POKEMONES POR ID";
export const GET_POKEMON_BY_NAME = "OBTENER POKEMONS POR NAME";
export const GET_TYPES = "OBTENER POKEMONS POR TYPES";
// export const URL_POKEMONS_BY_ID = "http://localhost:3001/pokemons/id";
export const FILTER_CREATED_ORIGINAL = "FILTRAR CREADOS Y ORIGINALES";
export const ORDER_BY_ATTACK = "FILTRO DE ATAQUE";
export const ORDER_BY_ALPHABETICAL = "FILTRO POR ASC Y DESC";
export const FILTER_BY_TYPES = "FILTRO POR TYPES";

export function getAllPokemons() {
  return async function (dispatch) {
    const r = await fetch(URL_ALL_POKEMONS);
    const rJson = await r.json();
    return dispatch({
      type: GET_ALL_POKEMONS,
      payload: rJson,
    });
  };
}

export function getPokemonById(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then((r) => r.json())
      .then((rJson) =>
        dispatch({
          type: GET_POKEMON_BY_ID,
          payload: rJson,
        })
      );
  };
}

export function getPokemonByName(name) {
  return function (dispatch) {
    try {
      return fetch("http://localhost:3001/pokemons?name=" + name)
        .then((r) => r.json())
        .then((rJson) =>
          dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: rJson,
          })
        );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPokemonByType() {
  return function (dispatch) {
    return fetch("http://localhost:3001/types")
      .then((r) => r.json())
      .then((rJson) =>
        dispatch({
          type: GET_TYPES,
          payload: rJson,
        })
      );
  };
}

export function postPokemons(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/pokemons/create", payload);
    console.log(response);
    return response;
  };
}

export function filterCreated(payload) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_CREATED_ORIGINAL,
      payload,
    });
  };
}

export function orderAttack(payload) {
  return function (dispatch) {
    return dispatch({
      type: ORDER_BY_ATTACK,
      payload,
    });
  };
}

export function orderAlphabetical(payload) {
  return function (dispatch) {
    return dispatch({
      type: ORDER_BY_ALPHABETICAL,
      payload,
    });
  };
}

export function filterByTypes(payload) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_BY_TYPES,
      payload,
    });
  };
}
