import React from 'react';
import PropTypes from 'prop-types';
import Title from '../Components/Title';
import RadialList from '../Components/RadialList';
import ResetButton from '../Components/ResetButton';
import SequenceCount from '../Components/SequenceCount';
import StrictButton from '../Components/StrictButton';
import Victory from '../Components/Victory';
import Game from '../Game';
import GameController from '../GameController';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controller: new GameController(new Game(8, props.random)),
      sequenceLength: 1,
      strict: false,
      victory: false,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.toggleStrict = this.toggleStrict.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.state.controller.playSequence();
  }

  handleButtonClick(buttonIndex) {
    this.state.controller.submit(buttonIndex);
    this.setState(prevState => ({
      sequenceLength: prevState.controller.getSequenceLength(),
      victory: prevState.controller.getVictory(),
    }));
  }

  reset() {
    this.setState((prevState) => {
      prevState.controller.reset();
      prevState.controller.playSequence();
      return {
        sequenceLength: prevState.controller.getSequenceLength(),
        victory: false,
      };
    });
  }

  toggleStrict() {
    this.setState((prevState) => {
      prevState.controller.toggleStrict();
      return {
        strict: prevState.controller.getStrict(),
      };
    });
  }

  render() {
    let display = null;
    if (this.state.victory) {
      display = <Victory />;
    } else {
      display = <SequenceCount count={this.state.sequenceLength} />;
    }

    return (
      <div id="app">
        <RadialList gameController={this.state.controller} onClick={this.handleButtonClick} />
        <div className="menu-ui-container">
          <Title text="Simon" />
          {display}
          <ResetButton onClick={this.reset} />
          <StrictButton enabled={this.state.strict} onClick={this.toggleStrict} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  random: PropTypes.func,
};

App.defaultProps = {
  random: null,
};

export default App;
