import React from 'react';
import PrimaryButton from '../../PrimaryButton';
import noop from '../../../util/noop';
import './style.scss';

const ErrorPopup = ({ message = '', showHandler = noop }) => {

  return (
    <div>
      <h2 className="error-popup__header">Error</h2>
      <p className="error-popup__body">{message}</p>
      <PrimaryButton className="error-popup__confirm-button" onClick={showHandler}>
        ok
      </PrimaryButton>
    </div>
  )
  
}

export default ErrorPopup;
