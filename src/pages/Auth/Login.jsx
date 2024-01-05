import "./Auth.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/CustomInput";

const Login = () => {
  return (
    <div className="auth-wrapper">
      <Container>
        <Row>
          <Col>
            <div className="auth-card bg-white my-3 mx-auto">
              <h3 className="py-2">Login</h3>
              <p className="pb-4">
                Sign in to access your account and continue.
              </p>

              <Form>
                {/* Email */}
                <CustomInput
                  id="floatingEmail"
                  label="Email"
                  type="email"
                  className=""
                />

                {/* Password */}
                <CustomInput
                  id="floatingPassword"
                  label="Password"
                  type="password"
                />

                {/* Forgot Password */}
                <div className="text-start my-3">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>

                {/* Button */}
                <div>
                  <button type="submit" className="button border-0 w-50 mt-4">
                    Login
                  </button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
