import loginpic from "../assets/login-image.png";
import '../styles/LoginSignup.css'
import React from "react";
import {
    Link,
  } from "react-router-dom";
import Api from './Api'


function Login() {
    const [email, setEmail] = React.useState("");       //initialisation du state vide
    const [password, setPassword] = React.useState(""); //initialisation du state vide
  
    const handleLogin = (event) => {
        event.preventDefault();


        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) { //regex : email au format example@test.test
        let loginFormData = { email : email, password: password };
        console.log(loginFormData);
         
 
         Api.post('/auth/login', loginFormData)  //requête POST via Axios

            .then(function (response) { //Si Ok
              console.log(response);
            })
            .catch(function (response) { //Si erreur
              console.log(response);
            });

        } else { // si email ne respecte pas la regex définie
            alert ("Votre email n'est pas au bon format")
        }
    }

    return (
        <div className='loginsignup'> 
        <img src={loginpic} alt='Groupomania' className='loginpic' />
        <h1>Connectez-vous</h1>
        <form id="loginForm" className="logform"  onSubmit={handleLogin}>
            <label>email
                <input id="email" className="input" type="email" name="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>mot de passe
                <input id="password" className="input" type="password" name="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <input  className="button" type="submit" value="Connexion" />
        </form>
        <p>C'est votre première visite ?</p>
        <p className="changelog"><Link to="/signup">Créez un compte</Link></p>
    </div>   
    );
  }
  
export default Login