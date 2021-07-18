import Banner from "./Banner";
import Home from './Home'
import Profile from './Profile'
import Publication from './Publication'
import Directory from './Directory'
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from "react-router-dom";
import React from 'react'


function App() {
        return (
          <div>
             
            <Router>
            <Banner />
                <Switch>
                  <Route exact path={"/"} >
                     
                      <Home />
                  </Route>

                  <Route exact path={"/publication"} >
                      <Publication authorized={true}/>
                  </Route>
                
                  <Route exact path={"/profile"} >
                      <Profile authorized={true}/>
                  </Route>

                  <Route exact path={"/directory"} >
                      <Directory authorized={true}/>
                  </Route>

                </Switch>
            </Router>
          </div>
    ) 
    } 
  
  export default App;
