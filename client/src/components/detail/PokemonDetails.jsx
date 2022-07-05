import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions/actions";
import { useEffect } from "react";
import style from "../detail/PokemonDetails.module.css";

function PokemonDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonById(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.pokemonId);
  console.log(myPokemon);

  return (
    <div className={style.contPrincipal}>
      <div className={style.btnDetail}>
        <Link to="/home">
          <button className={style.btn}>BACK</button>
        </Link>
        {myPokemon.length > 0 ? (
          <div className={style.cardDetail}>
            <div>
              <h4>{myPokemon[0].id}</h4>
            </div>
            <div>
              <img className={style.img} src={myPokemon[0].img ? myPokemon[0].img : myPokemon[0].image} />
            </div>
            <div>
              <h1>{myPokemon[0].name}</h1>
              <h3 className={style.types}>
                {myPokemon[0].createInDb ? myPokemon[0].types.map((e) => e.name) : myPokemon[0].types.map((e) => e)}
              </h3>
            </div>
            <div>
              <h3 className={style.types}>hp: {myPokemon[0]?.hp}</h3>
              <h3 className={style.types}>attack: {myPokemon[0]?.attack}</h3>
              <h3 className={style.types}>defense: {myPokemon[0]?.defense}</h3>
              <h3 className={style.types}>speed: {myPokemon[0]?.speed}</h3>
              <h3 className={style.types}>height: {myPokemon[0].height}</h3>
              <h3 className={style.types}>weight: {myPokemon[0].weight}</h3>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default PokemonDetails;
