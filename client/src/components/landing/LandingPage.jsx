import React from "react";
import { Link } from "react-router-dom";
import style from "../landing/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.land}>
      <div className={style.cont2}>
        <div className={style.cont3}>
          <h1 className={style.title}>Bienvenidos a POKEMON!!</h1>
        </div>
        <div className={style.cont4}>
          <Link className={style.link} to="/home">
            <button className={style.btn}>Ingresar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
