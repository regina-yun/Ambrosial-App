import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { ambrosialAxiosAPI } from '../api/api';
import AdminApp from '../AdminApp';
import Header from '../adminComponents/Header';
import ChangePassword from './change-password';
import './login.css';

function Login() {
  const [loginCredentials, setLoginCredentials] = useState({username: "", password: ""});
  const [loginStatus, setLoginStatus] = useState(false);

  function handleOnChange(e) {
    let updatedCredentials = {...loginCredentials};
    updatedCredentials[e.target.name] = e.target.value;

    setLoginCredentials(updatedCredentials);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await ambrosialAxiosAPI.post('/login', {
      username: loginCredentials.username,
      password: loginCredentials.password
    })
    .then((response) => {
       console.log(`${response.config.method} method`, `for route: ${response.config.url}`);
       console.log(`response Status: ${response.status}`);
       console.log(`response Message: ${response.data}`);

       setLoginStatus(true);
    })
    .catch((error) => {
      console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
      console.log(`Error Status: ${error.response.status}`);
      console.log(`Error Message: ${error.response.data}`);

      alert("Invalid username/password");
      setLoginStatus(false);
    });

    e.target.reset();
  }

  return( 
    <>
      <Router>
        <Switch>
          <Route path="/admin"><AdminApp user={loginCredentials.username}/></Route>
          <Route path="/change-password"><ChangePassword /></Route>
          <div className='login-container'>
            <Header />
            <form className='login-form'>
              <div className='login-input'>
                <input id='username-input' type='text' autoComplete='off' placeholder='' name='username' onChange={handleOnChange}/>
                <label>Username</label>
              </div>
              
              <div className='login-input'>
                <input id='password-input' type='password' placeholder='' minLength='8' name='password' onChange={handleOnChange}/>
                <label>Password</label>
              </div>

              <div className='forgot-password-link'>
                  <Link to="/change-password">Forgot Password</Link>
              </div>

              <div className='button-container'>
                <div className='login-button'>
                  <button onClick={handleSubmit}>Login
                    {loginStatus === true && <Redirect to="/admin" className='login-page-link' />}
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
