import React from "react";
import { useNavigate } from "react-router-dom";

const MyRegistrations = ({ events, loading }) => {
  const navigate = useNavigate();

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
    <div className="bg-white rounded-lg shadow-md p-6">
      <section className="flex flex-col items-center justify-center px-4 py-16  rounded-lg">
        <h2 className="text-4xl font-bold text-indigo-700 mb-12">🎟️ My Registrations</h2>

        {loading ? (
          <p className="text-gray-600 text-lg">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600 text-lg italic">No events registered yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      📅 <strong>Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-gray-500 text-sm mb-2">
                      📍 <strong>Location:</strong> {event.venue}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRegisterClick(event._id)}
                    className="mt-auto w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Register Again
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

export default MyRegistrations;
