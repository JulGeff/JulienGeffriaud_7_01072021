
import React, { useEffect, useState } from 'react';
import Api from '../utils/Api'
import '../../styles/style.css'
import { Redirect, Link } from 'react-router-dom';


let token = localStorage.getItem('token')

function EditPublication({loggedIn}) {
    // RECUPERATION DE LA PUBLICATION SELECTIONNEE DEPUIS LA BDD
    useEffect(() => {
        const PublicationId = window.location.href.split('=')[1];
        let token = localStorage.getItem('token')
      
          Api.get('/publication/selected',    //requête GET via Axios
          {   headers: {
            'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
          },
              params : {publicationId : PublicationId} //
  
        })
          .then(function (response)  {
            const publi = response.data;
            setSelectedPublication(publi);          
            setIsLoading1(false);
            })
            .catch(function (response) { // Si erreur
              console.log("pb frontend", response.data);
              });
              }
        , [])
    return (
  
        <div className = "editpost">
          <h1>Modifiez votre publication</h1>
          <form onSubmit={handleSubmit} >
        
                  <input  className="editpost__title"  
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
                          className="editpost__content"  
                          minLength="2"
                          maxLength="1000" 
                          rows={10}
                          cols={5}
                          value={content} 
                          onChange={e => setContent(e.target.value)} 
                          required
                  />


                  <input  className="editpost__button" 
                          type="submit" 
                          value="Publier !" 
                  />
          </form>
        </div>
        )
    };
    
  export default EditPublication