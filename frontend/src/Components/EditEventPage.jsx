// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditEvent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [eventData, setEventData] = useState({
//     title: "",
//     description: "",
//     venue: "",
//     date: "",
//     time: "",
//     imageUrl: "",
//     maxParticipants: 100,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEventDetails();
//   }, []);

//   const fetchEventDetails = async () => {
//     try {
//       const res = await axios.post(`/api/events/findEvent/${id}`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const { title, description, venue, date, time, imageUrl, maxParticipants } = res.data;
//       setEventData({
//         title,
//         description,
//         venue,
//         date: date.slice(0, 10), // Format for input type="date"
//         time,
//         imageUrl,
//         maxParticipants,
//       });
//     } catch (err) {
//       console.error("Failed to fetch event", err);
//       alert("Unable to load event details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/api/events/updateEvent/${id}`, eventData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Event updated successfully");
//       navigate("/admin/manage-events"); // Go back to manage page
//     } catch (err) {
//       console.error("Failed to update event", err);
//       alert("Error updating event");
//     }
//   };

//   if (loading) return <p>Loading event...</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Event</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {["title", "description", "venue", "imageUrl", "time"].map((field) => (
//           <div key={field}>
//             <label className="block text-sm font-medium text-gray-700">
//               {field.charAt(0).toUpperCase() + field.slice(1)}
//             </label>
//             <input
//               type="text"
//               name={field}
//               value={eventData[field]}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//               required
//             />
//           </div>
//         ))}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Date</label>
//           <input
//             type="date"
//             name="date"
//             value={eventData.date}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Max Participants</label>
//           <input
//             type="number"
//             name="maxParticipants"
//             value={eventData.maxParticipants}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//             min="1"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
//         >
//           Update Event
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditEvent;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    imageUrl: "",
    maxParticipants: 100,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const res = await axios.post(`/api/events/findEvent/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { title, description, venue, date, time, imageUrl, maxParticipants } = res.data;
      setEventData({
        title,
        description,
        venue,
        date: date.slice(0, 10),
        time,
        imageUrl,
        maxParticipants,
      });
    } catch (err) {
      console.error("Failed to fetch event", err);
      alert("Unable to load event details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/events/updateEvent/${id}`, eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Event updated successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Failed to update event", err);
      alert("Error updating event");
    }
  };

  if (loading) return <p>Loading event...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description", "venue", "imageUrl", "time"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={eventData[field]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Participants</label>
          <input
            type="number"
            name="maxParticipants"
            value={eventData.maxParticipants}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-800"
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
