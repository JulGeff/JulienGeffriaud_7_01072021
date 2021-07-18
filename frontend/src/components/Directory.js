
import React from "react";
import Api from './Api'

function Directory() {
   
    
        Api.get('/') //requête GET via Axios

        .then(function (response) {  //Si Ok
        console.log(response);
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



