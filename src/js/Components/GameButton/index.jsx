import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GameController from '../../GameController';
import SoundFx from '../../SoundFx';

class GameButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activated: false,
    };

    this.activateButton = this.activateButton.bind(this);
    this.pulseAnimationEnd = this.pulseAnimationEnd.bind(this);
  }

  componentDidMount() {
    this.props.gameController.addListener('activateGameButton', this.activateButton);

    if (this.button) {
      this.button.addEventListener('animationend', this.pulseAnimationEnd);
    }
  }

  componentWillUnmount() {
    this.props.gameController.removeListener('activateGameButton', this.activateButton);
    this.button.removeEventListener('animationend', this.pulseAnimationEnd);
  }

  activateButton(buttonIndex, success) {
    if (buttonIndex === this.props.buttonIndex) {
      this.setState({ activated: true });
      if (success) {
        SoundFx.playSuccess(buttonIndex);
      } else {
        SoundFx.playFail(buttonIndex);
      }
    }
  }

  pulseAnimationEnd() {
    this.setState({ activated: false });
  }

  render() {
    const pulseClass = classNames({
      pulse: this.state.activated,
    });

    return (
      <button
        ref={(button) => {
          this.button = button;
        }}
        className={pulseClass}
        onClick={() => this.props.onClick(this.props.buttonIndex)}
      />
    );
  }
}

GameButton.propTypes = {
  buttonIndex: PropTypes.number.isRequired,
  gameController: PropTypes.instanceOf(GameController).isRequired,
  onClick: PropTypes.func.isRequired,
};

GameButton.defaultProps = {};

export default GameButton;
