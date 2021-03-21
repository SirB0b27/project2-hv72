import { React } from 'react';
import { PropTypes } from 'prop-types';

export function Box(props) {
  const { func } = props;
  const { val } = props;
  const { handleKeyDown } = this;
  return (
    <div onClick={func} className="box" onKeyDown={handleKeyDown} role="button" tabIndex="0">
      {val}
    </div>
  );
}

Box.propTypes = {
  func: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
};

export default Box;
