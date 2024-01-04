import "./Auth.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-wrapper">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="auth-card bg-white my-3 mx-auto">
              <h3 className="py-2">Login</h3>
              <p className="pb-4">
                Sign in to access your account and continue.
              </p>
              <form>
                {/* Email */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="Email"
                    name="email"
                    autoComplete="email"
                  />
                  <label htmlFor="floatingEmail">Email</label>
                </div>

                {/* Password */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    autoComplete="current-password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                {/* Forgot Password */}
                <div className="text-start my-3">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>

                {/* Button */}
                <div className="d-flex justify-content-center mt-5">
                  {/* 1 */}
                  <button className="button border-0 w-50">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
