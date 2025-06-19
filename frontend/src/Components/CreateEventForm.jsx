// import React, { useState } from "react";
// import axios from "axios";

// const CreateEventForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     venue: "",
//     date: "",
//     time: "",
//     imageUrl: "",
//     maxParticipants: "",
//   });

//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const res = await axios.post("/api/events/createEvent", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessage("Event created successfully!");
//       setFormData({
//         title: "",
//         description: "",
//         venue: "",
//         date: "",
//         time: "",
//         imageUrl: "",
//         maxParticipants: "",
//       });
//     } catch (error) {
//       setMessage("Failed to create event: " + error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
//       {message && <p className="mb-4 text-sm text-center text-blue-600">{message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {[
//           { name: "title", label: "Title" },
//           { name: "description", label: "Description" },
//           { name: "venue", label: "Venue" },
//           { name: "date", label: "Date", type: "date" },
//           { name: "time", label: "Time", type: "time" },
//           { name: "imageUrl", label: "Image URL" },
//           { name: "maxParticipants", label: "Max Participants", type: "number" },
//         ].map(({ name, label, type = "text" }) => (
//           <div key={name}>
//             <label className="block text-sm font-medium text-gray-700">{label}</label>
//             <input
//               type={type}
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-300"
//             />
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
//         >
//           Create Event
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEventForm;


import React, { useState } from "react";
import axios from "axios";

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    imageUrl: "",
    maxParticipants: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("/api/events/createEvent", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        venue: "",
        date: "",
        time: "",
        imageUrl: "",
        maxParticipants: "",
      });
    } catch (error) {
      setMessage("Failed to create event: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      {message && <p className="mb-4 text-sm text-center text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "title", label: "Title" },
          { name: "description", label: "Description" },
          { name: "venue", label: "Venue" },
          { name: "date", label: "Date", type: "date" },
          { name: "time", label: "Time", type: "time" },
          { name: "imageUrl", label: "Image URL" },
          { name: "maxParticipants", label: "Max Participants", type: "number" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
