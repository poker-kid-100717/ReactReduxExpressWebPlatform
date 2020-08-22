import React from 'react';
import Check from '../../../assets/icons/Check';
import noop from '../../../util/noop';
import './style.scss';

const Checkbox = ({
  checked = false,
  onChange = noop,
  className = '',
}) => {

  const handleCheckFocus = () => {}
  const handleCheckBlur = () => {}

  return (
    <div className={`checkbox${checked ? ' checkbox--checked' : ''}${className ? ` ${className}` : ''}`}>
      <input
        type="checkbox"
        className="hidden-checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled
      />
      <button
        className="checkbox__box"
        onClick={() => onChange(!checked)}
      >
        { checked ? <Check /> : null }
      </button>
    </div>
  )
}

export default Checkbox;
