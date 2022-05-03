import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Header from '../adminComponents/Header';
import ChangePassword from './change-password';
import './login.css';

function Login() {

  return(
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/change-password"><ChangePassword /></Route>
          <div className='login-container'>
            <form className='login-form'>
              <div className='login-input'>
                <input id='username-input' type='text' autoComplete='off' placeholder='' name='username'/>
                <label>Username</label>
              </div>
              
              <div className='login-input'>
                <input id='password-input' type='password' autoComplete='off' placeholder='' minLength='8' name='password'/>
                <label>Password</label>
              </div>

              <div className='forgot-password-link'>
                  <Link to="/change-password">Forgot Password</Link>
              </div>

              <div className='button-container'>
                <div className='login-button'>
                  <button>Login</button>
                </div>

                <div className='cancel-button'>
                  <button>Cancel</button>
                </div>
              </div>
            </form> 
          </div>
        </Switch>
      </Router>
    </>
  )
}

export default Login;
