import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";

const Registration = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);
  return (
    <div className="">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row custom-container">
          <div className="text-center lg:text-left">
            <img src="https://i.ibb.co/GnXJkzL/martial-arts-taekwondo-cartoon.png" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <div className="relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="input input-bordered pr-[120px]"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {passwordVisible ? (
                        <BiShow size={20} />
                      ) : (
                        <BiHide size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="confirm-password"
                  placeholder="Confirm Password"
                  className={`input input-bordered ${
                    passwordMatch ? "" : "border-red-500"
                  }`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {passwordMatch ? null : (
                  <div className="text-xs text-red-500">
                    Password do not match.
                  </div>
                )}
                <label className="label">
                  <p>
                    Already have an account?{" "}
                    <Link className="text-red-700 hover:underline " to="/login">
                      Login
                    </Link>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Register"
                  className={`btn btn-color text-white ${
                    passwordMatch ? "" : "opacity-75  pointer-events-none"
                  }`}
                  disabled={!passwordMatch}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
