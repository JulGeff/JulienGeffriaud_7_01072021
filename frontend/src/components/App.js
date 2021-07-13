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
                        <Route path="/post">
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


