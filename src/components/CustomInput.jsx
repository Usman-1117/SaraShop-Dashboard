import PropTypes from "prop-types";
import { FloatingLabel, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomInput = ({
  type,
  className,
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  autoComplete,
}) => {
  return (
    <FloatingLabel controlId={id} label={label} className={`mt-3 ${className}`}>
      <Form.Control
        type={type}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
      />
    </FloatingLabel>
  );
};

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
};

export default CustomInput;
