import loginpic from "../assets/login-image.png";
import '../styles/LoginSignup.css'
import React from "react";
import {
    Link,
  } from "react-router-dom";

function handleSignup(e) {
    e.preventDefault()
}

function Signup() {
    return (
        <div className='loginsignup'> 
            <img src={loginpic} alt='Groupomania' className='loginpic' />
            <h1>Créez un compte</h1>
            <form className="logform" onSubmit={handleSignup}>
                <label>Nom
                    <input className="input" type="string" name="name" />
                </label>
                <label>Prénom
                    <input className="input" type="sring" name="firstName" />
                </label>   
                <label>email
                    <input className="input" type="email" name="email" />
                </label>
                <label>mot de passe
                    <input className="input" type="password" name="password" />
                </label>
                <input className="button" type="submit" value="Je crée mon compte" />
            </form>
            <p>Vous avez déjà un compte ?</p>
            <p className="changelog"><Link to="/login">Connectez-vous</Link></p>
        </div>
    )
}

export default Signup