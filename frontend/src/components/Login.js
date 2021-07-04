import loginpic from "../assets/login-image.png";
import '../styles/LoginSignup.css'
import React from "react";
import {
    Link,
  } from "react-router-dom";

function handleLogin(e) {
    e.preventDefault()

}

function Login() {
    return  (
        <div className='loginsignup'> 
            <img src={loginpic} alt='Groupomania' className='loginpic' />
            <h1>Connectez-vous</h1>
            <form className="logform"  onSubmit={handleLogin}>
                <label>email
                    <input className="input" type="email" name="email" />
                </label>
                <label>mot de passe
                    <input className="input" type="password" name="password" />
                </label>
                <input  className="button" type="submit" value="Connexion" />
            </form>
            <p>C'est votre première visite ?</p>
            <p className="changelog"><Link to="/signup">Créez un compte</Link></p>
        </div>        
        )
}

export default Login