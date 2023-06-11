import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { setTheme } from "../../theme";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    setIsDarkMode(currentTheme === "dark");
    setTheme(currentTheme); // Set initial theme from local storage
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme = newMode ? "dark" : "light";
      localStorage.setItem("theme", theme);
      setTheme(theme); // Update theme dynamically
      return newMode;
    });
  };

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
                to="/applied-jobs"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "default"
                }
              >
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "default"
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center space-x-4 md:space-x-10">
            {/* Dark Mode toggle  */}
            <div
              className={` rounded-full p-2 hover:cursor-pointer ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <BsMoonStarsFill /> : <BsSun />}
            </div>
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
                            to="/statistics"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-red-400"
                          >
                            Instructors
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/applied-jobs"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-red-400"
                          >
                            Classes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/blog"
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
