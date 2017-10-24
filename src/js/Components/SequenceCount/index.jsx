import React from 'react';
import PropTypes from 'prop-types';

function SequenceCount(props) {
  return (
    <span className="sequence-count" title="Number of button presses in current sequence.">
      {props.count}
    </span>
  );
}

SequenceCount.propTypes = {
  count: PropTypes.number.isRequired,
};

export default SequenceCount;
