import { Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/CustomInput";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword = () => {
  return (
    <div className="auth-wrapper py-5">
      <Container>
        <Row>
          <Col>
            <div className="auth-card bg-white my-3 mx-auto">
              <h3 className="page-title py-2">Reset Password</h3>
              <p className="sub-heading pb-4">
                Please enter your new password.
              </p>
              <Form>
                {/* Password */}
                <CustomInput
                  id="floatingPassword"
                  label="Password"
                  type="password"
                />

                {/* Confirm Password */}

                <CustomInput
                  id="floatingConfPassword"
                  label="Confirm Password"
                  type="password"
                />

                {/* Button */}
                <div className="py-3">
                  <button className="button border-0 w-50">Enter</button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
