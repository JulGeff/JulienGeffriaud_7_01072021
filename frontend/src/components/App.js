import Banner from "./Banner";
import Signup from './auth/Signup'
import Home from './Home'
import Profile from './Profile'
import Publication from './Publication'
import Directory from './Directory'
import Forum from './Forum'
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
                <Route exact path={"/signup"} >            
                      <Signup />
                  </Route>

                  <Route exact path={"/"} >            
                      <Home />
                  </Route>

                  <Route exact path={"/forum"} >
                      <Publication loggedIn={true} />
                      <Forum loggedIn={true} />
                  </Route>
                
                  <Route exact path={"/profile"} >
                      <Profile loggedIn={true}/>
                  </Route>

                  <Route exact path={"/directory"} >
                      <Directory loggedIn={true}/>
                  </Route>
                </Switch>
            </Router>
          </div>
    ) 
    } 
  
  export default App;
