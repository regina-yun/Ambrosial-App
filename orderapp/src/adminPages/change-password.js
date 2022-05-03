import React,{ useState } from 'react';
import { ambrosialAxiosAPI } from '../api/api';
import Login from './login';
import Header from '../adminComponents/Header';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './change-password.css';

function ChangePassword() {

  const [updatePassword, setUpdatePassword] = useState({username: "", newPassword: "", confirmPassword: ""});

  function handleOnChange(e) {
    let updatedPassword = {...updatePassword};
    updatedPassword[e.target.name] = e.target.value;
    console.log(e.target.value);

    setUpdatePassword(updatedPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await ambrosialAxiosAPI.put('/changepassword', {    
      username: updatePassword.username,
      password: updatePassword.newPassword
    })
    .then((response) => {
       console.log(`${response.config.method} method for route: ${response.config.url}`);
       console.log(`response Status: ${response.data.status}`);
       console.log(`response Message: ${response.data.message}`);
       console.log("response Data: ", response.data.data);
    })
    .catch((error) => {
      console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
      console.log(`Error Status: ${error.response.data.status}`);
      console.log(`Error Message: ${error.response.data.message}`);
    });

    e.target.reset();
  }

  return(
    <>
      <Router>
        <Switch>
          <Route path="/login"><Login /></Route>
          <div className='change-password-container'>
            <Header />
            <form className='change-password-form'>
              <div className='change-password-input'>
                <input id='username' type='text' placeholder='' autoComplete='off' name='username' onChange={handleOnChange} />
                <label for='username'>Username</label>
              </div>

              <div className='change-password-input'>
                <input id='new-password' type='password' minLength='8' maxLength='50' placeholder='' name='newPassword' onChange={handleOnChange} />
                <label for='new-password'>New Password</label>
              </div>
              
              <div className='change-password-input'>
                <input id='confirm-password' type='password' minLength='8' maxLength='50' placeholder='' name='confirmPassword' onChange={handleOnChange}/>
                <label for='confirm-password'>Confirm Password</label>
              </div>

              <div className='button-container'>
                <div className='change-button'>
                  <button onSubmit={handleSubmit}>Change</button>
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