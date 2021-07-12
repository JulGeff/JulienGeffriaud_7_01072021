
import '../styles/Post.css'
import React from "react";
import Api from './Api'


function Post() {
    const [text, setText] = React.useState("");       //initialisation du state vide
    const [attachment, setAttachment] = React.useState(""); //initialisation du state vide
  
    const handlePost = (event) => {
        event.preventDefault(); 
        let postData = { text : text, attachment: attachment };
        console.log(postData);
         Api.post('/forum', postData)  //requête POST via Axios

            .then(function (response) { //Si Ok
              console.log(response);
            })
            .catch(function (response) { //Si erreur
              console.log(response);
            });

        } 


    return (
        <div className='post'> 
        <form id="postForm" onSubmit={handlePost}>
            <label>Quoi de neuf ?
                <input id="text" className="input" type="text" name="text" value={text} onChange={e => setText(e.target.value)}/>
            </label>
            <label>URL de l'image
                <input id="url" className="input" type="url" name="url" value={attachment} onChange={e => setAttachment(e.target.value)}/>
            </label>
            <input  className="button" type="submit" value="Publiez" />
        </form>
    </div>   
    );
  }
  
export default Post