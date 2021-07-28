import Banner from "./Banner";
import Login from './auth/Login'
import Signup from './auth/Signup'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Directory from './Directory'
import Forum from './publications/Forum'
import SelectedPublication from './publications/SelectedPublication'
import UserPublications from './publications/UserPublications'
import EditPublication from './publications/EditPublication'
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from "react-router-dom";



function App() {
  
let loggedIn=true;

        return (
          <div> 
            <Router>
                <Banner />
                <Switch>
                    <Route exact path={"/signup"}>            
                        <Signup />
                    </Route>

                    <Route exact path={"/"} >            
                        <Login />
                    </Route>

                    <Route exact path="/forum" render={function () {
                        //  let users = isLoggedIn();
                        if (loggedIn) {
                            return <Forum />
                        } else {
                            return <Login />
                        }
                    }}/>

                    <Route path="/forum/publication" render={function () {
                    //  let users = isLoggedIn();
                        if (loggedIn) {
                            return <SelectedPublication />
                        } else {
                            return <Login />
                        }
                    }}/>

                    <Route path="/forum/userpublications" render={function () {
                    //  let users = isLoggedIn();
                        if (loggedIn) {
                            return <UserPublications />
                        } else {
                            return <Login />
                        }
                    }}/>

                    <Route path="/forum/editpublication" render={function () {
                    //  let users = isLoggedIn();
                        if (loggedIn) {
                            return <EditPublication />
                        } else {
                            return <Login />
                        }
                    }}/>

                    <Route exact path="/profile" render={function () {
                    //  let users = isLoggedIn();
                        if (loggedIn) {
                            return <Profile />
                        } else {
                            return <Login />
                        }
                    }}/>
                    
                    <Route exact path="/editprofile" render={function () {
                    //  let users = isLoggedIn();
                        if (loggedIn) {
                            return <EditProfile />
                        } else {
                            return <Login />
                        }
                    }}/>
                    
                    <Route exact path="/directory" render={function () {
                    //  let users = isLoggedIn();
                        if (loggedIn) {
                            return <Directory />
                        } else {
                            return <Login />
                        }
                    }}/>
                </Switch>
            </Router>
          </div>
    ) 
    } 
  
  export default App;


