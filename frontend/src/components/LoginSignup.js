import loginpic from "../assets/login-image.png";
import '../styles/LoginSignup.css'
import { useState } from 'react'
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";


function handleSignup(e) {
    e.preventDefault()

}

function handleLogin(e) {
    e.preventDefault()

}

function Login() {

const [loginOpen, setLoginOpen] = useState(true);

    return loginOpen? (<Router><div className='loginsignup'> 
                <img src={loginpic} alt='Groupomania' className='loginpic' />
                <h1>Connectez-vous</h1>
                <form className="logform"  onSubmit={handleLogin}>
                <label>
                   email
                    <input className="input" type="email" name="email" />
                </label>
                <label>
                   mot de passe
                    <input className="input" type="password" name="password" />
                </label>

                <input  className="button" type="submit" value="Connexion" />
                </form>
                <p>C'est votre première visite ?</p>
                <p className="changelog" onClick={() => setLoginOpen(false)}><Link to="/signup">Créez un compte</Link></p>
                <Route path="/signup"/>
            </div> </Router>):(<Router>
                <div className='loginsignup'> 
                <img src={loginpic} alt='Groupomania' className='loginpic' />
                <h1>Créez un compte</h1>
                <form className="logform" onSubmit={handleSignup}>
                <label>
                   Nom
                    <input className="input" type="string" name="name" />
                </label>
                <label>
                    Prénom
                    <input className="input" type="sring" name="firstName" />
                </label>   
                <label>
                   email
                    <input className="input" type="email" name="email" />
                </label>
                <label>
                   mot de passe
                    <input className="input" type="password" name="password" />
                </label>

                <input className="button" type="submit" value="Je crée mon compte" />
                </form>
                
                <p>Vous avez déjà un compte ?</p>
                <p className="changelog" onClick={() => setLoginOpen(true)}><Link to="/signup">Connectez-vous</Link></p>
            </div>
            <Route path="/login"/>
            </Router>
            )
            
}

export default Login