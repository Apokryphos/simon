import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function StrictButton(props) {
  const strictClass = classNames({
    'strict-button': true,
    enabled: props.enabled,
  });

  return (
    <div
      className="button-container"
      title="Toggles strict mode. In strict mode, the sequence resets if you press the wrong button."
    >
      <button className={strictClass} onClick={props.onClick} />
      <span className="button-label">Strict</span>
    </div>
  );
}

StrictButton.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StrictButton;
