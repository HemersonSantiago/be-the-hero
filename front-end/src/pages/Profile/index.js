import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./style.css";
import logo from "../../assets/logo.svg";
import api from "../../services/api";

export default () => {
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");


  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = async () => {
    await api
      .get("profile", {
        headers: {
          authorization: ongId
        }
      })
      .then(data => {
        setIncidents(data.data.incidents);
      })
      .catch(data => setIncidents([]));
  }

  useEffect(() => {
    fetchIncidents();
    // eslint-disable-next-line
  }, [ongName]);

  const deleteIncident = async id => {
    await api.delete(`incidents/${id}`, {
      headers: {
        authorization: ongId
      }
    })
      .then(() => alert("Excluido com sucesso!"))
      .catch(error => alert(error))
      .finally(() => fetchIncidents());
  }

  const handleLogout = () => {
    localStorage.setItem("ongId", "");
    localStorage.setItem("ongName", "");
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(item => (
          <li key={item.id}>
            <strong>CASO:</strong>
            <p>{item.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{item.description}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.value)}</p>
            <button type="button" onClick={() => deleteIncident(item.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}