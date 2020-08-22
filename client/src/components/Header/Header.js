import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Popup from '../Popup';
import LogoutPopup from '../Popups/LogoutPopup';
import PrimaryButton from '../PrimaryButton';
import PilotFlyingImage from '../../assets/images/PFJ Dual Horizontal Sweep Combined_RGB.png';

import './style.scss';

const Header = () => {

  const [logoutOpen, setLogoutOpen] = useState(false);

  const {
    authUser,
    sessionToken,
    expiresAt,
  } = useSelector(({ app }) => app);

  const isLoggedIn = useMemo(() => !!(authUser && sessionToken && expiresAt > new Date().getTime()), [authUser, sessionToken, expiresAt]);
  
  const openLogoutPopup = () => setLogoutOpen(true);
  
  if (isLoggedIn) {
    return (
      <>
        <div className="header">
          <div className="header-group-1">
            <img src={PilotFlyingImage} alt="Pilot Flying J" className="header__logo"/>
            <p>Welcome, <b>{authUser?.name?.first}</b></p>
          </div>
          <div>
            <PrimaryButton
              type="button"
              className="header__logout-button"
              onClick={openLogoutPopup}
            >
              Log Out
            </PrimaryButton>
          </div>
        </div>
        <Popup
          show={logoutOpen}
          showHandler={setLogoutOpen}
          showCloseButton
          closeOnBackdropClick
        >
          <LogoutPopup />
        </Popup>
      </>
    )
  }

  return null;
}

export default Header;
