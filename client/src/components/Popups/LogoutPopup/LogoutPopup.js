import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from '../../../config';
import appActions from '../../../store/actions/app';
import PrimaryButton from '../../PrimaryButton';
import './style.scss';

const LogoutPopup = ({ isLoggingOut = false }) => {
  const dispatch = useDispatch();
  const { sessionToken } = useSelector(({ app }) => app);

  const logout = () => {
    dispatch(appActions.logout(sessionToken))
      .then(res => {
        if (res.statusCode === 200) {
          sessionStorage.removeItem(config["storage-key"]);
        }
      });
  }
  
  return (
    <div>
      <h2 className="logout-popup__header">Logout?</h2>
      <p className="logout-popup__body">Are you sure you want to logout?</p>
      <PrimaryButton
        className="logout-popup__confirm-button"
        onClick={logout}
        disabled={isLoggingOut}
      >
        {
          isLoggingOut
            ? 'Logging Out...'
            : 'Logout'
        }
      </PrimaryButton>
    </div>
  )
}

export default LogoutPopup;
