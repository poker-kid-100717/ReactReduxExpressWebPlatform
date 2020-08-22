import React from 'react';
import './style.scss';

const Spinner = props => {

  return (
    <svg
      width="46px"
      height="46px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-rolling"
      style={{ background: 'none' }}
    >
      <circle
        cx="50"
        cy="50"
        fill="none" 
        stroke="#ff9e1b"
        strokeWidth="7"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(35.8546 50 50)"
      />
    </svg>
  )
}

export default Spinner;
