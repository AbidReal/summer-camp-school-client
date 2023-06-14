import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const SocialLogin = () => {
  const { googleSignInPopUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //   google sign in
  const handleGoogleSignIn = () => {
    googleSignInPopUp()
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);

        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error.message);
        // setError(error.message);
      });
    // setError("");
  };
  return (
    <div>
      <FcGoogle
        onClick={handleGoogleSignIn}
        className=" mt-6 text-5xl text-center mx-auto hover:scale-110 transform transition-all duration-300 ease-in-out"
      />
    </div>
  );
};

export default SocialLogin;
