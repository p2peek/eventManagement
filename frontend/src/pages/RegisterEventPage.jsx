import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterEventPage = () => {
  const { id } = useParams(); // event ID from URL
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // assumed login token is stored in localStorage
  const user = JSON.parse(localStorage.getItem("user")); // ✅ NEW: get user from localStorage

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.post(`/api/events/findEvent/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleRegister = async () => {
    try {
      await axios.post(
        `/api/registration/register/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Successfully registered!");

      // ✅ ROLE-BASED REDIRECTION
      if (user?.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user?.role === "coordinator") {
        navigate("/coordinator-dashboard");
      } else if (user?.role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/unauthorized"); // fallback
      }

    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Failed to register. Maybe already registered?");
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-red-600 text-xl">
        Please log in to register for an event.
      </div>
    );
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">{event.title}</h2>
      <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover rounded mb-4" />
      <p className="text-gray-700 mb-2"><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
      <p className="text-gray-700 mb-2"><strong>Venue:</strong> {event.venue}</p>
      <p className="text-gray-700 mb-4"><strong>Description:</strong> {event.description}</p>
      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Register for Event
      </button>
    </div>
  );
};

export default RegisterEventPage;
