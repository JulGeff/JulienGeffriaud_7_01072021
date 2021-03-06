
import loginpic from "../../assets/login-image.png";
import '../../styles/style.css'
import React, { useState } from "react";
import Api from '../utils/Api'
import {
  useHistory,
  Link,
} from "react-router-dom";


function Login() {

        //DECLARATION DES VARIABLES ET INITIALISATION DU STATE
        let history = useHistory();
        const [email, setEmail] = useState(""); //initialisation du state vide
        const [password, setPassword] = useState(""); //initialisation du state vide     
        
        
        //CONNEXION AU COMPTE UTILISATEUR
        const handleSubmit = (event) => {
                event.preventDefault();
                
                // La requête n'est envoyée que si l'email champs respecte la regex suivante
                if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) { 

                let loginFormData = { //On définit l'objet à envoyer dans la requête axios
                        email : email, 
                        password: password
                };
                
                Api.post('/auth/login', loginFormData) //requête POST via Axios

                        .then(function (response) {  //Si Ok
                                localStorage.setItem('user', response.data.token); //On stocke le token dans le local storage
                                history.push("/forum")   // On redirige le user connecté vers le forum
                        })
                        
                        .catch(function (response) { // Si erreur
                        console.log(response);
                        alert("Password incorrect ou email inexistant dans la base de données") // On affiche une alerte
                        });
                        
                } else { // si email ne respecte pas les regex définies
                        alert("- Votre email n'est pas au bon format")
        }}


    return (
        
        <div className='login'>
            
        <img src={loginpic} alt='Groupomania' className='login__pic' />
        <h1>Connectez-vous</h1>
        <form className="login__form" onSubmit={handleSubmit}> {/*au clic sur "Je me connecte" on appelle la fonction handleSubmit */}
                
                <input  
                        className="login__form__input" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        maxLength="40"
                        autoComplete="username" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} //Si la valeur change on met à jour la variable email
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
                        onChange={e => setPassword(e.target.value)} //Si la valeur change on met à jour la variable password
                        required
                />

                <input  className="login__form__button" 
                        type="submit" 
                        value="Je me connecte" 
                />
        </form>

        <p>C'est votre première visite ?</p>
        <p><Link className="login__form__redirect" to="/signup"><strong>Créez un compte</strong></Link></p>
    </div>
    );
  }

export default Login
