import React from "react";
import style from "../paginado/Paginado.module.css";

export default function Paginado({ pokePerPage, allPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.cont}>
      <nav>
        <ul className={style.paginado}>
          {/* <div>
          <button o>
            Prev
          </button>
        </div> */}
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li key={number}>
                <a onClick={() => paginado(number)}>{number}</a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
