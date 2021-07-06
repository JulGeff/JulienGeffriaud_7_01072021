import loginpic from "../assets/login-image.png";
import '../styles/LoginSignup.css'
import React from "react";
import {
    Link,
  } from "react-router-dom";


function Name() {
        let name = document.getElementById('name').value;
        if (/^[a-zA-Z0-9 \-']+$/.test(name))
        { return name;
    } else {
        alert("Le champ Nom n'est pas au bon format");
    }}

    
function FirstName() {
    let firstName = document.getElementById('firstName').value
    if (/^[a-zA-Z0-9 \-']+$/.test(firstName))
    { return firstName;
} else {
    alert("Le champ Prénom n'est pas au bon format");
}}

function Email() {
    let email = document.getElementById('email').value
    if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) 
    { return email;
} else {
    alert("Le champ email n'est pas au bon format");
}}

function Password() {
    let password = document.getElementById('password').value
    if (/^[a-zA-Z0-9 \-']+$/.test(password))
    { return password;
} else {
    alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
}}
 
  
function handleSignup(e) {
        e.preventDefault();

        let name = Name();
        let firstName = FirstName();
        let email = Email();
        let password = Password();

        let user = {
        name : name,
        firstName : firstName,
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
    
            fetch("http://localhost:3000/api/users", sendOptions)
                .then((response) => response.json())
                .then((json) => {
                    //???????????????????
                    }
                    
                )
                .catch(x => { // gestion des erreurs en cas de fail d'API
                    console.log(x);
                })
        }
    
    
    


function Signup() {
    return (
        <div className='loginsignup'> 
            <img src={loginpic} alt='Groupomania' className='loginpic' />
            <h1>Créez un compte</h1>
            <form className="logform" onSubmit={handleSignup}>
                <label>Nom
                    <input id='name' className="input" type="string" name="name" />
                </label>
                <label>Prénom
                    <input id='firstName' className="input" type="sring" name="firstName" />
                </label>   
                <label>email
                    <input id='email' className="input" type="email" name="email" />
                </label>
                <label>mot de passe
                    <input id='password' className="input" type="password" name="password" />
                </label>
                <input className="button" type="submit" value="Je crée mon compte" />
            </form>
            <p>Vous avez déjà un compte ?</p>
            <p className="changelog"><Link to="/login">Connectez-vous</Link></p>
        </div>
    )
}

export default Signup