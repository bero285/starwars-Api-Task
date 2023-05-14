import React from "react";
import Card from "./Card";
import "./infoCard.css";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
const InfoCard = (props) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const params = useLocation();

  console.log(params);
  useEffect(() => {
    const url = params.state;

    async function getText(data) {
      let x = await fetch(data);
      let y = await x.json();

      setInfo(y);
    }

    getText(url);
  }, []);

  return (
    <div className="everyinfo">
      <h2>name: {info.name}</h2>
      <h2>gender: {info.gender}</h2>
      <h2>height: {info.height}</h2>
      <h2>weight: {info.mass}</h2>
      <h2>hair color: {info.hair_color}</h2>
      <h2>skin color: {info.skin_color}</h2>
      <h2>eye color: {info.eye_color}</h2>

      <Link to="/star-wars-Api-Task/home/">
        <button onClick={() => navigate(-1)}>Get Back</button>
      </Link>
    </div>
  );
};
export default InfoCard;
