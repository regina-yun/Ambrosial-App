import React from 'react';
import Header from '../adminComponents/Header';
import './login.css';

function Login() {

  return(
    <>
      <Header />
      
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
              <button>Forgot password?</button>
            </div>

            <div className='login-button'>
              <button>Login</button>
            </div>
          </div>
        </form> 
      </div>
    </>
  )
}

export default Login;
