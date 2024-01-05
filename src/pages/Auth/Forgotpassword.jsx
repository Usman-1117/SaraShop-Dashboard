import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/CustomInput";

const ForgotPassword = () => {
  return (
    <>
      <div className="auth-wrapper py-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="auth-card forgot-password-card bg-white my-5 mx-auto">
                <h3 className="py-2">Forgot Password</h3>
                <p className="pb-4">
                  Enter your registered email to reset your password.
                </p>

                {/* Form */}
                <Form>
                  {/* Email */}
                  <CustomInput
                    id="floatingEmail"
                    label="Password"
                    type="email"
                  />

                  {/* Button */}
                  <div
                    className="d-flex flex-column gap-10 
                  align-items-center mt-5"
                  >
                    {/* 1 */}
                    <button type="submit" className="button border-0">
                      Submit
                    </button>
                    {/* 2 */}
                    <Link to="/" className="text-dark py-2">
                      Cancel
                    </Link>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ForgotPassword;
