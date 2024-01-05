import PropTypes from "prop-types";
import { FloatingLabel, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomInput = ({ type, className, id, label }) => {
  return (
    <FloatingLabel controlId={id} label={label} className={`mb-3 ${className}`}>
      <Form.Control type={type} placeholder={label} />
    </FloatingLabel>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};

export default CustomInput;
