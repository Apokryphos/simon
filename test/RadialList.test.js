import React from 'react';
import { shallow } from 'enzyme';
import Game from 'Game';
import GameController from 'GameController';
import RadialList from 'Components/RadialList';

describe('RadialList rendering', () => {
  it('Renders OK', () => {
    const wrapper = shallow(<RadialList
      gameController={
          new GameController(new Game(4, () => 0))
        }
      onClick={() => {}}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
