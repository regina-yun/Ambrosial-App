import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Receipts from './pages/Receipts';
import Payments from './pages/Payments';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
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

export default App;
