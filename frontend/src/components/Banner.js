
import '../styles/Banner.css'
import logo from '../assets/logo.png'
import React from "react";
import {
  Link,
} from "react-router-dom";

function Banner() {
    return  (
                <div>
                    <div className='banner'>
                    <img src={logo} alt='Groupomania' className='logo' />
                    <h1>Bienvenue sur le réseau interne Groupomania !</h1>
                    </div>
                    <ul className='menu'>
                        <li><Link to="/login" className = 'link'>Se connecter</Link></li>
                        <li><Link to="/signup" className = 'link'>Créer un compte</Link></li>
                    </ul>
                </div>
                )
           
            
}

export default Banner