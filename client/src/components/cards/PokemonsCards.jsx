import PokemonCard from "../card/PokemonCard";
import React from "react";
import style from "../cards/PokemonsCards.module.css";

export default function PokemonsCards({ pokemons }) {
  return (
    <div className={style.cardsCont}>
      {pokemons.length > 0 ? (
        pokemons.map((e) => {
          return (
            <div key={e.id} className="cont">
              <PokemonCard id={e.id} name={e.name} types={e.types} image={e.image} />
            </div>
          );
        })
      ) : (
        <h2>No hay pokemons para mostrar!</h2>
      )}
    </div>
  );
}
