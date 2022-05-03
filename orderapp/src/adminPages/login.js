import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ambrosialAxiosAPI } from '../api/api';
import AdminApp from '../AdminApp';
import Header from '../adminComponents/Header';
import ChangePassword from './change-password';
import './login.css';

function Login() {

  const [loginCredentials, setLoginCredentials] = useState({username: "", password: ""});

  function handleOnChange(e) {
    let updatedCredentials = {...loginCredentials};
    updatedCredentials[e.target.name] = e.target.value;
    console.log(e.target.value);

    setLoginCredentials(updatedCredentials);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await ambrosialAxiosAPI.post('/login', {
      username: loginCredentials.username,
      password: loginCredentials.password
    })
    .then((response) => {
       console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
       console.log(`response Status: ${response.data.status}`);
       console.log(`response Message: ${response.data.message}`);
       console.log("response Data: ", response.data.data);
    })
    .catch((error) => {
      console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
      console.log(`Error Status: ${error.response.data.status}`);
      console.log(`Error Message: ${error.response.data.message}`);
    });

    e.target.reset();
  }

  return( 
    <>
      
      <Router>
        <Switch>
          <Route path="/admin"><AdminApp /></Route>
          <Route path="/change-password"><ChangePassword /></Route>
          <div className='login-container'>
            <Header />
            <form className='login-form'>
              <div className='login-input'>
                <input id='username-input' type='text' autoComplete='off' placeholder='' name='username' onChange={handleOnChange}/>
                <label>Username</label>
              </div>
              
              <div className='login-input'>
                <input id='password-input' type='password' autoComplete='off' placeholder='' minLength='8' name='password' onChange={handleOnChange}/>
                <label>Password</label>
              </div>

              <div className='forgot-password-link'>
                  <Link to="/change-password">Forgot Password</Link>
              </div>

              <div className='button-container'>
                <div className='login-button'>
                  <button onSubmit={handleSubmit}>
                    <Link to="/admin" className='login-page-link'>Login</Link>
                  </button>
                </div>

                <div className='cancel-button'>
                  <button>
                    <Link to="/" className='login-page-link' />Cancel
                  </button>
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
