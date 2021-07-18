import Banner from "./Banner";
import Home from './Home'
import Profile from './Profile'
import Forum from './Profile'
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from "react-router-dom";
import React, { Component } from 'react'
import Api from './Api'

function App() {

     
        return (
          <div>
             
            <Router>
            <Banner />
                <Switch>
                  <Route exact path={"/"} >
                     
                      <Home />
                  </Route>

                  <Route exact path={"/forum"} >
                      <Forum />
                  </Route>
                
                  <Route exact path={"/profile"} >
                      <Profile />
                  </Route>

                </Switch>
            </Router>
          </div>
    ) 
    } 
  
  export default App;
