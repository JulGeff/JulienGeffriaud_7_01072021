

import '../styles/Profile.css'
import React from "react";
import Api from './Api'


function Profile() {

    Api.get('/') 
    .then(function Profile(response) {  //Si Ok
        const data = response.data;
        return data;
        })
        .catch(function (response) { // Si erreur
        console.log(response);
        });
    
        const name = Profile().name
        const firstName = Profile().firstName
        const email = Profile().email
        const isAdmin = Profile().isAdmin
   
    return (
        <div className='profile'>
            <h1> Votre profil</h1>
            <ul>
                <li> Nom : { name }</li>
                <li> Prénom : { firstName } </li>
                <li> Adresse email : { email } </li>
                <li> Type de profil : { isAdmin }</li>
            </ul>
        </div>

    );
  }
  
export default Profile