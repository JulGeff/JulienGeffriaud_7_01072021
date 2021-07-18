


import React, { Component } from "react";
import Signup from "./auth/Signup"
import Login from "./auth/Login"

import Api from './Api'





function Home() {


    
      return (
      <div>
        <h1>Bienvenue sur le réseau interne Groupomania</h1>
        <Signup handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />

      </div> 
      
      )
  }

  export default Home


  /*
 constructor (props) {
      super(props)
      this.state = {
          content : ""

      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)

    }
      
  handleChange(event){
     this.setState({

      [event.target.name] : event.target.value

     })
  }
    
  handleSubmit(event){
          event.preventDefault();

            let contentFormData = { 
              content : this.state.content
          };

          console.log(contentFormData);

          Api.post('/auth/post', contentFormData) //requête POST via Axios

              .then(function (response) {  //Si Ok
                console.log(response);
              })
              .catch(function (response) { // Si erreur
              console.log(response);
              });
      }



   <div className='post'> 
        <h1>Dernières publications de l'équipe Groupomania</h1>
        <h2>Status : {this.props.loggedInStatus}</h2>
   
        <form id="postForm" onSubmit={this.handleSubmit}>
        <label>
          Quoi de neuf ?
        </label>
            <textarea
          type="text" 
          name="content"   
          placeholder="Rédigez votre publication ici" 
          value={this.state.content} 
          onChange={this.handleChange} 
          required 
          rows={5}
          cols={5}
          maxLength="500"
        />
            <input  className="button" type="submit" value="Publiez" />
        </form>
    </div>   

    */