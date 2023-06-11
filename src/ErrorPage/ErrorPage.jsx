import { Fade, Hinge } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className=" text-center align-middle font-extrabold text-8xl ">
        <Fade cascade>404</Fade>
        <Fade delay={1500}>
          <Hinge triggerOnce delay={2500}>
            <p>Error</p>
          </Hinge>
        </Fade>
      </div>
      <Link to="/">
        <button className=" text-white my-20 px-4  py-4 btn-color  font-extrabold md:text-lg rounded-lg ">
          Home Page
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
