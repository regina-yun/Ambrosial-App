import './LandingApp.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import LoginHeader from './admin/adminComponents/login-header';
import CustomerApp from './customer/CustomerApp';
import AdminApp from './admin/AdminApp';
import Login from './admin/adminPages/login';

function LandingApp() {

  return (
    <>
     <Router>
     <Switch>  
          <Route path="/customer"><CustomerApp /></Route>
          <Route path="/login"><Login /></Route>
    <div className="landing">
      <div className="main">
        <h2 className='landing-text'>Welcome to</h2>
        {/* <h1 className='landing-title'>Ambrosial</h1>
        <h3 className='landing-subtitle'>quality you can taste</h3> */}
        <LoginHeader />
        <h2 className='landing-text'>I am a...</h2>
        <div className="landing-nav"></div>
          <Link to="/customer" className="customer-nav">Customer</Link>
          <Link to="/login" className="login-nav">Admin</Link>
        </div>
      </div>
    </Switch> 
    </Router>
    </>
  )
}

export default LandingApp;