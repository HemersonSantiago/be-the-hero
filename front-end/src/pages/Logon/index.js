import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import logo from "../../assets/logo.svg";
import heroes from "../../assets/hero.png";
import "./styles.css";

import api from "../../services/api";

export default () => {

  const [id, setId] = useState('');
  
  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();

    await api
      .post("/sessions", { id })
      .then(data => {
        localStorage.setItem("ongId", id);
        localStorage.setItem("ongName", data.data.name);
        history.push("/profile");
      })
      .catch(error => {
        alert(error);
        localStorage.setItem("ongId", "");
        localStorage.setItem("ongName", "");
      });

  };

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color={"#E02041"} />
            Não tenho cadastro 
          </Link>
        </form>
      </section>
      <img src={heroes} alt="Heroes"/>
    </div>
  );
};