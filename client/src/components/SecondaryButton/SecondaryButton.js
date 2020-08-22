import React from 'react';
import './style.scss';

const SecondaryButton = (props) => (
    <button className="secondary-button" onClick={props.OnClickEvent}>
        { props.children }
    </button>
);

export default SecondaryButton;