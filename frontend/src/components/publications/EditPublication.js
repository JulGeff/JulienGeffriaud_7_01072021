
import React, { useEffect, useState } from 'react';
import Api from '../utils/Api'
import '../../styles/style.css'
import { Link, useHistory } from 'react-router-dom';


function EditPublication() {


    //DECALARATION DES VARIABLES ET INITIALISATION DU STATE
    let history = useHistory();
    const publicationId = window.location.href.split('=')[1];
    const [isLoading, setIsLoading] = useState(true);  
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    var jwt = require('jsonwebtoken');
    let token = localStorage.getItem('user')
    let userInfo = jwt.decode(token)
    const [user, setUser] = useState(userInfo)

    // RECUPERATION DE LA PUBLICATION SELECTIONNEE DEPUIS LA BDD
    useEffect(() => {
        const PublicationId = window.location.href.split('=')[1];
        let token = localStorage.getItem('user')
      
          Api.get('/publication/selected',    //requête GET via Axios
          {   headers: {
            'Authorization': `Bearer ${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
          },
              params : {publicationId : PublicationId} //
  
        })
          .then(function (response)  {
            setTitle(response.data.title); // On met le state à jour avec le contenu de la réponse du serveur
            setContent(response.data.content); // On met le state à jour avec le contenu de la réponse du serveur
            setIsLoading(false); 
            
            })
            .catch(function (response) { // Si erreur
              console.log("pb frontend", response.data);
              });
              }
        , [])


        //Message d'attente en attendant la fin de la requête axios    
        if (isLoading) {
          return <div className="App">Loading...</div>;
        }

        // VALIDATION DES MODIFICATIONS
        const handleSubmit = (event) => { //Quand on clique sur "Supprimer"
          event.preventDefault();
        
          let publicationData = { 
            title : title,
            content: content,
            publicationId: publicationId,
            id : user.id
          };

          Api.put(
            '/publication', publicationData,
            {headers: {
              'Authorization': `Bearer ${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
            }}
        ) //requête POST via Axios

            .then(function (response) {  //Si Ok
            console.log(response);
            alert("Votre publication a bien été mise à jour !");
            history.push("./")
            
            })
            .catch(function (response) { // Si erreur
            console.log(response);
            });
          }


    return (
  
        <div className = "editpost">
           <Link to={"./publication?id=" + publicationId} className='editpost__back' >
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg>
            </Link>
          <h1>Modifiez votre publication</h1>
          <form  className = "editpost__form" onSubmit={handleSubmit} >
        
                  <input  className="editpost__form__title"  
                          type="string" 
                          name="title" 
                          minLength="2"
                          maxLength="50" 
                          value={title} 
                          onChange={e => setTitle(e.target.value)} 
                          required 
                  />

                  <textarea  
                          
                          type="string" 
                          className="editpost__form__content"  
                          minLength="2"
                          maxLength="1000" 
                          rows={10}
                          cols={5}
                          value={content} 
                          onChange={e => setContent(e.target.value)} 
                          required
                  />


                  <input  className="editpost__form__button" 
                          type="submit" 
                          value="Publier !" 
                  />
          </form>
        </div>
        )
    };
    
  export default EditPublication