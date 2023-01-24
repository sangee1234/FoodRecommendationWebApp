import React from "react";
import "./Card.css";
import {useNavigate} from "react-router-dom"

export default function Card(props) {

  const navigate = useNavigate();
  const recipePage = ()=>{
    navigate("/recipe");
  }


  return (
    <div className="card" >
      <div className="card-header">
        <div className="profile">
          <span className="letter">{props.name}</span>
          <br />
          <span className="letter">Cals</span>
        </div>
        <div className="card-title-group">
          <h5 className="card-title">{props.title}</h5>
          <div className="card-date">{props.TotalTime}</div>
        </div>
      </div>
      <img className="card-image" src={props.image} alt="Logo" />
      <div className="card-text">{props.description}</div>
      <div className="card-like-bar">
        {/* {props.liked ? (
          <img className="card-like-icon" src={heartFill} alt="Logo" />
        ) : (
          <img className="card-like-icon" src={heartOutline} alt="Logo" />
        )} */}
        <div className="like-text">
          <b>{props.av_rating}</b>
          {/* <button type="submit" onClick={recipePage(props)}>VIEW</button> */}
        </div>
      </div>
    </div>
  );
}