import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ToggleDark from "./ToggleDark";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-gradient-to-r from-nav to-bar ">
      <div className="custom-container">
        <div className="relative flex items-center justify-between">
          <Link to="/" className="flex flex-col gap-4 items-center">
            <div className=" font-extrabold text-4xl ">
              Fist<span className="text-red-500  ">Zen</span>
            </div>
          </Link>
          {/* nav section  */}

          <ul className="items-center hidden space-x-8 lg:flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "default"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/instructors"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "default"
                }
              >
                Instructors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/classes"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "default"
                }
              >
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "default"
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center space-x-4 md:space-x-10">
            <ToggleDark></ToggleDark>
            <button className=" px-4 md:px-7 py-4 btn-color text-white font-extrabold md:text-lg rounded-lg hover:from-btnBar hover:to-btnNav ">
              Login
            </button>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(true)}>
                <Bars3Icon className="w-6"></Bars3Icon>
              </button>
              {/* mobile responsive nav bar */}
              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full z-10">
                  <div className="p-5 bg-red-50 border rounded-lg shadow-sm">
                    {/* logo */}
                    <div className="flex items-center justify-between mg-4">
                      <Link to="/" className="flex flex-col gap-4 items-center">
                        <div className=" font-extrabold text-4xl ">
                          Fist<span className="text-red-500  ">Zen</span>
                        </div>
                      </Link>
                      <ToggleDark></ToggleDark>

                      <button className=" px-4 md:px-7 py-4 btn-color text-white font-extrabold md:text-lg rounded-lg hover:from-btnBar hover:to-btnNav ">
                        Login
                      </button>
                      {/* dropdown close button */}
                      <div>
                        <button onClick={() => setIsMenuOpen(false)}>
                          <XMarkIcon className="w-6"></XMarkIcon>
                        </button>
                      </div>
                    </div>
                    {/* nav items section  */}
                    <nav>
                      <ul className="space-y-4 py-5">
                        <li>
                          <Link
                            to="/"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-red-400"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/instructors"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-red-400"
                          >
                            Instructors
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/classes"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-red-400"
                          >
                            Classes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dashboard"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-red-400"
                          >
                            Dashboard
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
