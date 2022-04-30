import React from 'react';
import Header from './Header';

export default Login = () => {

  return(
    <>
      <Header />
      
      <div className='login-container'>
        <form className='login-form'>
          <div className='login-input'>
            <label>Username:</label>
            <input type='text' placeholder='Username' name='username' required />
          </div>
          
          <div className='login-input'>
            <label>Password:</label>
            <input type='password' minLength='8' maxLength='50' placeholder='Password' name='password' required />
          </div>

          <div className='forgot-password-link'>
            <p>Forgot password?</p>
          </div>

          <div className='login-button'>
            <button>Login</button>
          </div>
        </form> 
      </div>
    </>
  )
}

