import React from 'react';
import noop from '../../util/noop';
import './style.scss';

const Popup = ({
  show = false,
  showHandler = noop,
  children,
  closeOnBackdropClick = false,
  showCloseButton = false,
}) => {

  const closeModal = () => showHandler(false);

  if (show) {
    return (
      <>
        <div
          className="popup-backdrop"
          onClick={closeOnBackdropClick ? closeModal : undefined}
        />
        <div className="popup">
          {
            showCloseButton && (
              <button className="popup__close-button" onClick={closeModal}>X</button>
            )
          }
          {children}
        </div>
      </>
    )
  }

  return <></>
}

export default Popup;
