import React from "react";
import style from "../home/Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions/actions";
import PokemonsCards from "../cards/PokemonsCards";
import Paginado from "../paginado/Paginado";
import Filters from "../filtros/Filters";

export default function Home() {
  const dispatch = useDispatch();
  const { pokemones } = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokePerPage; //12
  const indexOfFirstPokemon = indexOfLastPokemon - pokePerPage; //0
  const currentPokemons = pokemones.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div>
      <div className={style.cont}>
        <Filters />

        <Paginado pokePerPage={pokePerPage} allPokemons={pokemones.length} paginado={paginado} />
      </div>
      <div>
        <PokemonsCards pokemons={currentPokemons} />
      </div>
    </div>
  );
}
