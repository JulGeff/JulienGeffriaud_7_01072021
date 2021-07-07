import loginpic from "../assets/login-image.png";
import '../styles/LoginSignup.css'
import React from "react";
import {
    Link,
  } from "react-router-dom";

function handleLogin(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  
    let user = {
    email : email,
    password : password,
    }
        
        console.log(user);

        let sendOptions = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        }

        fetch("http://localhost:3000/api/auth/login", sendOptions)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                }
                
            )
            .catch(x => { // gestion des erreurs en cas de fail d'API
                console.log(x);
            })

}

function Login() {
    return  (
        <div className='loginsignup'> 
            <img src={loginpic} alt='Groupomania' className='loginpic' />
            <h1>Connectez-vous</h1>
            <form className="logform"  onSubmit={handleLogin}>
                <label>email
                    <input id="email" className="input" type="email" name="email" autoComplete="username"/>
                </label>
                <label>mot de passe
                    <input id="password" className="input" type="password" name="password" autoComplete="current-password" />
                </label>
                <input  className="button" type="submit" value="Connexion" />
            </form>
            <p>C'est votre première visite ?</p>
            <p className="changelog"><Link to="/auth/signup">Créez un compte</Link></p>
        </div>        
        )
}

export default Login