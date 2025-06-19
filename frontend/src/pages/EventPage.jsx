import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
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
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-indigo-50 px-4 py-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 drop-shadow-md">
          🌟 Upcoming College Events
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Discover exciting opportunities to connect, learn, and grow.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading events...</div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-[350px]"
            >
              <div className="overflow-hidden h-[160px]">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-1">{event.title}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    📅 {new Date(event.date).toDateString()}
                    <br />
                    📍 {event.venue}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {event.description}
                  </p>
                </div>
                <button
                  onClick={() => handleRegisterClick(event._id)}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
