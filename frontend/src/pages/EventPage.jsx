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

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <section className="flex flex-col items-center justify-center flex-grow px-4 py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Upcoming Events</h2>

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
  );
};

export default EventsPage;
