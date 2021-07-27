
import React, { useEffect, useState } from 'react';
import Api from './Api'
import '../styles/style.css'
import { Redirect, Link } from 'react-router-dom';


let token = localStorage.getItem('token')

function UserPublications({loggedIn}) {

  const userId = window.location.href.split('=')[1];
  const [userPublications, setUserPublications] = useState([]); //initialisation du state vide   
  let isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  const [firstName, setFirstName] = useState("")


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
            setFirstName(userPublications[0].user.firstName)

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
           // setUserPublications(RemovebyAttr.removeByAttr(userPublications, 'id', id))      
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
         

          {userPublications.length? (
            <div >
               <h1>Dernières publications de {firstName}</h1>
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
                ? ( 
                <svg onClick = {e => handleDelete(e, item.id)} className =  "userpublications__display__link__content__delete" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
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


