import './admin-app.css';
import Header from './adminComponents/header';
import Home from './adminPages/home';
import Menu from './adminPages/menu';
import Orders from './adminPages/orders';
import Receipts from './adminPages/receipts';
import Payments from './adminPages/payments';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

function AdminApp(props) {
  return (
    <div className="admin-app">
      <Router>
        <nav className="admin-navbar">
          <Link to="/" className="admin-pages">Home</Link>
          <Link to="/Menu" className="admin-pages">Menu</Link>
          <Link to="/Orders" className="admin-pages">Orders</Link>
          <Link to="/Receipts" className="admin-pages">Receipts</Link>
          <Link to="/Payments" className="admin-pages">Payments</Link>
        </nav>
        <Header />

        <div>
          <button className='logout-button' onClick={() => { window.location.reload(); }}>
            Logout
          </button>
        </div>

        <div className="admin-container">
          <Switch>

            <Route exact path="/"><Home user={props.user} /></Route>
            <Route path="/Menu"><Menu /></Route>
            <Route path="/Orders"><Orders /></Route>
            <Route path="/Receipts"><Receipts /></Route>
            <Route path="/Payments"><Payments /></Route>
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default AdminApp;