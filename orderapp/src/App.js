import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import CustomerApp from './CustomerApp';
import AdminApp from './AdminApp';

function App() {

  return (
    <>
    <Router>
    <div className="landing">
        <Switch>
          <Route path="/customer"><CustomerApp /></Route>
          <Route path="/admin"><AdminApp /></Route>
        </Switch>
      <h1>Ambrosial</h1>
      <h2>I am a...</h2>
        <div className="landing-nav">
          <Link to="/customer" className="customer-nav">Customer</Link>
          <Link to="/admin" className="admin-nav">Admin</Link>
        </div>
    </div>
    </Router>
    </>
  )
}

export default App;