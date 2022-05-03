import React from 'react';
import './change-password.css';

function ChangePassword() {

  return(
    <>
      <div className='change-password-container'>
        <form className='change-password-form'>
          <div className='change-password-input'>
            <input id='new-password' type='password' minLength='8' maxLength='50' placeholder='' name='password1' />
            <label for='new-password'>New Password</label>
          </div>
          
          <div className='change-password-input'>
            <input id='confirm-password' type='password' minLength='8' maxLength='50' placeholder='' name='password2' />
            <label for='confirm-password'>Confirm Password</label>
          </div>

          <div className='button-container'>
            <div className='change-password-button'>
              <button>Change</button>
            </div>

            <div className='confirm-password-button'>
              <button>Cancel</button>
            </div>
          </div>
        </form> 
      </div>
    </>
  )
}

export default ChangePassword;