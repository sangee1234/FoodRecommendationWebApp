import React, {Component, useState} from 'react';
import GoogleLogin from 'react-google-login';
import './Home.css';
import image1 from '../assets/icon.png'
import {useNavigate} from "react-router-dom"


function Home() {


  // const [login, setLogin] = useState(false);
  // const [data, setData] = useState({});
  // const [picture, setPicture] = useState('');
  const navigate = useNavigate();
  const loginPage = ()=>{
    navigate("/login");
  }
  const TopFewPage = ()=> {
    navigate("/topfew");
  }

  return (
    <div className="App" style={{
      background: `url("../assets/bkg.png")`,
    }}>
      <div className="NavWrapper">
      <div className="NavBar">
        <div className="NavContent">
        <img
              alt="image"
              src={image1}
              className="home-image"
            />
            <span className="appName">
              <span className="home-text01">RECIPES -</span>
              <span> FOR-YOU</span>
            </span>
        </div>
        <div className="home-links">
            <span className="home-text03 navbarLink" ><a href="#section1" class="btn" style={{color:`#5d7c1f`}}>About</a></span>
            <span className="home-text04 navbarLink"><a href="#section2" class="btn" style={{color:`#5d7c1f`}}>Features</a></span>
            <button className="button-secondary" onClick={()=>{loginPage()}}>Log in</button>
            <button className="button-primary" onClick={()=>{TopFewPage()}}>Get started</button>

          </div>
          </div>
        {/* <img alt="image" src={image1} className="icon"></img>
        
        <span className="tab1"><span>ABOUT</span></span>
        <span className="tab2"><span>LOG IN</span></span>
        <span className="tab3"><span>GET STARTED</span></span> */}

      </div>
      <body>
        <div className="NavWrapper2">
      <div className="bodyWrapper" id="section1">
        <div className="content1">
          We suggest recipes based on data and your preferences. We consider
          your diets, tastes, restrictions, allergies, ingredients present, etc into understanding
          and offer suggestions. We also provide additionals details about the recipe which can help you make your decisions easily.
        </div>
      </div> 
      <div className="NavWrapper">
        <div className="sample">
          </div>
      <div className="content2" id="section2">
        <span className="features-heading">FEATURES</span>
          <ul className="list1">
            <li>You can rate the recipes after trying to get more personalized recipes.</li>
            <li>You can provide your preferences of food along with calorie/diet/allergic restrictions.</li>
            <li>You can get recipes that can be made using ingredients you have.</li>
            <li>You can get details of the recipes like time taken, calories contained, etc.</li>
          </ul>
        </div>
        </div>
      </div>
      </body>
      {/* <h1> LOGIN</h1>
      <FacebookLogin appId="696508138802434"
          fields="name,email,picture"
          callback={responseFacebook} />
      <br /> */}
    </div>
  );
}

export default Home;
