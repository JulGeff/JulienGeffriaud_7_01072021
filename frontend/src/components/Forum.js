
import React, { useEffect, } from 'react';
import Api from './Api'
import '../styles/Forum.css'
import { Redirect } from 'react-router-dom';


function Forum({loggedIn}) {

    const [forum, setForum] = React.useState([]); //initialisation du state vide   
  
    useEffect(() => {

        Api.get('/publication') //requête GET via Axios
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

    return (
        <div className='forum_global'> 
            <h1>Publications du forum les plus récentes</h1>
            <div >
                        {forum.map((item,i) => 
                            <div className="forum" key={i}>
                                <h2>{item.title}</h2>
                                <h3>Auteur·rice : A INTEGRER </h3>
                                <p>{item.content}</p>
                            </div>
                            )}
            </div>    
         </div>
        
    );
  };
  
export default Forum


