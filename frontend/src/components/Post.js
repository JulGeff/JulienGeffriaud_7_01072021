/*

import '../styles/Post.css'
import React from "react";
import Login from './Login'
import Api from './Api'


export default class Post extends Component {

  constructor (props) {
    super(props)

  }

  
render() {
  const [content, setContent] = React.useState("");       //initialisation du state vide
    
  
  const handlePost = (event) => {
      event.preventDefault(); 
      let postData = { content : content };
      console.log(postData);
       Api.post('/', postData)  //requête POST via Axios

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
        <h2>Statut : {this.props.loggedInStatus}</h2>
       
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
}

*/