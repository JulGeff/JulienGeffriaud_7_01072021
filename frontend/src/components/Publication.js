import '../styles/LoginSignup.css'
import React from "react";
import { Redirect } from 'react-router-dom';
import Api from './Api'

function Publication({authorized}) {
   
    const [title, setTitle] = React.useState(""); //initialisation du state vide
    const [content, setContent] = React.useState(""); //initialisation du state vide
  
    if (!authorized) {
        return <Redirect to="/"/>
        }
        
    const handleSubmit = (event) => {
        event.preventDefault();

       
       if(title === null || title === '' || content === null || content === '') {
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
                })
                .catch(function (response) { // Si erreur
                console.log("pb frontend", response.data);
                });

        }
}
        


    return (
        <div className='loginsignup'> 
   
        <h1>Partagez vos pensées avec vos collègues !</h1>
        <form className="publicationForm" onSubmit={handleSubmit}>
       
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

    </div>
    );
  }
  
export default Publication



