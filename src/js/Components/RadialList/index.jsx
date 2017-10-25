import React from 'react';
import PropTypes from 'prop-types';
import GameButton from '../GameButton';
import GameController from '../../GameController';

function RadialList(props) {
  const buttons = [];
  for (let b = 0; b < props.buttonCount; ++b) {
    //  Just use index as key: button list is static and doesn't change
    const key = b;
    buttons.push(<GameButton
      key={key}
      buttonIndex={b}
      gameController={props.gameController}
      onClick={props.onClick}
    />);
  }

  return (
    <div className="radial-list">
      {buttons}
    </div>
  );
}

RadialList.propTypes = {
  buttonCount: PropTypes.number,
  gameController: PropTypes.instanceOf(GameController),
  onClick: PropTypes.func,
};

RadialList.defaultProps = {
  buttonCount: 8,
  gameController: null,
  onClick: null,
};

export default RadialList;
