import "./Auth.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import CustomInput from "../../components/CustomInput";

import AuthImg from "../../assets/Auth_img.svg";

const Login = () => {
  return (
    <div className="auth-wrapper">
      <Container>
        <Row>
          <Col lg={6}>
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

          <Col lg={6}>
            <div className="d-none d-md-none d-lg-block overflow-hidden">
              <img
                src={AuthImg}
                alt="Auth Image"
                // className="img-fluid"
                style={{ width: "500px" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
