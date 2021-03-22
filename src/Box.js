import { React } from 'react';
import { PropTypes } from 'prop-types';

export function Box(props) {
  const { func } = props;
  const { val } = props;
  return (
    <button onClick={func} className="box" type="button">{val}</button>
  );
}

Box.propTypes = {
  func: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
};

export default Box;
