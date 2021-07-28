
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Api from '../utils/Api'
import '../../styles/style.css'

function EditProfile()  {


  //DECALARATION DES VARIABLES ET INITIALISATION DU STATE     
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  let history = useHistory(); 
  let token = localStorage.getItem('token')
 

  //RECUPERATION DES DONNEES DU PROFIL DEPUIS LA BDD
  useEffect(() => {
  let token = localStorage.getItem('token')
  Api.get('/auth/user', {          
        headers: {
            'Authorization': `${token}`
        },}
      )
     
    .then(function (response) {
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
    })
    .catch(function (response) { // Si erreur
    console.log(response);
    });
    
  }
  , [])
    

  // VALIDATION DES MODIFICATIONS AU CLIC SUR 'PUBLIER'
  const handleSubmit = (event) => { 
    event.preventDefault();

    let userData = { 
      firstName : firstName,
      lastName: lastName
    };

    Api.put(
      '/auth/user', userData,
      {headers: {
        'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
      }}
 ) 

      .then(function (response) {  //Si Ok
      alert("Votre profil a bien été mis à jour !")
      history.push("/profile")
      
      })
      .catch(function (response) { // Si erreur
      console.log(response);
      });
    }

  
    return (
        <div className='editprofile'>

            <Link className='editprofile__back' to="/profile">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg>
            </Link>
            
            <h1>Mettez à jour votre profil !</h1> 
                   
            <form className="editprofile__form" onSubmit={handleSubmit}>
                  
                  <input  id='firstName' 
                          className="editprofile__form__input" 
                          type="string" 
                          name="firstName" 
                          placeholder="Prénom" 
                          maxLength="40" 
                          value={firstName} 
                          onChange={e => setFirstName(e.target.value)} 
                          required 
                  />

                  <input  id='lastName' 
                          className="editprofile__form__input" 
                          type="string" 
                          name="lastName" 
                          placeholder="Nom" 
                          maxLength="40" 
                          value={lastName} 
                          onChange={e => setLastName(e.target.value)} 
                          required
                  />

                  <input  className="editprofile__form__button" 
                          type="submit" 
                          value="Enregistrer les modifications" 
                  />
              </form>
             
            </div>
        
    );
    }
 
export default EditProfile
