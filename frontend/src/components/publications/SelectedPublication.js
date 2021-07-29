
import React, { useEffect, useState } from 'react';
import Api from '../utils/Api'
import '../../styles/style.css'
import { Link, useHistory } from 'react-router-dom';


function SelectedPublication() {


    //DECALARATION DES VARIABLES ET INITIALISATION DU STATE
    const PublicationId = window.location.href.split('=')[1];
    const [isLoading1, setIsLoading1] = useState(true); 
    const [isLoading2, setIsLoading2] = useState(true); 
    const [selectedPublication, setSelectedPublication] = useState(""); //initialisation du state vide   
    const [comment, setComment] = useState(""); //initialisation du state vide
    const [commentList, setCommentlist] = useState([]); //initialisation du state vide
    
    let history = useHistory();
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
          'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
        },
            params : {publicationId : PublicationId} //

      })
        .then(function (response)  {
          
          setSelectedPublication(response.data);          
          setIsLoading1(false);
          })
          .catch(function (response) { // Si erreur
            console.log(response);
            });
            }
      , [])

      // RECUPERATION DE TOUS LES COMMENTAIRES ASSOCIES A LA PUBLICATION
      useEffect(() => {
       const PublicationId = window.location.href.split('=')[1];
       let token = localStorage.getItem('user')
       
          Api.get('/comment', 
          {   headers: {
            'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
          },
          params : {publicationId : PublicationId} 
        
        
        }) //requête GET via Axios
          .then(function (response)  {
              const commentList = response.data;
              setCommentlist(commentList);
              setIsLoading2(false);
            })
            .catch(function (response) { // Si erreur
              console.log(response);
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
          console.log(response);
          });
          }


       //Message d'attente en attendnat la fin de la requête axios    
       if (isLoading1 || isLoading2) {
        return <div className="App">Loading...</div>;
      } 
      
  // PUBLICATION DES COMMENTAIRES
    const handleSubmit = (event) => {  // Au clic sur le bouton "Publier !"
      event.preventDefault();
      let token = localStorage.getItem('user')
     
     if(comment === null || comment === '') {  // On vérifie que le commentaire n'est pas vide
             return event.status(400).json({'error': "Veuillez écrire un commentaire"});

      } else {
        
          let commentData = { 
              comment : comment,
              publicationId : PublicationId
 
          };

          Api.post(
              '/comment', commentData,
              {headers: {
                'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
              }}
         ) //requête POST via Axios

              .then(function (response) {  //Si Ok
              window.location.reload(false)  
              setComment('');
              alert("Votre commentaire a bien été posté !")
              })
              .catch(function (response) { // Si erreur
              console.log(response);
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
      console.log(response);
      });
      }


    return (
      <div className='publication'>     
      <div className='publication__container'>     
        <h1 >{ selectedPublication.title }</h1>
     
        <p className='publication__subtitle'>Publié par <strong>{selectedPublication.user.firstName} {selectedPublication.user.lastName}</strong> le {selectedPublication.updatedAt.substring(9,10).padStart(2, '0')}/{selectedPublication.updatedAt.substring(6,7).padStart(2, '0')}/{selectedPublication.updatedAt.substring(0,4)} à {selectedPublication.updatedAt.substring(11,16)}</p>
        <Link to={"./userpublications?id=" + selectedPublication.userId} className='publication__link'>
          <p className='publication__link__user'> Voir toutes les publications de {selectedPublication.user.firstName} </p>
        </Link>
        <p className = 'publication__content'>{ selectedPublication.content }</p>
        <div className = 'publication__icons'>
          
          {/* si user connecté est l'auteur de la publication, on affiche un lien pour l'éditer*/}
          {selectedPublication.userId===user.id
                  ? (<Link to={"/forum/editpublication?id=" + selectedPublication.id} className = "publication__icons__edit">
                    <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#E02F04" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                    </Link>) 
                  : ('')}  

          {/* si user connecté est l'auteur de la publication ou admin, on affiche un lien pour la supprimer*/} 
          {selectedPublication.userId===user.id || user.isAdmin
                  ? (<div className = "publication__icons__delete" onClick = {e => {if (window.confirm('Etes-vous sûr·e de vouloir supprimer cette publication ?')) handleDelete(e, selectedPublication.id)}} >
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                    </div>) 
                  : ('')}
        </div>
        </div>    
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
              <h3><strong>{item.user.firstName} {item.user.lastName}</strong> dit :</h3>
              <h3>{item.comment}</h3>
            </div>  
            <div className="publication__displaycomments__list__info" >
              <p>publié  le {item.updatedAt.substring(9,10).padStart(2, '0')}/{item.updatedAt.substring(6,7).padStart(2, '0')}/{item.updatedAt.substring(0,4)} à {item.updatedAt.substring(11,16)}</p>
              
              {/* si user connecté est l'auteur du commentaire ou admin, on affiche un lien pour le supprimer*/} 
               {item.userId===user.id || user.isAdmin
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


