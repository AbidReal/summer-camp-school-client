import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";

const Main = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen ">
        <div className="flex-grow">
          <Outlet></Outlet>
        </div>

        <Footer className="mt-auto"></Footer>
      </div>
    </div>
  );
};

export default Main;
