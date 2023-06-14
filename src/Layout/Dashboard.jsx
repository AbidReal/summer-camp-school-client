import { BiAddToQueue } from "react-icons/bi";
import {
  FaChalkboardTeacher,
  FaShoppingCart,
  FaUserCheck,
  FaUserEdit,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  // const isAdmin = true;
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
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
            {isAdmin && (
              <>
                <li className=" mt-4">
                  <NavLink
                    to="manage-classes"
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-400 border border-red-400  rounded-xl"
                        : "border rounded-xl"
                    }
                  >
                    <FaChalkboardTeacher /> Manage Classes
                  </NavLink>
                </li>
                <li className=" mt-4">
                  <NavLink
                    to="manage-users"
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-400 border border-red-400  rounded-xl"
                        : "border rounded-xl "
                    }
                  >
                    <FaUserEdit /> Manage Users
                  </NavLink>
                </li>
              </>
            )}
            {isInstructor && (
              <>
                <li className=" mt-4">
                  <NavLink
                    to="add-a-class"
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-400 border border-red-400  rounded-xl"
                        : "border rounded-xl"
                    }
                  >
                    <BiAddToQueue /> Add a Class
                  </NavLink>
                </li>
                <li className=" mt-4">
                  <NavLink
                    to="instructor-classes"
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-400 border border-red-400  rounded-xl"
                        : "border rounded-xl "
                    }
                  >
                    <FaUserEdit /> My Classes
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && !isInstructor && (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
