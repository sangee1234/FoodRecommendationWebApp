import './Login.css'
import React, {Component, useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import {useNavigate} from "react-router-dom"

function Login() {

    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    const responseFacebook = (response) => {
        console.log(response);
        if(response.accessToken){
          setLogin(true);
          navigate("/preference");
        }else{
          setLogin(false);
        }
      }

    window.onload = () =>{
        var loginBtn = document.getElementById("loginBtn");
        var registerBtn = document.getElementById("registerBtn");
        var loginform = document.getElementById("loginform");
        var registerform = document.getElementById("registerform");
        var forgot = document.getElementById("forgot");
        var sso = document.getElementById("ssodiv");
        var m1 = document.getElementById("m1");

    loginBtn.onclick= function() {
        //alert('logi');
        loginform.style.left='0px';
                loginform.style.opacity='1';
                forgot.style.left='0px';
                forgot.style.opacity='1';
                sso.style.opacity='1';
                sso.style.left='0px';
                m1.style.opacity='1';
                m1.style.left='0px';
                registerform.style='500px';
                loginBtn.classList.add('active');
                registerBtn.classList.remove('active');
                registerform.style.opacity='0';
    }

    registerBtn.onclick= function() {
        registerform.style.left='0px';
        registerform.style.opacity='1';
        loginform.style.left='-500px';
        loginform.style.opacity='0';
        forgot.style.left='-500px';
        m1.style.opacity='0';
        m1.style.left='-500px';
        forgot.style.opacity='0';
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
        sso.style.opacity='0';
        sso.style.left='-500px';

}
}
    return(
        <div className="page" style={{
            "height":`70rem`,
          }}>
            <link rel="stylesheet" href="Login.css" type="text/css"/>
            
             <div className="login-register">
            <div className="nav-buttons">
                <button id="loginBtn" className='active' >Login </button>
                <button id="registerBtn">Register</button>
            </div>
            <div className="form-group">
                <form action="/ratesample" id="loginform" >
                    <label for="username">username</label>
                    <input type="text" id="username"/>
                    <label for="password">password</label>
                    <input type="text" id="password"/>
                    <input type="submit" value="Submit" className="submit"/>
                </form>
                <hr style={{top:-'50px'}}/>
                <div id='m1' style={{top:-'50px'}}>Don't want to create account?</div>
                <div className="sso" id="ssodiv">
                    <center>
                <FacebookLogin appId="696508138802434"
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="btnFacebook"
          icon="fa-facebook"
        textButton = "&nbsp;&nbsp;Sign In with Facebook"                                                                
           />
           </center>
           


                </div>
                <form action="" id="registerform">
                    <label for="fullname">fullname</label>
                    <input type="text" id="fullname"/>
                    <label for="email">email</label>
                    <input type="text" id="email"/>
                    <label for="passwword">password</label>
                    <input type="text" id="password"/>
                    <label for="confirmpassword">confirm password</label>
                    <input type="text" id="confirmpassword"/>
                    <input type="submit" value="Submit" className="submit"/>
                </form>
            </div>
            <div id="forgot">
                <a href="">forgot password?</a>
            </div>
        </div>
        <div className="note">This page is not fully developed, please click on submit to continue</div>
        </div>

               
    );
}

export default Login;