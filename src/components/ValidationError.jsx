import PropTypes from "prop-types";

const ValidationError = ({ touched, errors }) => {
  return touched && errors ? (
    <div className="error text-danger mt-1">{errors}</div>
  ) : null;
};

ValidationError.propTypes = {
  touched: PropTypes.bool,
  errors: PropTypes.string,
};

export default ValidationError;
