import React,{ useState } from 'react';
import { ambrosialAxiosAPI } from '../api/api';
import Login from './login';
import LoginHeader from '../adminComponents/login-header';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import './change-password.css';

function ChangePassword() {

  const [updatePassword, setUpdatePassword] = useState({username: "", newPassword: "", confirmPassword: ""});
  const [updateStatus, setUpdateStatus] = useState(false);

  function handleOnChange(e) {
    let updatedPassword = {...updatePassword};
    updatedPassword[e.target.name] = e.target.value;

    setUpdatePassword(updatedPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (updatePassword.newPassword !== updatePassword.confirmPassword) {
      alert('Both passwords do not match. Please ensure both passwords are the same.')
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

       alert("Password was successfully updated");
       setUpdateStatus(true);
    })
    .catch((error) => {
      console.log(`${JSON.stringify(error.response.status)}`);
      console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
      console.log(`Error Status: ${error.response.status}`);
      console.log(`Error Message: ${error.response.data}`);

      alert("Password update failed. New password matches previous password.");
      setUpdateStatus(false);
    });

    e.target.reset();
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
                <label>Username</label>
              </div>

              <div className='change-password-input'>
                <input id='new-password' type='password' minLength='8' maxLength='50' placeholder='' name='newPassword' onChange={handleOnChange} />
                <label>New Password</label>
              </div>
              
              <div className='change-password-input'>
                <input id='confirm-password' type='password' minLength='8' maxLength='50' placeholder='' name='confirmPassword' onChange={handleOnChange}/>
                <label>Confirm Password</label>
              </div>

              { updatePassword.newPassword !== updatePassword.confirmPassword && <p>Both passwords do not match!</p>}

              <div className='button-container'>
                <div className='change-button'>
                  <button onClick={handleSubmit}>Change
                    {updateStatus === true && <Redirect to="/login"/>}
                  </button>
                </div>

                <div className='cancel-button'>
                  <button>
                    <Link to="/login" className='cancel-link'>Cancel</Link>
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