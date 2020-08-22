import React from 'react';
import './style.scss';

const PrimaryButton = props => {

  const {
    children,
    className = '',
    ...rest
  } = props;

  return (
    <button
      className={`primary-button ${className}`}
      {...rest}
    >{children}</button>
  )
}

export default PrimaryButton;
