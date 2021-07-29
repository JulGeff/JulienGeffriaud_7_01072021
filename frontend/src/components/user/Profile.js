
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Api from '../utils/Api'
import '../../styles/style.css'

function Profile()  {


      //DECALARATION DES VARIABLES ET INITIALISATION DU STATE    
      const [isLoading, setIsLoading] = useState(true); 
      const [profileInfo, setProfileInfo] = useState([]);
      let history = useHistory(); 
      var jwt = require('jsonwebtoken');
      let token = localStorage.getItem('user')
      let userInfo = jwt.decode(token)
      const [user, setUser] = useState(userInfo)
      
      //RECUPERATION DES DONNEES DU PROFIL DEPUIS LA BDD
      useEffect(() => {
      let token = localStorage.getItem('user')
      Api.get('/auth/user', {          
            headers: {
                'Authorization': `${token}`
            },}
          )
         
        .then(function (response) {
          setProfileInfo(response.data); // On met le state à jour avec le contenu de la réponse du serveur
          setIsLoading(false);
        })
        .catch(function (response) { // Si erreur
        console.log(response);
        });
        
      }
      , [])

      //SUPPRESSION DU PROFIL UTILISATEUR
      const handleDelete = (event,id) => { //Quand on clique sur "Supprimer"
        
        event.preventDefault();
        Api.delete('/auth/user', {          
          headers: {
              'Authorization': `${token}` //On sécurise la requêyte avec le token
          },
          params: {id : id}
        }) 
   
        .then(function (response) {
          alert ('Votre profil a bien été supprimé') 
          history.push("/signup")
          localStorage.clear();
          
        })
        .catch(function (response) { // Si erreur
        console.log(response);
        });
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
              {user.isAdmin
                ? ( <li>Administrateur·rice</li>) 
                : (' ')} 
           
            </ul>

            <div className = "profile__buttons">
            <Link to="/editprofile">
                    <p className = "profile__buttons__edit">Modifier mon profil</p>
            </Link>

          

            {!user.isAdmin
                ? ( <p className = "profile__buttons__delete" onClick = {e => {if (window.confirm('Etes-vous vraiment sûr·e de vouloir supprimer votre profil ?')) handleDelete(e, profileInfo.id)}}>Supprimer mon profil</p>) 
                : (' ')} 
            </div>
            
        </div>
    );
    }
 
export default Profile


