
import React, { useEffect, useState } from 'react';
import Api from './Api'
import '../styles/style.css'
import { Redirect, Link } from 'react-router-dom';


function Forum({loggedIn}) {

    const [forum, setForum] = useState([]); //initialisation du state vide   
    const [title, setTitle] = useState(""); //initialisation du state vide
    const [content, setContent] = useState(""); //initialisation du state vide
    let userId = JSON.parse(localStorage.getItem("id")) 
    let token = localStorage.getItem('token')
    let isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  

     // RECUPERATION DES PUBLICATIONS STOCKEES DANS LA BDD

    useEffect(() => {
      
      let token = localStorage.getItem('token')
     
        Api.get('/publication', 
        {   headers: {
          'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
        }}) //requête GET via Axios
        .then(function (response)  {
            const forum = response.data;
            setForum(forum);
            console.log(forum);
          })
          .catch(function (response) { // Si erreur
            console.log("pb frontend", response.data);
            });
            }
      , [])


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
          console.log("Publication supprimée", response)  
         
    
        })
        .catch(function (response) { // Si erreur
        console.log("Erreur", response);
       
        });
        }

      if (!loggedIn) {
        return <Redirect to="/"/>
        }

        // PUBLICATION DES ARTICLES
        const handleSubmit = (event) => {  // Au clic sur le bouton "Publier !"
          event.preventDefault();
          let token = localStorage.getItem('token')
         
         if(title === null || title === '' || content === null || content === '') {  // On vérifie que les champs ne sont pas nuls
                 return event.status(400).json({'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article"});
    
          } else {
            
                 
              let publicationData = { 
                  title : title,
                  content : content,
              };
    
              console.log(publicationData);
    
              Api.post(
                  '/publication', publicationData,
                  {headers: {
                    'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
                  }}
             ) //requête POST via Axios
    
                  .then(function (response) {  //Si Ok
                  console.log(response);
                  //setForum(forum.push(publicationData));
                  setTitle('');
                  setContent('');
                  alert("Votre publication a bien été postée !")
                  })
                  .catch(function (response) { // Si erreur
                  console.log("pb frontend", response.data);
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
                          onChange={e => setTitle(e.target.value)} 
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
                          onChange={e => setContent(e.target.value)} 
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
                    {forum.map((item,i) => 
                   
                    <div key={i} className = "forum__displayposts__content">
                        <Link to={"./forum/publication?id=" + item.id}  className = "forum__displayposts__content__link">
                            <div>
                                <h2>{item.title}</h2>
                                <p className='forum__displayposts__content__link__subtitle'> Publié par <strong>{item.userId}</strong> le {item.createdAt.substring(9,10).padStart(2, '0')}/{item.createdAt.substring(6,7).padStart(2, '0')}/{item.createdAt.substring(0,4)} à {item.createdAt.substring(11,16)}   </p>
                                <p className='forum__displayposts__content__link__text'>{item.content}</p>
                            </div>                     
                        </Link>
                      
                        {/* si user connecté est l'auteur de la publication, on affiche un lien pour la supprimer*/}           
                        {item.userId===userId || isAdmin   
                        ? (
                          <div className = "forum__displayposts__content__link__delete" onClick = {e => handleDelete(e, item.id)} >       
                              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#E02F04" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                          </div>) 
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


