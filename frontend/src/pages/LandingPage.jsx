import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, []);

  const getDashboardRoute = () => {
    if (userRole === "admin") return "/admin-dashboard";
    if (userRole === "coordinator") return "/coordinator-dashboard";
    if (userRole === "student") return "/student-dashboard";
    return "/login"; // fallback if no role
  };

  const features = [
    {
      title: "Online Registration",
      desc: "Register for events online without paperwork.",
      img: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
      route: "/events",
    },
    {
      title: "QR Code Entry",
      desc: "Use QR codes to streamline check-ins.",
      img: "https://cdn-icons-png.flaticon.com/512/2972/2972911.png",
      route: "/qrcode-entry",
    },
    {
      title: "Dashboard",
      desc: "Manage users and view analytics in real-time.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      route: getDashboardRoute(),
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center w-full px-4 sm:px-8 min-h-screen bg-blue-50">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight w-full">
          Seamless College Event Management
        </h1>
        <p className="text-md sm:text-lg text-gray-600 mb-8 w-full max-w-2xl">
          Organize, register, and track events effortlessly using our all-in-one platform.
        </p>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-4 sm:px-10 py-16 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.route}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center p-6 border hover:border-indigo-400"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-24 h-24 mb-4 object-contain"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full bg-blue-100 py-16 px-4 sm:px-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">About the System</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-base">
          This platform is developed to automate the management of college-level events by providing easy access to event details,
          registration facilities, QR-based attendance, and admin-level controls for better event organization.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
