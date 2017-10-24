import React from 'react';
import { shallow } from 'enzyme';
import Victory from 'Components/Victory';

describe('Victory rendering', () => {
  it('Renders OK', () => {
    const wrapper = shallow(<Victory />);
    expect(wrapper).toMatchSnapshot();
  });
});
