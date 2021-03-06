import loginpic from "../../assets/login-image.png";
import '../../styles/style.css'

import React from "react";
import Api from '../utils/Api'
import { Link, useHistory } from "react-router-dom";

function Signup() {

    //DECLARATION DES VARIABLES ET INITIALISATION DU STATE
    let history = useHistory();    
    const [lastName, setLastName] = React.useState(""); //initialisation du state vide
    const [firstName, setFirstName] = React.useState(""); //initialisation du state vide
    const [email, setEmail] = React.useState(""); //initialisation du state vide
    const [password, setPassword] = React.useState(""); //initialisation du state vide
  
    //CREATION DU COMPTE UTILISATEUR
    const handleSubmit = (event) => {
        event.preventDefault();

        // La requête n'est envoyée que si les champs respectent les regex suivantes
        if ((/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) //regex : email au format example@test.test
        && (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) { //regex : le mot de passe doit contenir au moins 8 caractères, 1 lettre, 1 chiffre et 1 caractère spécial

            
            let signupFormData = { 
                lastName : lastName, 
                firstName : firstName, 
                email : email, 
                password: password
            };

            Api.post('/auth/signup', signupFormData) //requête POST via Axios

                .then(function (response) {  //Si Ok
                history.push("/") //On redirige vers le login
                alert("Votre compte à bien été créé !\nConnectez-vous pour accéder aux dernières publications de vos collègues.")
              
                
                })
                .catch(function (response) { // Si erreur
                console.log(response);
                alert("Cet email est déjà lié à un compte.")
               
                });

        } else { // si email et mdp ne respecent pas les regex définies
                alert("- Votre email doit être au format example@test.test\n- Votre mot de passe doit contenir au moins 8 caractères, 1 lettre, 1 chiffre et 1 caractère spécial @$!%*#?&");
        }}



    return (
        <div className='signup'> 
        <img src={loginpic} alt='Groupomania' className='signup__pic' />
        <h1>Créez un compte</h1>
        <form className="signup__form" onSubmit={handleSubmit}> {/*au clic sur "Je crée mon compte" on appelle la fonction handleSubmit*/}
       
                <input  id='firstName' 
                        className="signup__form__input" 
                        type="string" 
                        name="firstName" 
                        placeholder="Prénom" 
                        maxLength="40" 
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)} //Si la valeur change on met à jour la variable firstName
                        required 
                />

                <input  id='lastName' 
                        className="signup__form__input" 
                        type="string" 
                        name="lastName" 
                        placeholder="Nom" 
                        maxLength="40" 
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)} //Si la valeur change on met à jour la variable lastName
                        required
                />

                <input  id='email' 
                        className="signup__form__input" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        maxLength="40"
                        autoComplete="username" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} //Si la valeur change on met à jour la variable email
                        required 
                />

                <input  id='password' 
                        className="signup__form__input" 
                        type="password" 
                        name="password" 
                        maxLength="40"
                        autoComplete="current-password"
                        placeholder="Choisissez un mot de passe" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} //Si la valeur change on met à jour la variable password
                        required
                />

                <input  className="signup__form__button" 
                        type="submit" 
                        value="Je crée mon compte" 
                />
        </form>

        <p>Vous avez déjà un compte ?</p>
        <p><Link className ="signup__form__redirect" to="/"><strong>Connectez-vous</strong></Link></p>
    </div>
    );
  }
  
export default Signup





