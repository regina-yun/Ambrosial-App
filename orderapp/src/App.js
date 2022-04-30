import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import LandingApp from './LandingApp';
import CustomerApp from './CustomerApp';
import AdminApp from './AdminApp';

function App() {

  return (
    <>
    <Router>
    <div className="main-page">
        <Switch>  
          <Route exact path="/"><LandingApp /></Route>
          <Route path="/customer"><CustomerApp /></Route>
          <Route path="/admin"><AdminApp /></Route>
          <Redirect from ="*" to="/" />
        </Switch>
      </div>
    </Router>
    </>
  )
}

export default App;