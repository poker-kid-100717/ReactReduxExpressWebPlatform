import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Popup from '../Popup';
import Header from '../Header';
import ErrorPopup from '../Popups/ErrorPopup';
import { useSelector } from 'react-redux';
import hideError from '../../util/hideError';
import Routes from '../../routes';

import './style.scss';
import '../../styles/main.scss';

const App = () => {
  const { loading, errorMessage } = useSelector(({ app }) => app);

  return (
    <Router>
      <Popup
        show={errorMessage}
        showHandler={hideError}
        closeOnBackdropClick={true}
        showCloseButton={false}
      >
        <ErrorPopup message={errorMessage} showHandler={hideError} />
      </Popup>
      <div className="app-routes">
        <Header />
        <Routes />
      </div>
    </Router>
  )
}

export default App;
