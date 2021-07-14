
import '../styles/Post.css'
import React from "react";
import Api from './Api'


function Post() {
    const [content, setContent] = React.useState("");       //initialisation du state vide
    
  
    const handlePost = (event) => {
        event.preventDefault(); 
        let postData = { content : content };
        console.log(postData);
         Api.post('/auth/login', postData)  //requête POST via Axios

            .then(function (response) { //Si Ok
              console.log(response);
              
            })
            .catch(function (response) { //Si erreur
              console.log(response);
            });

        } 


    return (
        <div className='post'> 
        <h1>Dernières publications de l'équipe Groupomania</h1>
       
        <form id="postForm" onSubmit={handlePost}>
        <label>
          Quoi de neuf ?
        </label>
            <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={5}
          cols={5}
        />
            <input  className="button" type="submit" value="Publiez" />
        </form>
    </div>   
    );
  }
  

  // AJOUT REQUETE GET POUR FFICHER TOUS LES MESSAGES DANS L'ORDRE
export default Post