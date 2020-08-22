import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import config from '../../config';
import appActions from '../../store/actions/app';
import displayError from '../../util/displayError';
import hideError from '../../util/hideError';

import PrimaryButton from '../PrimaryButton';
import Spinner from '../../assets/icons/Spinner';

const LoginModal = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    errorMessage,
    authUser,
    isLoggingIn,
  } = useSelector(({ app }) => app);

  const validate = () => {
    if (errorMessage) {
      hideError();
    }

    if (username.length === 0) { displayError('Error Submitting Form: Username is required.'); }
    else if (password.length === 0) { displayError('Error Submitting Form: Password is required.') }
    else {
      dispatch(appActions.login(username, password))
        .then(response => {
          if (response.sessionToken) {
            sessionStorage.setItem(config["storage-key"], response.sessionToken);
          }
        })
    }
    
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  
  const handleFormSubmit = e => {
    e.preventDefault();
    validate();
  };
  
  return (
    <div className="generic-modal">
      {
        isLoggingIn
          ? (
            <Spinner className="generic-modal__spinner" />
          ) : (
            <>
              <h2>Login</h2>
              <form className="generic-modal__form" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  className="generic-modal__form__input"
                  placeholder="Username / Email"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <input
                  type="password"
                  className="generic-modal__form__input"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <PrimaryButton type="submit" className="generic-modal__form__submit-button">
                  Login
                </PrimaryButton>
              </form>
              <Link to={_routes.forgotPassword} className="generic-modal__forgot-password-link">
                Forgot Password?
              </Link>
            </>
          )
      }
    </div>
  )
}

export default LoginModal;
