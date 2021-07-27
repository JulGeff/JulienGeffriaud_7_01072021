import Banner from "./Banner";
import Signup from './auth/Signup'
import Home from './Home'
import Profile from './Profile'
import Directory from './Directory'
import Forum from './Forum'
import SelectedPublication from './SelectedPublication'
import UserPublications from './UserPublications'
import React, { useEffect, useState } from 'react';
// 


import {
  BrowserRouter as Router,
  Route,
  Switch,

} from "react-router-dom";


function App() {
  

/*let loggedIn = localStorage.getItem('loggedIn')
const [loggedIn, setLoggedIn] = React.useState([]);
useEffect(() => {


setLoggedIn(localStorage.getItem('loggedIn'))
return loggedIn

}
, [])
*/

let loggedIn=true;


        return (
          <div>
             
            <Router>
            <Banner />
                <Switch>
                <Route exact path={"/signup"} loggedIn={loggedIn} >            
                      <Signup />
                  </Route>

                  <Route exact path={"/"} >            
                      <Home />
                  </Route>

                  <Route exact path={"/forum"} >
                      <Forum loggedIn={loggedIn} />
                  </Route>

                  <Route path={"/forum/publication"} >
                      <SelectedPublication loggedIn={loggedIn}/>
                  </Route>

                  <Route path={"/forum/userpublications"} >
                      <UserPublications loggedIn={loggedIn}/>
                  </Route>
                
                  <Route exact path={"/profile"} >
                      <Profile loggedIn={loggedIn}/>
                  </Route>

                  <Route exact path={"/directory"} >
                      <Directory loggedIn={loggedIn}/>
                  </Route>
                </Switch>
            </Router>
          </div>
    ) 
    } 
  
  export default App;
