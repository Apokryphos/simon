import React from 'react';
import { shallow } from 'enzyme';
import ResetButton from 'Components/ResetButton';

describe('ResetButton rendering', () => {
  it('Renders OK', () => {
    const onClick = () => {};

    const wrapper = shallow(<ResetButton onClick={onClick}/>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props('onClick') === onClick);
  });
});
