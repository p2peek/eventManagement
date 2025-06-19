  import React from 'react';
  import { Link, NavLink, useNavigate } from "react-router-dom";
  import { FaUserCircle } from "react-icons/fa"; // You can use any icon library

  function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    };

    return (
      <div className='w-full flex flex-col bg-white'>
        <nav className="w-screen flex flex-wrap justify-between items-center px-6 py-4 shadow-md bg-white">
          <div className="text-2xl font-bold text-blue-600">CollegeEvents</div>

          <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
              }
            >
              Home
            </NavLink>

            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>

            <div className="flex items-center gap-2 mr-5">
              <NavLink
                to={"/events"}
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                Events
              </NavLink>

              <NavLink>
                {token && (
                <FaUserCircle className="text-2xl text-gray-600 hover:text-blue-600 cursor-pointer ml-10 mr-5" title="Profile" />
              )}
              </NavLink>
              
            </div>

            {/* Uncomment when needed */}
            {/* {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-700 hover:text-orange-700">
                  Login
                </NavLink>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center">
                  Register
                </Link>
              </>
            )} */}
          </div>
        </nav>
      </div>
    );
  }

  export default Header;


