import { useContext, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "./SocialLogin";

const Registration = () => {
  //confirm pass section
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  // const [emptyPassword, setEmptyPassword] = useState("");
  const [emptyMail, setEmptyMail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState("");

  const handleEmptyEmail = (e) => {
    const email = e.target.value;
    setEmptyMail(email);
  };

  // const handleEmptyPassword = (e) => {
  //   const password = e.target.value;
  //   setEmptyPassword(password);
  // };

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

  useEffect(() => {
    setPasswordErrors(validatePassword(password));
  }, [password]);

  const validatePassword = (password) => {
    if (password.length > 0 && password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (password.length > 0 && !/[A-Z]/.test(password)) {
      return "Password must contain at least one capital letter.";
    }
    if (password.length > 0 && !/[\W_]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { createUser, userProfile } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const from = location.state?.from?.pathname || "/login";

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setPasswordErrors(passwordErrors);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        userProfile(name, photo)
          .then(() => {
            const saveUser = { name: name, email: email };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  navigate(from, { replace: true });
                }
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    setError("");
  };

  const formValid = emptyMail !== "" && password !== "" && passwordMatch;

  return (
    <div className="">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row custom-container">
          <div className="text-center lg:text-left">
            <img src="https://i.ibb.co/GnXJkzL/martial-arts-taekwondo-cartoon.png" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                />
                <label className="label">
                  <span className="label-text">
                    Email<sup className="sup">*</sup>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={handleEmptyEmail}
                />
              </div>
              <div className="form-control">
                <div className="relative">
                  <label className="label">
                    <span className="label-text">
                      Password<sup className="sup">*</sup>
                    </span>
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
                    Passwords do not match.
                  </div>
                )}
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                <label className="label">
                  <p>
                    Already have an account?{" "}
                    <Link className="text-red-700 hover:underline" to="/login">
                      Login
                    </Link>
                  </p>
                </label>
                <p className="text-red-500 ">{error}</p>
                {password !== "" && passwordErrors && (
                  <div className="text-xs text-red-500">{passwordErrors}</div>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Register"
                  className={`btn btn-color text-white ${
                    formValid ? "" : "btn-disabled"
                  }`}
                  disabled={!formValid}
                />
              </div>
              <div className="divider">or</div>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
