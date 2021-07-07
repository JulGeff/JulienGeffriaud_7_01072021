import Banner from './Banner'
import Login from './Login'
import Signup from './Signup'
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
                    </Switch>
        </div>
      </Router>
      
    ) 
    
}

export default App


