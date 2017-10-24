import React from 'react';
import { shallow } from 'enzyme';
import SequenceCount from 'Components/SequenceCount';

describe('SequenceCount rendering', () => {
  it('Renders OK', () => {
    const wrapper = shallow(<SequenceCount count={0} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props('count') === 0);
  });
});
