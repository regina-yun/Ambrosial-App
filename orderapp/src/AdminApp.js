import './AdminApp.css';
import Header from './adminComponents/Header';
import Home from './adminPages/Home';
import Menu from './adminPages/Menu';
import Orders from './adminPages/Orders';
import Receipts from './adminPages/Receipts';
import Payments from './adminPages/Payments';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

function AdminApp() {
  return (
    <div className="admin-app">
      <Header />
        <Router>
          <nav className="navbar">
            <Link to="/" className="pages">Home</Link>
            <Link to="/Menu" className="pages">Menu</Link>
            <Link to="/Orders" className="pages">Orders</Link>
            <Link to="/Receipts" className="pages">Receipts</Link>
            <Link to="/Payments" className="pages">Payments</Link>
          </nav>
        <div className="main-container">
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/Menu"><Menu /></Route>
            <Route path="/Orders"><Orders /></Route>
            <Route path="/Receipts"><Receipts /></Route>
            <Route path="/Payments"><Payments /></Route>
            <Redirect from ="*" to="/" />
          </Switch>
        </div>
        </Router>
    </div>
  );
}

export default AdminApp;
