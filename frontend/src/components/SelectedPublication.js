
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
      <div className='publication'>          
        <h1 >{ selectedPublication.title }</h1>
        <p className='publication__subtitle'>Publié par numéro { selectedPublication.userId } le INTEGRER DATES </p>
        <Link to={"./userpublications?id=" + selectedPublication.userId} className='publication__link'>
          <p className='publication__link__user'>Voir toutes les publications de numéro { selectedPublication.userId }</p>
        </Link>
        <p className = 'publication__content'>{ selectedPublication.content }</p>

        <div className = "publication__comments"> 
          <form className = "publication__comments__form" onSubmit={handleSubmit}>
            <textarea id='comment' 
                      className ="publication__comments__form__box" 
                      name="comment" 
                      placeholder="Commentez cette publication..."
                      minLength="2"
                      maxLength="200" 
                      rows={3}
                      value={comment} 
                      onChange={e => setComment(e.target.value)} 
                      required 
              />

              <input  className="publication__comments__form__button" 
                      type="submit" 
                      value="Publier !" 
              />
          </form>
      </div>
      <div className = "publication__displaycomments">
        <h2>Commentaires</h2>
        {commentList.map((item,i) => 
          <div className="publication__displaycomments__list" key={i}>

              <h3><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg> 
              {commentList[i].comment}</h3>
              <p>publié par numéro <strong>{commentList[i].userId}</strong> le {commentList[i].createdAt.substring(9,10).padStart(2, '0')}/{commentList[i].createdAt.substring(6,7).padStart(2, '0')}/{commentList[i].createdAt.substring(0,4)} à {commentList[i].createdAt.substring(11,16)}</p>
          </div>
              )}  
      </div>
    </div>
                            
                         
        
        
        
    );
  };
  
export default SelectedPublication


