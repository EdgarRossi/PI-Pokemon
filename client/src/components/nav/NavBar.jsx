import React from "react";
import SerchBar from "../serchbar/SerchBar";
import style from "../nav/NavBar.module.css";
import { Link } from "react-router-dom";
import { getAllPokemons } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function NavBar() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllPokemons());
  }
  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className={style.cont}>
      <SerchBar />
      <Link className={style.link} to="/pokemons/create/create">
        Crear Pokemon
      </Link>
      <button
        className={style.btn}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <span>Reset-PokeApi</span>
        <i></i>
      </button>
    </div>
  );
}

export default NavBar;
