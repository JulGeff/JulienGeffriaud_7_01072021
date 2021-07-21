
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Api from './Api'
import '../styles/Profile.css'

     
let id = localStorage.getItem('userId')
let token = localStorage.getItem('token')


function Profile({loggedIn})  {
      const [isLoading, setLoading] = useState(true);
      let history = useHistory();  
      const [profileInfo, setProfileInfo] = useState([]);
      

      useEffect(() => {

      Api.get('/auth/user', {          
            headers: {
                'Authorization': `${token}`
            },
            params: {
              id : id
             },
            }
            , [])
         
        .then(function (response) {
          console.log(response.data)
          setProfileInfo(response.data);
          setLoading(false);
          
     
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
              params: {
                id : id         //La requête concerne l'id du user connecté
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

        if (!loggedIn) {
          return <Redirect to="/"/>
          }

        if (isLoading) {
          return <div className="App">Loading...</div>;
        }
       
    return (
        <div className='profile'> 
   
            <h1>Votre profil</h1> 
        
            <ul>
              <li>Prénom : {profileInfo.firstName}</li>
              <li>Nom : {profileInfo.lastName}</li>
              <li>email : {profileInfo.email}</li>
             
            </ul>
            
            <p className = "delete" onClick = { handleDelete }>Supprimer mon profil</p>

        </div>
    );
    }
  
export default Profile