
import React from "react";
import { Redirect } from 'react-router-dom';
import Api from './Api'

function Profile({loggedIn})  {

    if (!loggedIn) {
        return <Redirect to="/"/>
        }
        
        localStorage.getItem('userLoggedIn')

        let id = JSON.parse(localStorage.getItem('userLoggedIn')).id
        console.log(id)
       
        Api.get('/auth/users/:{id]') 

        .then(function (response) {  //Si Ok
        console.log(response.data);
        })
        .catch(function (response) { // Si erreur
        console.log("pb frontend", response.data);
        });
        
        

    return (
        <div className='loginsignup'> 
   
        <h1>Votre profil</h1>
        
   

    </div>
    );
    }
  
export default Profile