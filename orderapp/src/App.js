import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import LandingApp from './LandingApp';
import CustomerApp from './customer/CustomerApp';
import AdminApp from './admin/AdminApp';

function App() {

  return (
    <>
    <Router>
        <Switch>  
          <Route exact path="/"><LandingApp /></Route>
          <Route path="/customer"><CustomerApp /></Route>
          <Route path="/admin"><AdminApp /></Route>
          <Redirect from ="*" to="/" />
        </Switch>
    </Router>
    </>
  )
}

export default App;