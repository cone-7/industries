import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >{props.children}
    </button>
  );
};

ButtonComponent.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default ButtonComponent;
