
import React, { useEffect, useState } from 'react';
import Api from './Api'
import '../styles/SelectedPublication.css'
import { Redirect } from 'react-router-dom';


function SelectedPublication({loggedIn}) {

    const PublicationId = window.location.href.split('=')[1];
    console.log(PublicationId)
    const [selectedPublication, setSelectedPublication] = useState(""); //initialisation du state vide   
    const [comment, setComment] = useState(""); //initialisation du state vide
    const [commentList, setCommentlist] = useState([]); //initialisation du state vide

    useEffect(() => {
      
      let token = localStorage.getItem('token')
      // RECUPERATION DE LA PUBLICATION SELECTIONNEE DEPUIS LA BDD
        Api.get('/publication',    //requête GET via Axios
        {   headers: {
          'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
        },
            params : {publicationId : PublicationId} //

      })
        .then(function (response)  {
          
            console.log(response)
          })
          .catch(function (response) { // Si erreur
            console.log("pb frontend", response.data);
            });
            }
      , [])



      if (!loggedIn) {
        return <Redirect to="/"/>
        }

        
      
  // PUBLICATION DES COMMENTAIRES
    const handleSubmit = (event) => {  // Au clic sur le bouton "Publier !"
      event.preventDefault();
      let token = localStorage.getItem('token')
     
     if(comment === null || comment === '') {  // On vérifie que le commentaire n'est pas vide
             return event.status(400).json({'error': "Veuillez écrire un commentaire"});

      } else {
        
          let commentData = { 
              comment : comment,
              publicationId : PublicationId
 
          };

          console.log(commentData);

          Api.post(
              '/comment', commentData,
              {headers: {
                'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
              }}
         ) //requête POST via Axios

              .then(function (response) {  //Si Ok
              console.log(response);
              //setCommentList(commentList.push(commentData));
              setComment('');
              alert("Votre commentaire a bien été posté !")
              })
              .catch(function (response) { // Si erreur
              console.log("pb frontend", response.data);
              });

      }

    }

    return (
      <div className='forum_global'> 
      
        
                     
                        
                         
                                <h2>TITRE A INTEGRER</h2>
                                <h3>Auteur·rice : A INTEGRER </h3>
                                <p>PublicationId : A INTEGRER</p>
                                <p>A INTEGRER</p>

                            <div className = "comments"> 
                              <h3>Commentaires</h3>
                              <form onSubmit={handleSubmit}>
        
                                <textarea id='comment' 
                                          className="input" 
                                          name="comment" 
                                          placeholder="Commentez cette publication..." 
                                          minLength="2"
                                          maxLength="200" 
                                          value={comment} 
                                          onChange={e => setComment(e.target.value)} 
                                          required 
                                  />

                                  <input  className="button" 
                                          type="submit" 
                                          value="Publier !" 
                                  />
                              </form>
                          </div>
                            </div>
                            
                         
        
        
        
    );
  };
  
export default SelectedPublication


