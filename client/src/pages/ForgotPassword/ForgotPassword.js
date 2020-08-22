import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PilotFlyingImage from '../../assets/images/PFJ Dual Horizontal Sweep Combined_RGB.png';
import ReceiptFinderImage from '../../assets/images/receipt_finder_logo_1@4x.png';
import BottomImage from '../../assets/images/bottom_bg.png';
import PrimaryButton from '../../components/PrimaryButton';
import displayError from '../../util/displayError';
import requestResetPasswordEmail from '../../api/requestResetPasswordEmail';
import Spinner from '../../assets/icons/Spinner';

import './style.scss';

const ForgotPassword = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [sendingMail, setSendingMail] = useState(false);

  useEffect(() => { document.title = 'Pilot | Forgot' }, []);
  
  useEffect(() => {
    document.title = 'Pilot | Forgot Password';
  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    const match = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
    if (email.length === 0) {
      displayError('Please enter an email address');
    } else if (!email.match(match)) {
      displayError('The email address provided is invalid.');
    } else {
      setSendingMail(true);
      requestResetPasswordEmail(email)
        .then(res => {
          if (res.statusCode === 200) {
            history.push(_routes.emailSent);
          } else {
            displayError(res.userMessage || 'Unknown Error, please try again.');
            setSendingMail(false);
          }
        })
        .catch(() => {
          displayError('Unknown Error, please try again.');
          setSendingMail(false);
        })
    }
  };
  const handleEmailChange = e => setEmail(e.target.value);

  return (
    <div className="generic-page">
      <div className="generic-page__body">
        <div className="generic-page__company-header stretch-center">
          <img src={PilotFlyingImage} alt="Pilot Flying J" />
        </div>
        <div className="generic-page__receipt-finder-image stretch-center">
          <img src={ReceiptFinderImage} alt="Receipt Finder" />
        </div>
        <div className="generic-modal forgot-modal">
          {
            sendingMail
              ? (
                <Spinner className="generic-modal__spinner" />
              ) : (
                <>
                  <h2>Forgot Password</h2>
                  <form className="generic-modal__form" onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      className="generic-modal__form__input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <PrimaryButton type="submit" className="generic-modal__form__submit-button">
                      Send Email
                    </PrimaryButton>
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

export default ForgotPassword;
