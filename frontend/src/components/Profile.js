import React from "react";

const Profile = props => {

    return (
        <div>
            <h1>Votre profil</h1>
            <p>Statut : {props.loggedInStatus}</p>
            <p>User info : {props.user} </p>
           
            <p>Modifier mes informations</p>

        </div>


    )

}


export default Profile;