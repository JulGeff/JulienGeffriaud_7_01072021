
import React, { useEffect, useState } from 'react';
import Api from './Api'
import '../styles/Forum.css'
import { Redirect } from 'react-router-dom';


function Forum({loggedIn}) {

    const [forum, setForum] = useState([]); //initialisation du state vide   
    const [title, setTitle] = useState(""); //initialisation du state vide
    const [content, setContent] = useState(""); //initialisation du state vide
    const [comment, setComment] = useState(""); //initialisation du state vide
  
    useEffect(() => {
      let token = localStorage.getItem('token')

        Api.get('/publication', 
        {   headers: {
          'Authorization': `${token}` // On sécurise la requête en incluant le token dans les headers (cf middleware "auth")
        }}) //requête GET via Axios
        .then(function (response)  {
            const forum = response.data;
            setForum(forum);
            console.log(forum)
          })
          .catch(function (response) { // Si erreur
            console.log("pb frontend", response.data);
            });
            }
      , [])

      if (!loggedIn) {
        return <Redirect to="/"/>
        }

        // PUBLICATION DES ARTICLES
        const handleSubmit = (event) => {  // Au clic sur le bouton "Publier !"
          event.preventDefault();
    
         
         if(title === null || title === '' || content === null || content === '') {  // On vérifie que les champs
                 return event.status(400).json({'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article"});
    
          } else {
            
                 
              let publicationData = { 
                  title : title,
                  content : content,
              };
    
              console.log(publicationData);
    
              Api.post('/publication', publicationData) //requête POST via Axios
    
                  .then(function (response) {  //Si Ok
                  console.log(response);
                  setForum(forum.push(publicationData));
                  setTitle('');
                  setContent('');
                  alert("Votre publication a bien été postée !")
                  })
                  .catch(function (response) { // Si erreur
                  console.log("pb frontend", response.data);
                  });
    
          }
    }

    
  // PUBLICATION DES COMMENTAIRES
    const handleCommentSubmit = (event) => {  // Au clic sur le bouton "Publier !"
      event.preventDefault();
      console.log(comment)

    }

    return (
      <div className='forum_global'> 
   
      <h1>Partagez vos pensées avec vos collègues !</h1>
      <form className="forum" onSubmit={handleSubmit}>
     
              <input  id='title' 
                      className="input" 
                      type="string" 
                      name="title" 
                      placeholder="Titre" 
                      maxLength="50" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      required 
              />

              <textarea  
                      id='content' 
                      className="input" 
                      type="string" 
                      name="content" 
                      placeholder="Rédigez votre publication ici" 
                      maxLength="500" 
                      rows={10}
                      cols={5}
                      value={content} 
                      onChange={e => setContent(e.target.value)} 
                      required
              />


              <input  className="button" 
                      type="submit" 
                      value="Publier !" 
              />
      </form>

            <h1>Publications du forum les plus récentes</h1>
            <div >
                        {forum.map((item,i) => 
                        
                            <div className="forum" key={i}>
                                <h2>{item.title}</h2>
                                <h3>Auteur·rice : A INTEGRER </h3>
                                <p>{item.content}</p>

                                <div className = "comments"> 
                              <form onSubmit={handleCommentSubmit}>
        
                                  <textarea  id='comment' 
                                          className="input" 
                                          name="comment" 
                                          placeholder="Commentez cette publication..." 
                                          maxLength="200" 
                                          value={title} 
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
                            )}
                         
            </div>    
         </div>
        
    );
  };
  
export default Forum


