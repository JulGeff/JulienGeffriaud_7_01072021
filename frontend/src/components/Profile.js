

import '../styles/Profile.css'
import React from "react";
import Api from './Api'


function Profile() {

    function GetProfile() {
    Api.get('/') 
    
        .then(function (response) {  //Si Ok
            console.log(response.data);
            return response.data;
            })

        .catch(function (response) { // Si erreur
            console.log(response);
        });
    }    
    
    const data = GetProfile();  
    const name = data.name;
    const firstName = data.firstName;
    const email = data.email;
    const isAdmin = data.isAdmin;

   
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