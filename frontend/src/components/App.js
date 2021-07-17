import Banner from './Banner'
import Login from './Login'
import Signup from './Signup'
import Post from './Post'
import Profile from './Profile'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Component } from 'react'



export default class App extends Component {

      constructor() {
        super();

        this.state = {
          loggedInStatus : "NOT_LOGGED_IN",
          user: {}

        }
      }

      render () {
        return (
          <div>
            <Router>
              <Banner />
                <Switch>
                <Route exact path="/">
                                  <Login />
                              </Route>
                              <Route 
                              path="/login">
                                  <Login />
                              </Route>
                              <Route path="/signup">
                                <Signup />
                              </Route>

                              <Route path="/home" 
                              render={props => (
                                <Post {... props} loggedInStatus={this.state.loggedInStatus} />
                              )}
                              />

                              <Route path="/profile">
                                <Profile />
                              </Route>
                          </Switch>
                          </Router>
              </div>
    ) 
    } 
  }



/*
<Redirect push to={{
                            pathname: '/home',
                            state: { user : user }
                          }}/>
*/