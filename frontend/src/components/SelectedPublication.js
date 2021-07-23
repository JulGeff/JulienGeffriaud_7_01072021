
import React, { useEffect, useState } from 'react';
import Api from './Api'
import '../styles/style.css'
import { Redirect, Link } from 'react-router-dom';


function SelectedPublication({loggedIn}) {

  const PublicationId = window.location.href.split('=')[1];
    const [selectedPublication, setSelectedPublication] = useState(""); //initialisation du state vide   
    const [comment, setComment] = useState(""); //initialisation du state vide
    const [commentList, setCommentlist] = useState([]); //initialisation du state vide


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
           
          })
          .catch(function (response) { // Si erreur
            console.log("pb frontend", response.data);
            });
            }
      , [])

      // RECUPERATION DE TOUS LES COMMENTAIRES ASSOCIES A LA PUBLICATION
      useEffect(() => {
       const PublicationId = window.location.href.split('=')[1];
        let token = localStorage.getItem('token')
       
          Api.get('/comment', 
          {   headers: {
            'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
          },
          params : {publicationId : PublicationId} 
        
        
        }) //requête GET via Axios
          .then(function (response)  {
              const commentList = response.data;
              setCommentlist(commentList);
              console.log(commentList[0])
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
        <h2>{ selectedPublication.title }</h2>
        <h3>Auteur·rice : ID = { selectedPublication.userId } </h3>
        <Link to={"./userpublications?id=" + selectedPublication.userId}>
          <h3>Voir toutes les publications de { selectedPublication.userId }</h3>
        </Link>
        <p>{ selectedPublication.content }</p>

        <div className = "comments__create"> 
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
      <div className = "comments__display">
      {commentList.map((item,i) => 
      
                      <div className="commentList" key={i}>
                          <h3>Commentaire publié par : "User ID = {commentList[i].userId}" le {commentList[i].createdAt.slice(9,10).padStart(2, '0')}/{commentList[i].createdAt.slice(6,7).padStart(2, '0')}/{commentList[i].createdAt.slice(0,4)} à {commentList[i].createdAt.slice(11,16)}           
                          </h3>
                          <h2>{commentList[i].comment}</h2>


                      </div>
                  )}  
      </div>

    </div>
                            
                         
        
        
        
    );
  };
  
export default SelectedPublication


