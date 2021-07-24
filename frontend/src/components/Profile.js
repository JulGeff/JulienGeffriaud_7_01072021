
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import Api from './Api'
import '../styles/style.css'

     
let token = localStorage.getItem('token')


function Profile({loggedIn})  {
      const [isLoading, setIsLoading] = useState(true); 
      const [profileInfo, setProfileInfo] = useState([]);
      let history = useHistory(); 

      useEffect(() => {

      Api.get('/auth/user', {          
            headers: {
                'Authorization': `${token}`
            },}
            , [])
         
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

      const handleDelete = () => { //Quand on clique sur "Supprimer mon profil"
            Api.delete('/auth/user', {          
              headers: {
                  'Authorization': `${token}` //On sécurise la requêyte avec le token
              },
            }) 
       
            .then(function (response) {
              console.log("Utilisateur supprimé", response)
              localStorage.clear(); 
              history.push("/signup")
                
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
                <p className = "profile__buttons__delete" onClick = { handleDelete }>Supprimer mon profil</p>
            </div>
        </div>
    );
    }
  
export default Profile