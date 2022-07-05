import React from "react";
import style from "../serchbar/SerchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions/actions";

function SerchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonByName(name));
  }

  return (
    <div className={style.cont}>
      <input className={style.input} type="text" placeholder="Buscar..." onChange={(e) => handleInputChange(e)} />
      <button className={style.btn} type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}

export default SerchBar;
