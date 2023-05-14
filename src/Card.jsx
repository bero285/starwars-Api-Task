import "./Card.css";
import { useEffect, useRef } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  useState,
} from "react-router-dom";
const Card = (props) => {
  var a = props.name.replace(/\s/g, "");

  return (
    <>
  
      <Link
        to={{
          pathname: `/star-wars-Api-Task/about/${a}`,
        }}
        state={props.url}
        onClick={props.showCard}
      >
        <div className="lil-cont">
          <h2>Name: {props.name}</h2>
          <h2>gender: {props.gender}</h2>
          <h2>birth Year: {props.birthDate}</h2>
        </div>
      </Link>
    </>
  );
};
export default Card;
