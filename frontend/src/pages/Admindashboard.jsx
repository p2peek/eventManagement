import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

      // `res.data` will be an array of registrations with populated event objects
      const registeredEvents = res.data.map(reg => reg.event);
      setEvents(registeredEvents);
    } catch (error) {
      console.error("Error fetching registered events:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchRegisteredEvents();
}, []);

  // ✅ New: handle register logic
  const handleRegisterClick = (eventId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to register for an event.");
      navigate("/login");
    } else {
      navigate(`/register/${eventId}`);
    }
  };

  const [userName, setUserName] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser){
      const user = JSON.parse(storedUser);
      setUserName(user.name)
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="h-20 flex items-center justify-center text-2xl font-bold text-blue-600">
          Admin Panel
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Manage Events</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Users</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Registrations</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Feedback</a>
          <a href="#" className="text-gray-700 hover:text-red-500">Logout</a>
        </nav>

        {/* User Info at Bottom */}
        <div className="mt-auto p-4 border-t flex items-center space-x-3">
          <div className="text-2xl">👤</div>
          <div className="text-gray-800 font-medium">Admin - {userName}</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analytics.map((item, index) => (
            <div key={index} className={`p-6 rounded-xl shadow-md text-white ${item.color} flex flex-col items-start`}>
              <div className="text-4xl">{item.icon}</div>
              <div className="mt-4 text-lg">{item.title}</div>
              <div className="text-2xl font-bold">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Events Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
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
        {/* List My Registration */}
        <br />
        <br />
        <div className="bg-white rounded-lg shadow-md p-6">
          <section className="flex flex-col items-center justify-center flex-grow px-4 py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">My Registrations</h2>

        {loading ? (
          <p className="text-gray-600">Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-1"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                  <p className="text-gray-600 text-sm mb-3"><strong>Location:</strong> {event.venue}</p>
                  <p className="text-gray-700 text-base mb-4">{event.description}</p>
                  
                  {/* ✅ Button with click handler */}
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
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;

