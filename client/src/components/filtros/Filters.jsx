import React from "react";
import style from "../filtros/Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  filterCreated,
  orderAttack,
  getAllPokemons,
  orderAlphabetical,
  filterByTypes,
  getPokemonByType,
} from "../../redux/actions/actions";

function Filters() {
  const dispatch = useDispatch();

  const { types } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPokemonByType());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState(" ");

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterAttack(e) {
    e.preventDefault();
    dispatch(orderAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    console.log(e.target.value);
  }

  function handleFilterAlphabetic(e) {
    e.preventDefault();
    dispatch(orderAlphabetical(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
    console.log(e.target.value);
  }

  function handleFilterTypes(e) {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value));
    console.log(e.target.value);
  }

  return (
    <div className={style.cont}>
      <select className={style.select} onChange={(e) => handleFilterAlphabetic(e)}>
        <option className={style.interior} disabled selected defaultValue>
          Ordered by Alphabet
        </option>
        <option className={style.interior} value="asc">
          A-Z
        </option>
        <option className={style.interior} value="desc">
          Z-A
        </option>
      </select>
      <select className={style.select} onChange={(e) => handleFilterAttack(e)}>
        <option className={style.interior} disabled selected defaultValue>
          Ordered by Attack
        </option>
        <option className={style.interior} value="MAX">
          Max Attack
        </option>
        <option className={style.interior} value="MIN">
          Min Attack
        </option>
      </select>
      <select className={style.select} onChange={(e) => handleFilterCreated(e)}>
        <option className={style.interior} value="All">
          All Pokemons
        </option>
        <option className={style.interior} value="api">
          Originals
        </option>
        <option className={style.interior} value="created">
          Created
        </option>
      </select>
      <select className={style.select} onChange={(e) => handleFilterTypes(e)}>
        <option className={style.interior} value="all">
          All Types
        </option>
        {types?.map((e) => {
          return (
            <option className={style.interior} value={e.name} key={e.id}>
              {e.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Filters;
