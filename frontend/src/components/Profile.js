

/*import '../styles/Profile.css'
import React from "react";
import Api from './Api'


function Profile() {

    const [name, setName] = React.useState(""); //initialisation du state vide
    const [firstName, setFirstName] = React.useState(""); //initialisation du state vide
    const [email, setEmail] = React.useState(""); //initialisation du state vide
    const [isAdmin, setIsAdmin] = React.useState(""); //initialisation du state vide

    Api.get('auth/') 
    
        .then(function (response) {  //Si Ok
            console.log(response.data);
            return response.data;
            })

        .catch(function (response) { // Si erreur
            console.log(response);
        });
     
        let profileType = '';
        if (isAdmin) {
            profileType = "oui"
        } else {
            profileType = "non"
        }
    
  
    return (
        <div className='profile'>
            <h1> Votre profil</h1>
            <ul>
                <li> Nom : { name }</li>
                <li> Prénom : { firstName } </li>
                <li> Adresse email : { email } </li>
                <li> Accès administrateur : { profileType}</li>
            </ul>
        </div>

    );
  }
  
export default Profile

*/