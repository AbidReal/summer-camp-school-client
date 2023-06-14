import { FaShoppingCart, FaUserCheck } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center ">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-color text-white drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side bg-black glass">
          <label htmlFor="my-drawer-2" className="drawer-overlay "></label>

          <ul className="menu  p-4 lg:py-10 w-80 h-full    text-white ">
            {/* Sidebar content here */}
            <li className=" mt-4">
              <NavLink
                to="my-selected-classes"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-400 border border-red-400  rounded-xl"
                    : "border rounded-xl"
                }
              >
                <FaShoppingCart /> My Selected Classes
              </NavLink>
            </li>
            <li className=" mt-4">
              <NavLink
                to="my-enrolled-classes"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-400 border border-red-400  rounded-xl"
                    : "border rounded-xl "
                }
              >
                <FaUserCheck /> My Enrolled Classes
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
