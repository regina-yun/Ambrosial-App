import React from 'react';

function ChangePassword() {

  return(
    <>
      <div className='change-password-container'>
        <form className='change-password-form'>
          <div className='change-password-input'>
            <label>New Password:</label>
            <input type='password' minLength='8' maxLength='50' placeholder='Password' name='password1' required />
          </div>
          
          <div className='change-password-input'>
            <label>Confirm Password:</label>
            <input type='password' minLength='8' maxLength='50' placeholder='Password' name='password2' required />
          </div>

          <div>
            <div className='change-password-button'>
              <button>Change</button>
            </div>

            <div className='change-password-button'>
              <button>Cancel</button>
            </div>
          </div>
        </form> 
      </div>
    </>
  )
}

export default ChangePassword;