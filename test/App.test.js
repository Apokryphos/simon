import React from 'react';
import { shallow } from 'enzyme';
import App from 'App';
import { getMatchButton } from './test-util';

describe('App rendering', () => {
  it('Renders OK', () => {
    const wrapper = shallow(<App random={() => 0} />);
    wrapper.instance().forceUpdate();
    wrapper.instance().render();
    expect(wrapper).toMatchSnapshot();
  });

  it('Renders OK after victory', () => {
    const wrapper = shallow(<App random={() => 0} />);

    const gameController = wrapper.state('controller');

    expect(gameController.getVictory() === false);
    wrapper.instance().render();

    for (let v = 0; v < gameController.getVictoryCount(); ++v) {
      expect(gameController.getSequenceLength === v);
      gameController.submit(getMatchButton(gameController.game));
    }

    wrapper.instance().render();
    expect(gameController.getVictory() === true);
    expect(wrapper).toMatchSnapshot();
  });

  it('handleButtonClick submits correctly', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state().sequenceLength === 1);

    const matchButton = wrapper.state('controller').game.getSequence()[0];
    wrapper.instance().handleButtonClick(matchButton);

    expect(wrapper.state().sequenceLength === 2);
  });

  it('reset method resets sequence length', (done) => {
    const wrapper = shallow(<App />);
    wrapper.instance().reset();

    const callback = () => {
      expect(wrapper.state().sequenceLength === wrapper.state().controller.getSequenceLength());
      done();
    };

    wrapper.setState(prevState => prevState, callback);
  });

  it('toggleStrict method', () => {
    const wrapper = shallow(<App />);
    const strict = wrapper.state('strict');
    wrapper.instance().toggleStrict();
    expect(wrapper.state().strict !== strict);
  });
});
