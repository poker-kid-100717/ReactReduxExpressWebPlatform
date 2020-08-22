import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import PilotFlyingImage from '../../assets/images/PFJ Dual Horizontal Sweep Combined_RGB.png';
import ReceiptFinderImage from '../../assets/images/receipt_finder_logo_1@4x.png';
import BottomImage from '../../assets/images/bottom_bg.png';
import PrimaryButton from '../../components/PrimaryButton';
import Spinner from '../../assets/icons/Spinner';

import displayError from '../../util/displayError';

import './style.scss';
import requestChangePassword from '../../api/requestChangePassword';
import devlog from '../../util/devlog';

const validatePasswords = (pw1, pw2) => {
  if (pw1.length === 0) {
    displayError('Enter a new password.');
    return false;
  } else if (pw2.length === 0) {
    displayError('Confirm your new password first.');
    return false;
  } else if (pw1 !== pw2) {
    displayError('Passwords do not match.');
    return false;
  }

  return true;
}

const ResetPassword = () => {
  const history = useHistory();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');

  const splitLocation = history.location.pathname.split('/');

  useEffect(() => { document.title = 'Pilot | Reset' }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    const splitLocation = location.pathname.split('/');
    const key = splitLocation[splitLocation.length - 1];
    const passwordsValid = validatePasswords(pw1, pw2);
    if (passwordsValid) {
      setIsChangingPassword(true);
      requestChangePassword(key, pw1)
        .then(res => {
          if (res.statusCode === 200) {
            history.push(_routes.login);
          } else {
            displayError(res.userMessage || 'Unknown Error');
          }
        })
        .catch(err => {
          devlog(err);
          displayError('Unknown Error');
        })
    }
  }

  if (splitLocation.length < 3 || splitLocation[splitLocation.length -1] === "") {
    return (
      <div>
        <h2>Invalid URL</h2>
        <p>Return To <Link to={_routes.login}>Login</Link></p>
      </div>
    )
  }

  return (
    <div className="generic-page">
      <div className="generic-page__body">
        <div className="generic-page__company-header stretch-center">
          <img src={PilotFlyingImage} alt="Pilot Flying J" />
        </div>
        <div className="generic-page__receipt-finder-image stretch-center">
          <img src={ReceiptFinderImage} alt="Receipt Finder" />
        </div>
        <div className="generic-modal reset-modal">
          {
            isChangingPassword
              ? (
                <Spinner className="generic-modal__spinner" />
              ) : (
                <>
                  <h2>Change Password</h2>
                  <form className="generic-modal__form" onSubmit={handleFormSubmit}>
                    <input
                      type="password"
                      className="generic-modal__form__input"
                      placeholder="Password"
                      value={pw1}
                      onChange={e => setPw1(e.target.value)}
                    />
                    <input
                      type="password"
                      className="generic-modal__form__input"
                      placeholder="Confirm Password"
                      value={pw2}
                      onChange={e => setPw2(e.target.value)}
                    />
                    <PrimaryButton
                      type="submit"
                      className="generic-modal__form__submit-button"
                      disabled={!pw1.length || !pw2.length || pw1 !== pw2}
                    >
                      Change Password
                    </PrimaryButton>
                    <Link to={_routes.forgotPassword}>Request another reset link</Link>
                    <Link to={_routes.login}>Back to login</Link>
                  </form>
                </>
              )
          }
        </div>
        <p className="generic-page__disclaimer">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elit turpis, semper pulvinar tempus a, cursus quis erat. Integer imperdiet enim at semper condimentum. Duis vehicula ultricies orci, ut condimentum ante facilisis and also Brandon rocks!
        </p>
      </div>
      <div className="generic-page__botom-image">
        <img width="100%" src={BottomImage} alt="Bottom Image" />
      </div>
    </div>
  )
}

export default ResetPassword;
