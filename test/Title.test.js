import React from 'react';
import { shallow } from 'enzyme';
import Title from 'Components/Title';

describe('Title rendering', () => {
  it('Renders OK', () => {
    const wrapper = shallow(<Title />);
    expect(wrapper).toMatchSnapshot();
  });
});
