
import '../styles/Banner.css'
import logo from '../assets/logo.png'
import React from "react";
import Login from './Login'
import Signup from './Signup'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

function Banner() {
    return  <Router>
                <div>
                    <div className='banner'>
                    <img src={logo} alt='Groupomania' className='logo' />
                    <h1>Bienvenue sur le réseau interne Groupomania !</h1>
                    </div>
                    <ul className='menu'>
                        <li><Link to="/" className = 'link'>Home</Link></li>
                        <li><Link to="/login" className = 'link'>Se connecter</Link></li>
                        <li><Link to="/signup" className = 'link'>Créer un compte</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                           <Signup />
                        </Route>
                    </Switch>
                </div>
                
            </Router>
            
}

export default Banner