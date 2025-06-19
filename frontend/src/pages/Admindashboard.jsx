import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyRegistrations from "../Components/MyRegistrations";
import CreateEventForm from "../Components/CreateEventForm";
import UserManagement from "../Components/UserManagement";
import ManageEvents from "../Components/ManageEvent";




const analytics = [
  { title: "Total Events", value: 25, icon: "🎉", color: "bg-blue-500" },
  { title: "Registrations", value: 350, icon: "🧑‍💻", color: "bg-green-500" },
  { title: "Active Users", value: 120, icon: "👥", color: "bg-purple-500" },
  { title: "Feedbacks", value: 45, icon: "📝", color: "bg-yellow-500" },
];

const recentEvents = [
  { id: 1, name: "Tech Fest 2025", date: "March 10, 2025", participants: 150 },
  { id: 2, name: "Cultural Night", date: "April 5, 2025", participants: 120 },
  { id: 3, name: "Hackathon 24-Hour", date: "June 15, 2025", participants: 80 },
  { id: 4, name: "Photography Workshop", date: "July 8, 2025", participants: 40 },
];

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("/api/registration/my-registrations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="h-20 flex items-center justify-center text-2xl font-bold text-indigo-600">
          Admin Panel
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          {[
            { name: "Dashboard", key: "dashboard" },
            { name: "Manage Events", key: "manage" },
            { name: "Users", key: "users" },
            { name: "Registrations", key: "registrations" },
            { name: "Feedback", key: "feedback" },
            { name: "Create Event", key: "create" },
            { name: "Logout", key: "logout", isLogout: true },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (item.key === "logout") {
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
                  : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
              } hover:scale-[1.02]`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div
          className="mt-auto mb-4 mx-4 flex items-center text-sm px-4 py-2 rounded-lg transition-all duration-200 
               text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 hover:scale-[1.02] cursor-default"
        >
          <span className="text-lg mr-2">👤</span>
          <span className="font-medium">Admin - {userName}</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Events</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Participants
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.participants}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "registrations" && (
          <MyRegistrations events={events} loading={loading} />
        )}

        {/* {activeTab === "manage" && (
          <p className="text-xl text-gray-700">Manage Events section coming soon...</p>
        )} */}

        {activeTab === "manage" && <ManageEvents />}


        {activeTab === "feedback" && (
          <p className="text-xl text-gray-700">Feedback section coming soon...</p>
        )}
        {activeTab === "create" && (<CreateEventForm />)}
        {activeTab === "users" && (<UserManagement />)}
      </main>
    </div>
  );
};

export default AdminDashboard;


