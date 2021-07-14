import Banner from './Banner'
import Login from './Login'
import Signup from './Signup'
import Post from './Post'
import Profile from './Profile'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

function App() {
    return (
      <Router>
        <div>
        <Banner />

          <Switch>
          <Route exact path="/">
                            <Login />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                           <Signup />
                        </Route>
                        <Route path="/home">
                           <Post />
                        </Route>
                        <Route path="/profile">
                           <Profile />
                        </Route>
                    </Switch>
        </div>
      </Router>
      
    ) 
    
}

export default App


/*<Route path="/home" render={function () {
                    let users = isLoggedIn();
                    if (users) {
                        return <Redirect push to={{
                            pathname: '/home',
                            state: { user : user }
                        }}/>
                    } else {
                       return <Login />
                    }
                }}/>
*/