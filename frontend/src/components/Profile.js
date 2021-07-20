
import React from "react";
import { Redirect } from 'react-router-dom';
import Api from './Api'

function Profile({loggedIn})  {

    if (!loggedIn) {
        return <Redirect to="/"/>
        }
        
      let userId = localStorage.getItem('userId')
      let token = localStorage.getItem('token')
      console.log( userId, token)
     
       
      Api.get('/auth/user/', {
        
            params: {
              userId: userId
            },
          
            headers: {
                'Authorization': `${token}`
            }
          }) 
        .then(function (response) {  //Si Ok
        console.log(response.data);
        })
        .catch(function (response) { // Si erreur
        console.log("Erreur", response.data);
        });
        
        

    return (
        <div className='loginsignup'> 
   
        <h1>Votre profil</h1>
        
   

    </div>
    );
    }
  
export default Profile