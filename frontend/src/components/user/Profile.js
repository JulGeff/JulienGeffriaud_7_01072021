
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import Api from '../utils/Api'
import '../../styles/style.css'

function Profile({loggedIn})  {


      //DECALARATION DES VARIABLES ET INITIALISATION DU STATE    
      const [isLoading, setIsLoading] = useState(true); 
      const [profileInfo, setProfileInfo] = useState([]);
      let history = useHistory(); 
      let token = localStorage.getItem('token')
      let isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
      
      
      //RECUPERATION DES DONNEES DU PROFIL DEPUIS LA BDD
      useEffect(() => {
      let token = localStorage.getItem('token')
      Api.get('/auth/user', {          
            headers: {
                'Authorization': `${token}`
            },}
          )
         
        .then(function (response) {
          console.log(response.data)
          setProfileInfo(response.data);
          setIsLoading(false);
        })
        .catch(function (response) { // Si erreur
        console.log("Erreur", response.data);
        });
        
      }
      , [])

      const handleDelete = (event,id) => { //Quand on clique sur "Supprimer"
        
        event.preventDefault();
        Api.delete('/auth/user', {          
          headers: {
              'Authorization': `${token}` //On sécurise la requêyte avec le token
          },
          params: {id : id}
        }) 
   
        .then(function (response) {
          history.push("/signup")
          localStorage.clear();
          
        })
        .catch(function (response) { // Si erreur
        console.log("Erreur", response.data);
        });
        }

  //redirection vers pages de login si quelqu'un essaie d'accéder directement à la page Profil          
        if (!loggedIn) {
          return <Redirect to="/"/>
          }

   //Message d'attente en attendnat la fin de la requête axios    
        if (isLoading) {
          return <div className="App">Loading...</div>;
        }
       
    return (
        <div className='profile'> 
   
            <h1>Bonjour {profileInfo.firstName} !</h1> 
            <div className = "profile__buttons">
                <Link to={"./forum/userpublications?id=" + profileInfo.id} className = 'profile__buttons__link'>
                  <p className = "profile__buttons__publications" >Voir mes publications</p>
                </Link>
              </div>
        
            <ul>
              <li>Prénom : {profileInfo.firstName}</li>
              <li>Nom : {profileInfo.lastName}</li>
              <li>email : {profileInfo.email}</li>
              <li>Profil créé le {profileInfo.createdAt.substring(9,10).padStart(2, '0')}/{profileInfo.createdAt.substring(6,7).padStart(2, '0')}/{profileInfo.createdAt.substring(1,4).padStart(2, '0')}</li>
            
            </ul>

            <div className = "profile__buttons">
            <Link to="/editprofile">
                    <p className = "profile__buttons__edit">Modifier mon profil</p>
            </Link>

            {!isAdmin
                ? ( <p className = "profile__buttons__delete" onClick = {e => handleDelete(e, profileInfo.id)}>Supprimer mon profil</p>) 
                : (' ')} 
            </div>
            
        </div>
    );
    }
 
export default Profile