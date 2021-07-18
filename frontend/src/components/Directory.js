
import React from "react";
import Api from './Api'
import { Redirect } from 'react-router-dom';

function Directory({authorized})  {

    if (!authorized) {
        return <Redirect to="/"/>
        }
    
        Api.get('/auth/users') //requête GET via Axios

        .then(function (response) {  //Si Ok
        console.log(response.data);
        })
        .catch(function (response) { // Si erreur
        console.log("pb frontend", response.data);
        });
        

    return (
        <div className='loginsignup'> 
   
        <h1>Annuaire interne Groupomania</h1>
        
   

    </div>
    );
    }
  
export default Directory
