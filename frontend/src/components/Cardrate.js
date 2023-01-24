import React,{Component, useState} from "react";
import "./Cardrate.css";
import {useNavigate} from "react-router-dom"
import EmptyStar from '../assets/empty-star.png';
import FilledStar from '../assets/filled-star.png';

class Stars extends Component {
    constructor(props) {
      super(props);
      //console.log(props.rating);
      this.state = {currRating : 0}
      this.onHover = this.onHover.bind(this)
      this.onClick = this.onClick.bind(this) 
    }
   onHover(e) {
    if (e.target.className === 'star') {
     this.setRating(e.target.dataset.value)
     this.props.setRating(this.props.val, e.target.dataset.value)
     
    }
   }
   onClick(e) {
    if (e.target.dataset.value === this.state.currRating){
     this.setRating(e.target.dataset.value - 1)
    }
   }
   setRating(value) {
     this.setState({currRating : value})
   }
   render(){
     return(
     [...Array(this.props.starCount).keys()].map((index) => {
     return (
      <img 
      onMouseOver={this.onHover}
      onClick={this.onClick}
      data-value={index + 1}
      className="star"   
      src={index + 1 <= this.state.currRating ? 
          FilledStar : EmptyStar}
      alt={index + 1 <= this.state.currRating ? 
          "filled star" : "empty star"} />)
      })
     )
    }
   }
  
   const RatingSystem = (props) =>  {

    console.log(props);
    const [rate, setRate] = useState(0);

    return (
      <div>
      <div className='rating'>
        <Stars id="st" starCount={props.starCount} rating={rate} setRating={props.setRating} val={props.val}/>
      </div>
      </div> 
    );
   }

export default function Cardrate(props) {

  const navigate = useNavigate();
  const recipePage = ()=>{
    navigate("/recipe");
  }

  // const [rating, setRating] = useState(3);

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
      {/* <div className="card-text">{props.description}</div> */}
      <div className="card-like-bar">
       <RatingSystem id="rs" starCount={5}  setRating={props.setRating} val={props.recipeId}/> 
        {/* {props.liked ? (
          <img className="card-like-icon" src={heartFill} alt="Logo" />
        ) : (
          <img className="card-like-icon" src={heartOutline} alt="Logo" />
        )} */}
      
      </div>
    </div>
  );
}