
import loginpic from "../../assets/login-image.png";
import '../../styles/style.css'
import React, { useState, useEffect } from "react";
import Api from '../Api'
import {
  useHistory,
  Link,
} from "react-router-dom";


function Login() {

        let history = useHistory();
        localStorage.clear();
        
        const [email, setEmail] = useState(""); //initialisation du state vide
        const [password, setPassword] = useState(""); //initialisation du state vide
        const [isAdmin, setIsAdmin] = useState(""); //initialisation du state vide
        const [isLoggedIn, setIsLoggedIn] = useState(""); //initialisation du state vide

        const handleSubmit = (event) => {
        event.preventDefault();

        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) { 

            let loginFormData = { 
                email : email, 
                password: password
            };
         
      
            console.log(loginFormData);

         
         Api.post('/auth/login', loginFormData) //requête POST via Axios

                .then(function (response) {  //Si Ok
                history.push("/forum")   
                console.log(response);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id)
                localStorage.setItem('isAdmin', response.data.isAdmin)
                setIsAdmin(response.data.isAdmin);
                setIsLoggedIn(true);
                console.log(isAdmin)
                console.log(isLoggedIn)
                
               
        })
                
                .catch(function (response) { // Si erreur
                console.log(response);
                alert("Password incorrect ou email inexistant dans la base de données")
                });
                  
   

        } else { // si email ne respecte pas les regex définies
                alert("- Votre email n'est pas au bon format")
        }}



    return (
        
        <div className='login'>
            
        <img src={loginpic} alt='Groupomania' className='login__pic' />
        <h1>Connectez-vous</h1>
        <form className="login__form" onSubmit={handleSubmit}>
                
                <input  
                        className="login__form__input" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        maxLength="40"
                        autoComplete="username" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        required 
                />

                <input   
                        className="login__form__input" 
                        type="password" 
                        name="password" 
                        maxLength="40"
                        autoComplete="current-password"
                        placeholder="Mot de passe" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        required
                />

                <input  className="login__form__button" 
                        type="submit" 
                        value="Je me connecte" 
                />
        </form>

        <p>C'est votre première visite ?</p>
        <p><Link to="/signup"><strong>Créez un compte</strong></Link></p>
    </div>
    );
  }

export default Login
