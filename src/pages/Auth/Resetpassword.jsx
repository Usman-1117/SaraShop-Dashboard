const ResetPassword = () => {
  return (
    <div className="auth-wrapper py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="auth-card bg-white my-3 mx-auto">
              <h3 className="py-2">Reset Password</h3>
              <p className="pb-4">Please enter your new password.</p>
              <form>
                {/* Password */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    autoComplete="new-password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                {/* Confirm Password */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingConfPassword"
                    placeholder="Confirm Password"
                    name="confpassword"
                    autoComplete="new-password"
                  />
                  <label htmlFor="floatingConfPassword">Confirm Password</label>
                </div>

                {/* Button */}
                <div className="py-3">
                  <button className="button border-0 w-50">Enter</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
