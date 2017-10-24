import React from 'react';
import { mount, shallow } from 'enzyme';
import Game from 'Game';
import GameButton from 'Components/GameButton';
import GameController from 'GameController';

describe('GameButton rendering', () => {
  it('Renders OK', () => {
    const gameController = new GameController(new Game());
    const wrapper = shallow(<GameButton buttonIndex={0} gameController={gameController} onClick={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Button ref OK', () => {
    const gameController = new GameController(new Game());
    const wrapper = mount(<GameButton buttonIndex={0} gameController={gameController} onClick={() => {}} />);
    expect(wrapper.ref('button') !== null);
  });

  it('activateButton', () => {
    const wrapper = shallow(<GameButton
      buttonIndex={0}
      gameController={new GameController(new Game())}
      onClick={() => {}}
    />);

    //  Shouldn't activate with wrong index specified
    wrapper.instance().activateButton(1, true);
    expect(wrapper.state('activated') === false);

    expect(wrapper.state('activated') === false);
    wrapper.instance().activateButton(0, true);
    expect(wrapper.state('activated') === true);
  });

  it('componentDidMount', () => {
    const wrapper = mount(<GameButton
      buttonIndex={0}
      gameController={new GameController(new Game())}
      onClick={() => {}}
    />);

    expect(wrapper.instance().button);
    expect(() => wrapper.unmount());
    expect(wrapper.instance().button === null);
  });

  it('componentWillUnmount', () => {
    const wrapper = mount(<GameButton
      buttonIndex={0}
      gameController={new GameController(new Game())}
      onClick={() => {}}
    />);

    expect(wrapper.instance().button);
    expect(() => wrapper.instance().componentWillUnmount()).not.toThrow();
  });

  it('onClick gets button index', (done) => {
    const wrapper = shallow(<GameButton
      buttonIndex={2}
      gameController={new GameController(new Game())}
      onClick={(buttonIndex) => {
          expect(buttonIndex === 2);
          done();
        }}
    />);

    wrapper.find('button').simulate('click');
  });

  it('pulseAnimationEnd', () => {
    const wrapper = shallow(<GameButton
      buttonIndex={0}
      gameController={new GameController(new Game())}
      onClick={() => {}}
    />);

    wrapper.instance().activateButton(0, false);
    expect(wrapper.state('activated') === true);

    wrapper.instance().pulseAnimationEnd();
    expect(wrapper.state('activated') === false);
  });
});
