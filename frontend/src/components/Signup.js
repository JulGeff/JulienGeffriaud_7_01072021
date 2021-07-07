import loginpic from "../assets/login-image.png";
import '../styles/LoginSignup.css'
import React from "react";
import axios from 'axios';
import {
    Link,
  } from "react-router-dom";


function Signup() {
    const [name, setName] = React.useState(""); //initialisation du state vide
    const [firstName, setFirstName] = React.useState(""); //initialisation du state vide
    const [email, setEmail] = React.useState(""); //initialisation du state vide
    const [password, setPassword] = React.useState(""); //initialisation du state vide
  
    const handleSignup = (event) => {
        event.preventDefault();

        if ((/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) //regex : email au format example@test.test
        && (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) { //regex : le mot de passe doit contenir au moins 8 caractères, 1 lettre, 1 chiffre et 1 caractère spécial

            let signupForm = document.getElementById('signupForm');
            let signupFormData = new FormData(signupForm);
            for (var value of signupFormData.values()) { // affiche les 4 valeurs du FormData créé dans la console
                console.log(value);
            }

            axios({
                method: "post",
                url: "http://localhost:3000/api/signup",
                data: signupFormData,
                headers: { "Content-Type": "multipart/form-data" },// type de données envoyées = FormData
            })
                .then(function (response) {  //Si Ok
                console.log(response);
                })
                .catch(function (response) { // Si erreur
                console.log(response);
                });

        } else { // si email et mdp ne respecent pas les regex définies
                alert("- Votre email doit être au format example@test.test\n- Votre mot de passe doit contenir au moins 8 caractères, 1 lettre, 1 chiffre et 1 caractère spécial");
        }}

    return (
        <div className='loginsignup'> 
        <img src={loginpic} alt='Groupomania' className='loginpic' />
        <h1>Créez un compte</h1>
        <form id ='signupForm' className="logform" onSubmit={handleSignup}>
            <label>Nom
                <input id='name' className="input" type="string" name="name" value={name} onChange={e => setName(e.target.value)} required/>
            </label>
            <label>Prénom
                <input id='firstName' className="input" type="sring" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </label>   
            <label>email
                <input id='email' className="input" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>mot de passe
                <input id='password' className="input" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <input className="button" type="submit" value="Je crée mon compte" />
        </form>
        <p>Vous avez déjà un compte ?</p>
        <p className="changelog"><Link to="/login">Connectez-vous</Link></p>
    </div>
    );
  }
  
export default Signup




