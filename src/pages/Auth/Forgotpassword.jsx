import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="auth-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card forgot-password-card bg-white my-5 mx-auto">
                <h3 className="py-2">Forgot Password</h3>
                <p className="pb-4">
                  Enter your registered email to reset your password.
                </p>

                {/* Form */}
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

                  {/* Button */}
                  <div
                    className="d-flex flex-column gap-10 text-center 
                  align-items-center justify-content-center mt-5"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
