
import React, { useEffect, useState } from 'react';
import Api from './utils/Api'
import '../styles/style.css'
import { Link } from 'react-router-dom';


function Directory() {
  

    const [directory, setDirectory] = React.useState([]); //initialisation du state vide
  
   
  var jwt = require('jsonwebtoken');
  let token = localStorage.getItem('user')
  let userInfo = jwt.decode(token)
  const [user, setUser] = useState(userInfo)
  const [isLoading, setIsLoading] = useState(true); 


  //RECUPERATION DES DONNEES UTILISATEURS
    useEffect(() => {
      let token = localStorage.getItem('user')

        Api.get('/auth/users',
        {   headers: {
            'Authorization': `${token}` // On sécurise la requête en incluant le token dnas les headers (cf middleware "auth")
        }}
        ) //requête GET via Axios
        .then(function (response)  {
            const directory = response.data.data;
            setDirectory(directory);
            setIsLoading(false);
          })
          .catch(function (response) { // Si erreur
            console.log(response);
            });
            }
      , [])

      //Message d'attente en attendnat la fin de la requête axios    
      if (isLoading) {
        return <div className="App">Loading...</div>;
      }

      //SUPPRESSION D'UN PROFIL PAR ADMINISTRATEUR·RICE
      const handleDelete = (event,id) => { //Quand on clique sur "Supprimer"
        event.preventDefault();
        Api.delete('/auth/user', {          
          headers: {
              'Authorization': `${token}` //On sécurise la requêyte avec le token
          },
          params: {id : id}
        }) 
   
        .then(function (response) {
          alert ('Le profil a bien été supprimé') 
          window.location.reload(false)   
            
        })
        .catch(function (response) { // Si erreur
        console.log(response);
        });
        }



    return (
        <div className="directory">
        <h1>Annuaire Groupomania</h1>
            <table>
                <thead>
                    <tr>
                        <td>Nom</td>
                        <td>Prénom</td>
                        <td>Contact</td>
                        <td>Publications</td>
                    </tr>
                </thead>
                <tbody>
                    {directory.map((item,i) => 
                        <tr key={i}>
                            <td>{item.lastName}</td>
                            <td>{item.firstName}</td>
                            <td><a href={"mailto:" + item.email}> <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#E02F04" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg></a></td>
                            <td><Link to={"/forum/userpublications?id=" + item.id}>
                               <div><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg></div>
                            </Link>  
                            </td>  
                            <td>
                            {user.isAdmin && !item.isAdmin
                              ? (<svg onClick = {e => {if (window.confirm('Etes-vous vraiment sûr·e de vouloir supprimer ce profil ?')) handleDelete(e, item.id)}} className="directory__userdelete" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>) 
                              : (' ')}           
                            </td>
          
                        </tr>)}
                </tbody>
            </table>
        </div>
);
  };
  
export default Directory


