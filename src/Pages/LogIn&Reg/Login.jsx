import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { AuthContext } from "../../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (location.state && location.state.error) {
      toast.error(location.state.error);
    }
  }, [location.state]);

  const handleLogin = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
        window.location.reload();
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    setError("");
  };

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
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email")}
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
                      {...register("password")}
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      type="button" // Add type="button" to prevent form submission
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
              <p className="text-red-500 ">{error}</p>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-color text-white"
                />
              </div>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
