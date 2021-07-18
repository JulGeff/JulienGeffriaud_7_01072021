import loginpic from "../../assets/login-image.png";
import '../../styles/LoginSignup.css'
import React, { Component } from "react";
import {
    Link,
  } from "react-router-dom";
import Api from '../Api'


export default class ProfileUpdate extends Component {

    constructor (props) {
        super(props);
        this.state = {
            firstName : "",
            lastName : ""

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

            let profileData = { 
                firstName : this.state.firstName, 
                lastName : this.state.lastName
            };

            console.log(ProfileData);

            Api.post('/profile', profileData) //requête POST via Axios

                .then(function (response) {  //Si Ok
                console.log(response.data.logged_in);
                if (response.data.logged_in){
                    this.props.handleSuccessfulAuth(response.data)
                    console.log("props OK!!!")}
                })
                .catch(function (response) { // Si erreur
                console.log(response);
                });
        }

    render () {
      
        return (
            <div className='loginsignup'> 
            <h1>Modifiez votre profil</h1>
            <form id ='updateProfileForm' className="profileform" onSubmit={this.handleSubmit}>
           
            <input  id='firstName' 
                            className="input" 
                            type="string" 
                            name="firstName" 
                            placeholder="Prénom" 
                            maxLength="40" 
                            value={this.state.firstName} 
                            onChange={this.handleChange} 
                            required 
                    />

                    <input  id='lastName' 
                            className="input" 
                            type="string" 
                            name="lastName" 
                            placeholder="Nom" 
                            maxLength="40" 
                            value={this.state.lastName} 
                            onChange={this.handleChange} 
                            required
                    />

                    <input  className="button" 
                            type="submit" 
                            value="Je valide les modifications" 
                    />
            </form>
        </div>
        
        )
    }}
