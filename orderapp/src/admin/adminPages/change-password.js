import React,{ useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import Login from './login';
import LoginHeader from '../adminComponents/login-header';
import Popup from '../adminComponents/popup';
import { BrowserRouter as Router, Switch, Route, Link, useHistory} from 'react-router-dom';
import './change-password.css';

function ChangePassword() {

  const [updatePassword, setUpdatePassword] = useState({username: "", newPassword: "", confirmPassword: ""});
  const [updateStatus, setUpdateStatus] = useState(false);
  const [updatePasswordErrorMessage, setUpdatePasswordErrorMessage] = useState('');
  const [updatePasswordSuccessMessage, setUpdatePasswordSuccessMessage] = useState('');

  const [modalVisibleUpdatePasswordError, setModalVisibleUpdatePasswordError] = useState(false);
  const [updatePasswordErrorPopUpOpen, setUpdatePasswordErrorPopupOpen] = useState(false);
  const [modalVisibleUpdatePasswordSuccess, setModalVisibleUpdatePasswordSuccess] = useState(false);
  const [updatePasswordSuccessPopUpOpen, setUpdatePasswordSuccessPopupOpen] = useState(false);
  let history = useHistory();

  function handleOnChange(e) {
    let updatedPassword = {...updatePassword};
    updatedPassword[e.target.name] = e.target.value;

    setUpdatePassword(updatedPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (updatePassword.newPassword !== updatePassword.confirmPassword) {
      setModalVisibleUpdatePasswordError(true);
      setUpdatePasswordErrorPopupOpen(true);
      setUpdatePasswordErrorMessage('Both passwords do not match. Kindly ensure they are the same.')
      setUpdateStatus(false);
    }

    await ambrosialAxiosAPI.put('/changepassword', {    
      username: updatePassword.username,
      password: updatePassword.newPassword
    })
    .then((response) => {
      console.log(`${response.config.method} method for route: ${response.config.url}`);
      console.log(`response Status: ${response.status}`);
      console.log(`response Message: ${response.data}`);

      setModalVisibleUpdatePasswordSuccess(true);
      setUpdatePasswordSuccessPopupOpen(true);
      setUpdatePasswordSuccessMessage('Password has been successfully updated.');
      setUpdateStatus(true);
    })
    .catch((error) => {
      console.log(`${JSON.stringify(error.response.status)}`);
      console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
      console.log(`Error Status: ${error.response.status}`);
      console.log(`Error Message: ${error.response.data}`);

      setModalVisibleUpdatePasswordError(true);
      setUpdatePasswordErrorPopupOpen(true);
      setUpdatePasswordErrorMessage('Password update failed. New password matches previous password.');
      setUpdateStatus(false);
    });
  }

  function togglePopupUpdatePasswordError() {
    setUpdatePasswordErrorPopupOpen(!updatePasswordErrorPopUpOpen);
    setModalVisibleUpdatePasswordError(!modalVisibleUpdatePasswordError);
  }

  function togglePopupUpdatePasswordSuccess() {
    setUpdatePasswordSuccessPopupOpen(!updatePasswordSuccessPopUpOpen);
    setModalVisibleUpdatePasswordSuccess(!modalVisibleUpdatePasswordSuccess);

    history.push("/login");
  }

  return(
    <>
      <Router>
        <Switch>
          <Route path="/login"><Login /></Route>
          <div className='change-password-container'>
            <LoginHeader />
            <form className='change-password-form'>
              <div className='change-password-input'>
                <input id='username' type='text' placeholder='' autoComplete='off' name='username' onChange={handleOnChange} />
                <label className='change-pw-username-label'>Username</label>
              </div>

              <div className='change-password-input'>
                <input id='new-password' type='password' minLength='8' maxLength='50' placeholder='' name='newPassword' onChange={handleOnChange} />
                <label className='change-pw-newpw-label'>New Password</label>
              </div>
              
              <div className='change-password-input'>
                <input id='confirm-password' type='password' minLength='8' maxLength='50' placeholder='' name='confirmPassword' onChange={handleOnChange}/>
                <label className='change-pw-confirmpw-label'>Confirm Password</label>
              </div>

              {updatePassword.newPassword !== updatePassword.confirmPassword && <p>Both passwords do not match!</p>}

              <div className='change-pw-button-container'>
                <div className='change-pw-change-button-div'>
                  <button className='change-pw-button' onClick={handleSubmit}>Change</button>
                </div>

                {modalVisibleUpdatePasswordSuccess && <div className='modal'>
                    {updatePasswordSuccessPopUpOpen && <Popup
                      popupType='updatePasswordSuccessPopup'
                      handleClose={togglePopupUpdatePasswordSuccess}
                      content={updatePasswordSuccessMessage}/>
                    }  
                  </div>
                }

                {modalVisibleUpdatePasswordError && <div className='modal'>
                    {updatePasswordErrorPopUpOpen && <Popup
                      popupType='updatePasswordErrorPopup'
                      handleClose={togglePopupUpdatePasswordError}
                      content={updatePasswordErrorMessage}/>
                    }  
                  </div>
                }

                <div className='change-pw-cancel-button-div'>
                  <button className='change-pw-button'>
                    <Link to="/login" className='change-pw-cancel-link'>Cancel</Link>
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

export default ChangePassword;