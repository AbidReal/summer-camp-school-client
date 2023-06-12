import { Link } from "react-router-dom";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
  };

  //pass section
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row custom-container gap-10">
          <div className="text-center lg:text-left w-96 mx-10">
            <img src="https://cdn-icons-png.flaticon.com/512/5901/5901842.png" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
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
                  <p className="mx-auto text-center mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                      className="text-red-700 hover:underline "
                      to="/registration"
                    >
                      Register
                    </Link>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-color text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
