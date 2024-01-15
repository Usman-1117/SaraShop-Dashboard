import "./Auth.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";

import CustomInput from "../../components/CustomInput";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // console.log(user);
    if (user || isSuccess) {
      navigate("/dashboard");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);
  return (
    <div className="auth-wrapper">
      <Container>
        <Row>
          <Col>
            <div className="auth-card bg-white my-3 mx-auto">
              <h3 className="page-title py-2">Login</h3>
              <p className="sub-heading pb-4">
                Sign in to access your account and continue.
              </p>
              <div className="error text-center">
                {message.message == "Rejected" ? "You are not an Admin" : ""}
              </div>

              <Form onSubmit={formik.handleSubmit}>
                {/* Email */}
                <CustomInput
                  id="floatingEmail"
                  label="Email"
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  autoComplete="email"
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email ? (
                    <p>{formik.errors.email}</p>
                  ) : null}
                </div>

                {/* Password */}
                <CustomInput
                  id="floatingPassword"
                  label="Password"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password ? (
                    <p>{formik.errors.password}</p>
                  ) : null}
                </div>

                {/* Forgot Password */}
                <div className="text-start my-3">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>

                {/* Button */}
                <div>
                  <button type="submit" className="button border-0 w-50 my-2">
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
