import React from "react";
import { Link } from "react-router-dom";
import style from "../card/PokemonCard.module.css";

export default function PokemonCard({ id, name, types, image }) {
  //nombre,img,type
  return (
    <Link to={`/pokemons/${id}`} className={style.title}>
      <div className={style.card}>
        <div className={style.cardInfo}>
          <div className={style.cardImg}>
            <img className={style.img} src={image} />
          </div>
          <div className={style.date}>
            <h2 className={style.title}> {name} </h2>
            <h4 className={style.title}>
            <h4 className={style.title}>
              {" "}
              {typeof types[0] === "string" ? types + " " : types.map((e) => e.name) + " "}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
}
