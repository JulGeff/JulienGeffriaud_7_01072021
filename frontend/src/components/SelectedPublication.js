
import React, { useEffect, useState } from 'react';
import Api from './Api'
import '../styles/style.css'
import { Redirect, Link, useHistory } from 'react-router-dom';


function SelectedPublication({loggedIn}) {

  const PublicationId = window.location.href.split('=')[1];
    const [selectedPublication, setSelectedPublication] = useState(""); //initialisation du state vide   
    const [comment, setComment] = useState(""); //initialisation du state vide
    const [commentList, setCommentlist] = useState([]); //initialisation du state vide
    let token = localStorage.getItem('token')
    let history = useHistory();
    let userId = JSON.parse(localStorage.getItem("id"))
    let isAdmin = JSON.parse(localStorage.getItem('isAdmin'))

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

        //SUPPRESSION D'UNE PUBLICATION
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
            history.push("/forum")
          })
          .catch(function (response) { // Si erreur
          console.log("Erreur", response);
          });
          }

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
              window.location.reload(false)  
              setComment('');
              alert("Votre commentaire a bien été posté !")
              })
              .catch(function (response) { // Si erreur
              console.log("pb frontend", response.data);
              });
      }
    }

    const handleDeleteComment = (e, id) => { //Quand on clique sur "Supprimer le commentaire"
      e.preventDefault();

      Api.delete('comment', {                  
        headers: {
            'Authorization': `${token}` //On sécurise la requête avec le token
        },
        params: { // On envoie l'id du comment dans les paramètres de la requête
          id : id
         },
      }) 
 
      .then(function (response) {
        window.location.reload(false)
        alert ('Votre commentaire a bien été supprimé')
      })
      .catch(function (response) { // Si erreur
      console.log("Erreur", response);
      });
      }


    return (
      <div className='publication'>          
        <h1 >{ selectedPublication.title }</h1>
        {selectedPublication? (
        <p className='publication__subtitle'>Publié par numéro { selectedPublication.userId } le {selectedPublication.createdAt.substring(9,10).padStart(2, '0')}/{selectedPublication.createdAt.substring(6,7).padStart(2, '0')}/{selectedPublication.createdAt.substring(0,4)} à {selectedPublication.createdAt.substring(11,16)}</p>)
        :( <p className='publication__subtitle'>Publié par numéro { selectedPublication.userId }</p>)}
        <Link to={"./userpublications?id=" + selectedPublication.userId} className='publication__link'>
          <p className='publication__link__user'>Voir toutes les publications de numéro { selectedPublication.userId }</p>
        </Link>
        <p className = 'publication__content'>{ selectedPublication.content }</p>
        {selectedPublication.userId===userId || isAdmin
                ? (<div className = "publication__delete" onClick = {e => handleDelete(e, selectedPublication.id)} >
                     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                  </div>) 
                : ('')}

        <div className = "publication__comments"> 
          <form className = "publication__comments__form" onSubmit={handleSubmit}>
            <textarea id='comment' 
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
            <div className="publication__displaycomments__list__text" >
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg> 
              <h3><strong>{item.userId}</strong> dit :</h3>
              <h3>{item.comment}</h3>
            </div>  
            <div className="publication__displaycomments__list__info" >
              <p>publié  le {item.createdAt.substring(9,10).padStart(2, '0')}/{item.createdAt.substring(6,7).padStart(2, '0')}/{item.createdAt.substring(0,4)} à {item.createdAt.substring(11,16)}</p>
          
              {item.userId===userId || isAdmin
                ? (<div  onClick = {e => handleDeleteComment(e, item.id)} >
                    <svg className = "publication__displaycomments__list__delete" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                </div>) 
                : ('')}
            </div>
          </div>
              )}  
      </div>
    </div>
    );
  };
  
export default SelectedPublication


