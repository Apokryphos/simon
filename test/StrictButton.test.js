import React from 'react';
import { shallow } from 'enzyme';
import StrictButton from 'Components/StrictButton';

describe('StrictButton rendering', () => {
  it('Renders OK', () => {
    const onClick = () => {};

    const wrapper = shallow(<StrictButton enabled onClick={onClick} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props('enabled') === true);
    expect(wrapper.props('onClick') === onClick);
  });
});
