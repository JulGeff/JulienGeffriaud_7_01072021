
import React, { useEffect, useState } from 'react';
import Api from './Api'
import '../styles/style.css'
import { Redirect, Link } from 'react-router-dom';
import RemovebyAttr from './utils/RemoveByAttr'

let token = localStorage.getItem('token')

function UserPublications({loggedIn}) {

  const userId = window.location.href.split('=')[1];
  const [userPublications, setUserPublications] = useState([]); //initialisation du state vide   
  let isAdmin = JSON.parse(localStorage.getItem('isAdmin'))


// RECUPERATION DES PUBLICATIONS DU USER STOCKEES DANS LA BDD

    useEffect(() => {
      const userId = window.location.href.split('=')[1];
      let token = localStorage.getItem('token')
     
        Api.get('/publication/user', 
        {   headers: {
            'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
        },
            params : {userId : userId}
      
        }) //requête GET via Axios
        .then(function (response)  {
            const userPublications = response.data;
            setUserPublications(userPublications);
            console.log(userPublications)
          })
          .catch(function (response) { // Si erreur
            console.log("pb frontend", response.data);
            });
            }
      , [])
   
        const handleDelete = (e, id) => { //Quand on clique sur "Supprimer ma publication"
          e.preventDefault();
 
          Api.delete('/publication', {                  
            headers: {
                'Authorization': `${token}` //On sécurise la requête avec le token
            },
            params: { // On envoie l'id de la publication dans les paramètres de la requête
              id : id
             },
          }) 
     
          .then(function (response) {
            alert ('Votre publication a bien été supprimée')
            console.log("Publication supprimée", response)  
            setUserPublications(RemovebyAttr.removeByAttr(userPublications, 'id', id))      
            console.log(userPublications)    
            
      
          })
          .catch(function (response) { // Si erreur
          console.log("Erreur", response);
          });
          }

      if (!loggedIn) {
        return <Redirect to="/"/>
        }


    return (
      <div className = "userpublications">
          <h1>Dernières publications de numéro { userId }</h1>

          {userPublications.length? (
            <div >
              {userPublications.map((item,i) => 
              <div className = "userpublications__display" key={i}>
               <Link to={"./publication?id=" + item.id}  className='userpublications__display__link'>
                    <div className = "userpublications__display__link__content" >
                        <h2>{item.title}</h2>
                        <p className='userpublications__display__link__content__subtitle'>Publié le {item.createdAt.substring(9,10).padStart(2, '0')}/{item.createdAt.substring(6,7).padStart(2, '0')}/{item.createdAt.substring(0,4)} à {item.createdAt.substring(11,16)}   </p>
                        <p>{item.content}</p>

                       
                    </div>
                </Link>

                { userId===localStorage.getItem("id") || isAdmin
                ? (<p className = "userpublications__display__link__content__delete" onClick = {e => handleDelete(e, item.id)} >Supprimer la publication</p>) 
                : ('')}
              </div>
                )} 
            </div> 
            ) : (
              <div className = "userpublications__none">
            <p>Numéro { userId } n'a encore rien publié !</p>
            <Link to={"./"} className = "userpublications__none__link"><p>Aller au forum</p></Link>
            </div>
            
          )}
      </div>
    );
  };
  
export default UserPublications


