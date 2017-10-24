import React from 'react';
import PropTypes from 'prop-types';

function ResetButton(props) {
  return (
    <div className="button-container" title="Resets the game.">
      <button className="reset-button" onClick={props.onClick} />
      <span className="button-label">Reset</span>
    </div>
  );
}

ResetButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ResetButton;
