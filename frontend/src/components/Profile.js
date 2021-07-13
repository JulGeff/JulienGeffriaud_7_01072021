

import '../styles/Profile.css'
import React from "react";
import Api from './Api'


function Profile() {

    Api.get('/') 
    .then(function Profile(response) {  //Si Ok
        const name = response.body.name;
        const firstName = response.body.firstName;
        const email = response.body.email;
        const isAdmin = response.body.isAdmin;
        var adminProfile ='';
        if (isAdmin) {
            adminProfile = "Administrateur·rice"
        } else {
            adminProfile = "User"

        };
        return {name : name, firtsName : firstName, email : email, adminProfile : adminProfile}
        })
        .catch(function (response) { // Si erreur
        console.log(response);
        });

    let firstName = Profile().firstName
    let name = Profile().name
    let email = Profile().email
    let adminProfile = Profile().adminProfile
    
    return (
        <div className='profile'>
            <h1> Votre profil</h1>
            <ul>
                <li> Nom : { firstName }</li>
                <li> Prénom : { name }</li>
                <li> Adresse email : { email }</li>
                <li> Type de profil : { adminProfile }</li>
            </ul>
        </div>

    );
  }
  
export default Profile