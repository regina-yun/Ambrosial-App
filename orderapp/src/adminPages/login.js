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
                <label>Username: </label>
                <input id='username-input' type='text' placeholder='Username' name='username' required />
              </div>
              
              <div className='login-input'>
                <label> Password: </label>
                <input id='password-input' type='password' minLength='8' maxLength='50' placeholder='Password' name='password' required />
              </div>

              <div className='button-container'>
                <div className='forgot-password-button'>
                  <Link to="/change-password">Forgot Password</Link>
                  {/* <button>Forgot password?</button> */}
                </div>

                <div className='login-button'>
                  <button>Login</button>
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
