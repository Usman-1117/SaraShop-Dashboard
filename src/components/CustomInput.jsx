import PropTypes from "prop-types";
import { FloatingLabel, Form } from "react-bootstrap";

const CustomInput = ({
  type,
  className,
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  autoComplete = "off",
  touched,
  errors,
}) => {
  return (
    <div className={`mb-3 ${className}`}>
      <FloatingLabel controlId={id} label={label}>
        <Form.Control
          type={type}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          isInvalid={touched && !!errors}
        />
        <Form.Control.Feedback type="invalid" style={{ fontSize: "14px" }}>
          {errors}
        </Form.Control.Feedback>
      </FloatingLabel>
    </div>
  );
};

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  touched: PropTypes.bool,
  errors: PropTypes.string,
};

export default CustomInput;
