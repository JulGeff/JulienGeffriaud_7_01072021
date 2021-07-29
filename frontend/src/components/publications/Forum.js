
import React, { useEffect, useState } from 'react';
import Api from '../utils/Api'
import '../../styles/style.css'
import { Link } from 'react-router-dom';


function Forum() {

  
    //DECALARATION DES VARIABLES ET INITIALISATION DU STATE
    const [isLoading, setIsLoading] = useState(true);  
    const [forum, setForum] = useState([]);     //initialisation du state vide   
    const [title, setTitle] = useState("");     //initialisation du state vide
    const [content, setContent] = useState(""); //initialisation du state vide
    var jwt = require('jsonwebtoken');          //On importe jsonwebtoken
    let token = localStorage.getItem('user')    //On récupère le token dans le local storage
    let userInfo = jwt.decode(token)            //On décode le token avec jsonwebtoken
    const [user, setUser] = useState(userInfo)  //On iitialise le state avec le token décodé (contentenant email, id et isAdmin)

    // RECUPERATION DES PUBLICATIONS STOCKEES DANS LA BDD
    useEffect(() => {
      
      let token = localStorage.getItem('user')
     
        Api.get('/publication', 
        {   headers: {
          'Authorization': `Bearer ${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
        }}) //requête GET via Axios
        .then(function (response)  {
            setForum(response.data); // On met le state à jour avec le contenu de la réponse du serveur
            setIsLoading(false);
  
          })
          .catch(function (response) { // Si erreur
            console.log(response);
            });
            }
      , [])

       //Message d'attente en attendant la fin de la requête axios    
       if (isLoading) {
        return <div className="App">Loading...</div>;
      }


      // SUPPRESSION D'UNE PUBLICATION
      const handleDelete = (e, id) => { //Quand on clique sur "Supprimer ma publication"
        e.preventDefault();

        Api.delete('/publication', {                  
          headers: {
            'Authorization': `Bearer ${token}` //On sécurise la requête avec le token
          },
          params: { // On envoie l'id de la publication dans les paramètres de la requête
            id : id
           },
        }) 
   
        .then(function (response) {
          window.location.reload(false)
    
        })
        .catch(function (response) { // Si erreur
        console.log(response);
       
        });
        }


        // PUBLICATION D'UN ARTICLE
        const handleSubmit = (event) => {  // Au clic sur le bouton "Publier !"
          event.preventDefault();
            let token = localStorage.getItem('user')
         
         if(title === null || title === '' || content === null || content === '') {  // On vérifie que les champs ne sont pas nuls
                 return event.status(400).json({'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article"});
    
          } else {
            
              let publicationData = { 
                  title : title,
                  content : content,
                  id : user.id
              };
    
              Api.post(
                  '/publication', publicationData,
                  {headers: {
                    'Authorization': `Bearer ${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
                  }}
             ) //requête POST via Axios
    
                  .then(function (response) {  //Si Ok
                  setTitle('');
                  setContent('');
                  alert("Votre publication a bien été postée !")
                  window.location.reload(false)
                  })
                  .catch(function (response) { // Si erreur
                  console.log(response);
                  });
    
          }
    }


    return (
      <div className='forum'> 
        <div className = "forum__createpost">
          <h1>Partagez vos pensées avec vos collègues !</h1>
          <form onSubmit={handleSubmit} >
        
                  <input  className="forum__createpost__title"  
                          type="string" 
                          name="title" 
                          placeholder="Titre" 
                          minLength="2"
                          maxLength="50" 
                          value={title} 
                          onChange={e => setTitle(e.target.value)} //Si la valeur change on met à jour la variable title
                          required 
                  />

                  <textarea  
                          
                          type="string" 
                          className="forum__createpost__content"  
                          placeholder="Rédigez votre publication ici" 
                          minLength="2"
                          maxLength="1000" 
                          rows={10}
                          cols={5}
                          value={content} 
                          onChange={e => setContent(e.target.value)} //Si la valeur change on met à jour la variable content
                          required
                  />


                  <input  className="forum__createpost__button" 
                          type="submit" 
                          value="Publier !" 
                  />
          </form>
        </div>


        <div className = "forum__displayposts">  
              
              <h1>Publications les plus récentes</h1>

               {forum.length? ( // Si array des publications non vide
                  <div >
                    {forum.map((item,i) => // On récupère les items du array généré par la requête get (variable forum)
                   
                    <div key={i} className = "forum__displayposts__content">
                        <Link to={"/forum/publication?id=" + item.id}  className = "forum__displayposts__content__link">
                            <div>
                                <h2>{item.title}</h2>
                                <p className='forum__displayposts__content__link__subtitle'> Publié par <strong>{item.user.firstName} {item.user.lastName}</strong> le {item.updatedAt.substring(9,10).padStart(2, '0')}/{item.updatedAt.substring(6,7).padStart(2, '0')}/{item.updatedAt.substring(0,4)} à {item.updatedAt.substring(11,16)}</p>
                                <p className='forum__displayposts__content__link__text'>{item.content}</p>
                            </div>                     
                        </Link>

                         {/* si user connecté est l'auteur de la publication ou admin, on affiche un lien pour la supprimer*/}          
                         {item.userId===user.id || user.isAdmin   
                          ? (
                            <div className = "forum__displayposts__content__link__delete" onClick = {e => {if (window.confirm('Etes-vous sûr·e de vouloir supprimer cette publication ?')) handleDelete(e, item.id)}} >       
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                            </div>) 
                          : ('')}
                      
                        {/* si user connecté est l'auteur de la publication, on affiche un lien pour l'éditer*/}    
                        {item.userId===user.id
                          ? (<Link to={"/forum/editpublication?id=" + item.id} className = "forum__displayposts__content__link__edit">
                            <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#E02F04" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                            </Link>) 
                          : ('')} 
                        </div >   
                        )}  
                  </div>   
                 ) : ( // Si base de données retourne un array de publications vide
                    <p className='forum__displayposts__empty'>
                      Il n'y a pas publications pour le moment.<br/>
                      Rédigez le premier article du forum !</p>
                )} 
        </div>
  </div>
        
    );
  };
  
export default Forum


