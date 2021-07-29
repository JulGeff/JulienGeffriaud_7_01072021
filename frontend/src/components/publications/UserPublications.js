
import React, { useEffect, useState } from 'react';
import Api from '../utils/Api'
import '../../styles/style.css'
import { Link } from 'react-router-dom';


function UserPublications() {
  
    //DECALARATION DES VARIABLES ET INITIALISATION DU STATE    
    const userId = window.location.href.split('=')[1];
    const [userPublications, setUserPublications] = useState([]); //initialisation du state vide   
    const [firstName, setFirstName] = useState("")
    var jwt = require('jsonwebtoken');
    let token = localStorage.getItem('user')
    let userInfo = jwt.decode(token)
    const [user, setUser] = useState(userInfo)

    // RECUPERATION DES PUBLICATIONS DU USER STOCKEES DANS LA BDD
    useEffect(() => {
      const userId = user.id
      let token = localStorage.getItem('user')
     
        Api.get('/publication/user', 
        {   headers: {
            'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
        },
            params : {userId : userId}
      
        }) //requête GET via Axios
        .then(function (response)  {
            const userPublications = response.data;
            setUserPublications(userPublications);
            setFirstName(userPublications[0].user.firstName)
            
          })
          .catch(function (response) { // Si erreur
            console.log(response);
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
            window.location.reload(false) 
            alert ('Votre publication a bien été supprimée')              
      
          })
          .catch(function (response) { // Si erreur
          console.log(response);
          });
          }

 

    return (
      <div className = "userpublications">
         
          {userPublications.length? (
            <div >
               <h1>Dernières publications de {firstName}</h1>
              {userPublications.map((item,i) => 
              <div className = "userpublications__display" key={i}>
               <Link to={"./publication?id=" + item.id}  className='userpublications__display__link'>
                    <div className = "userpublications__display__link__content" >
                        <h2>{item.title}</h2>
                        <p className='userpublications__display__link__content__subtitle'>Publié le {item.updatedAt.substring(9,10).padStart(2, '0')}/{item.updatedAt.substring(6,7).padStart(2, '0')}/{item.updatedAt.substring(0,4)} à {item.updatedAt.substring(11,16)}   </p>
                        <p>{item.content}</p>

                       
                    </div>
                </Link>

                {/* si user connecté est l'auteur de la publication, on affiche un lien pour l'éditer*/}    
                {userId===user.id
                  ? (<Link to={"/forum/editpublication?id=" + item.id} className = "userpublications__display__link__content__edit">
                    <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#E02F04" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                    </Link>) 
                  : ('')}  

                {/* si user connecté est l'auteur de la publication ou admin, on affiche un lien pour la supprimer*/} 
                { userId===user.id || user.isAdmin
                ? ( 
                <svg onClick = {e => {if (window.confirm('Etes-vous sûr·e de vouloir supprimer cette publication ?')) handleDelete(e, item.id)}} className =  "userpublications__display__link__content__delete" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                 ) : ('')}
              </div>
                )} 
            </div> 
            ) : (
              <div className = "userpublications__none">
            <p>Aucune publication !</p>
            <Link to={"./"} className = "userpublications__none__link"><p>Aller au forum</p></Link>
            </div>
            
          )}
      </div>
    );
  };
  
export default UserPublications


