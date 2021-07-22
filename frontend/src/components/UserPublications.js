
import React, { useEffect, useState } from 'react';
import Api from './Api'
import '../styles/SelectedPublication.css'
import { Redirect, Link } from 'react-router-dom';


function UserPublications({loggedIn}) {

  const userId = window.location.href.split('=')[1];
  const [userPublications, setUserPublications] = useState([]); //initialisation du state vide   

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


      if (!loggedIn) {
        return <Redirect to="/"/>
        }


    return (
      <div>
          <h1>Dernières publications de USER ID = { userId }</h1>
          <div className = "comments__display">
            {userPublications.map((item,i) => 
              <Link to={"./publication?id=" + item.id} key={i}>
                  <div className="forum" key={i}>
                      <h2>{item.title}</h2>
                      <p>{item.content}</p>
                  </div>
              </Link>
              )}  
          </div>
      </div>
    );
  };
  
export default UserPublications


