import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecentEventsTable from "../Components/RecentEvent";
import MyRegistrations from "../Components/MyRegistrations";

const analytics = [
  { title: "Total Events", value: 20, icon: "🎯", color: "bg-blue-500" },
  { title: "Events Registered", value: 6, icon: "✅", color: "bg-green-500" },
  { title: "Upcoming Events", value: 3, icon: "⏳", color: "bg-purple-500" },
];

const StudentDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchRegisteredEvents = async () => {
      try {
        const res = await axios.get("/api/registration/my-registrations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const registeredEvents = res.data.map((reg) => reg.event);
        setEvents(registeredEvents);
      } catch (error) {
        console.error("Error fetching registered events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }
  }, []);

  const handleRegisterClick = (eventId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to register for an event.");
      navigate("/login");
    } else {
      navigate(`/register/${eventId}`);
    }
  };

  const menuItems = [
    { name: "Dashboard", key: "dashboard" },
    { name: "Upcoming Events", key: "upcoming" },
    { name: "My Events", key: "my-events" },
    { name: "Profile", key: "profile" },
    { name: "Logout", key: "logout", isLogout: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="h-20 flex items-center justify-center text-2xl font-bold text-blue-600">
          Student Panel
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (item.isLogout) {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/login");
                } else {
                  setActiveTab(item.key);
                }
              }}
              className={`text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
                item.isLogout
                  ? "text-gray-700 hover:bg-red-100 hover:text-red-600"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              } hover:scale-[1.02]`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div
          className="mt-auto mb-4 mx-4 flex items-center text-sm px-4 py-2 rounded-lg transition-all duration-200 
               text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:scale-[1.02] cursor-default"
        >
          <span className="text-lg mr-2">👤</span>
          <span className="font-medium">Student - {userName}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {analytics.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-md text-white ${item.color} flex flex-col items-start`}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div className="mt-4 text-lg">{item.title}</div>
                  <div className="text-2xl font-bold">{item.value}</div>
                </div>
              ))}
            </div>
            <RecentEventsTable/>
          </>
        )}

        {/* {activeTab === "my-events" && (<RecentEventsTable/>)} */}
        {activeTab === "my-events" && (
                  <MyRegistrations events={events} loading={loading} />
                )}

        {activeTab === "upcoming" && (
          <section className="flex flex-col items-center justify-center flex-grow px-4 py-16 bg-blue-50 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Upcoming Events</h2>

            {loading ? (
              <p className="text-gray-600">Loading events...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                  >
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        <strong>Date:</strong>{" "}
                        {new Date(event.date).toDateString()}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        <strong>Location:</strong> {event.venue}
                      </p>
                      <p className="text-gray-700 text-base mb-4">
                        {event.description}
                      </p>

                      <button
                        onClick={() => handleRegisterClick(event._id)}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>
            <p className="text-gray-700">Name: {userName}</p>
            {/* Add more profile fields here if needed */}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
