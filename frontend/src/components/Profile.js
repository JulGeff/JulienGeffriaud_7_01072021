
import React from "react";
import { Redirect } from 'react-router-dom';

function Profile({loggedIn})  {

    if (!loggedIn) {
        return <Redirect to="/"/>
        }
    
       /* Api.get('/auth/users') //requête GET via Axios

        .then(function (response) {  //Si Ok
        console.log(response.data);
        })
        .catch(function (response) { // Si erreur
        console.log("pb frontend", response.data);
        });
        */
        

    return (
        <div className='loginsignup'> 
   
        <h1>Votre profil</h1>
        
   

    </div>
    );
    }
  
export default Profile