import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginModal from '../../components/LoginModal';
import PilotFlyingImage from '../../assets/images/PFJ Dual Horizontal Sweep Combined_RGB.png';
import ReceiptFinderImage from '../../assets/images/receipt_finder_logo_1@4x.png';
import BottomImage from '../../assets/images/bottom_bg.png';

const Login = () => {
  const history = useHistory();

  const { authUser } = useSelector(({ app }) => app);

  useEffect(() => { document.title = 'Pilot | Login' }, []);

  useEffect(() => {
    if (authUser) {
      history.push(_routes.receiptFinder);
    }
  }, [authUser]);
  
  return (
    <div className="generic-page">
      <div className="generic-page__body">
        <div className="generic-page__company-header stretch-center">
          <img src={PilotFlyingImage} alt="Pilot Flying J" />
        </div>
        <div className="generic-page__receipt-finder-image stretch-center">
          <img src={ReceiptFinderImage} alt="Receipt Finder" />
        </div>
        <LoginModal />
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

export default Login;
