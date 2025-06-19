
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import MyRegistrations from "../Components/MyRegistrations"; 

// const analytics = [
//   { title: "Events Managed", value: 5, icon: "📅", color: "bg-indigo-500" },
//   { title: "Registrations", value: 240, icon: "🧑‍🤝‍🧑", color: "bg-green-500" },
//   { title: "Pending Tasks", value: 3, icon: "📝", color: "bg-yellow-500" },
// ];

// const yourEvents = [
//   { id: 1, name: "Tech Fest 2025", date: "March 10, 2025", registered: 150 },
//   { id: 2, name: "Photography Workshop", date: "July 8, 2025", registered: 40 },
//   { id: 3, name: "Hackathon 24-Hour Challenge", date: "June 15, 2025", registered: 80 },
// ];

// const CoordinatorDashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userName, setUserName] = useState(null);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRegisteredEvents = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await axios.get("/api/registration/my-registrations", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const registeredEvents = res.data.map((reg) => reg.event);
//         setEvents(registeredEvents);
//       } catch (error) {
//         console.error("Error fetching registered events:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRegisteredEvents();
//   }, []);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUserName(user.name);
//     }
//   }, []);

//   const handleRegisterClick = (eventId) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("You must be logged in to register for an event.");
//       navigate("/login");
//     } else {
//       navigate(`/register/${eventId}`);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
//         {/* Top Header */}
//         <div className="h-20 flex items-center justify-center text-2xl font-bold text-indigo-600">
//           Coordinator
//         </div>

//         {/* Navigation Items */}
//         <nav className="flex flex-col p-4 space-y-2">
//           {[
//             { name: "Dashboard", key: "dashboard" },
//             { name: "My Events", key: "my-events" },
//             { name: "Participants", key: "participants" },
//             { name: "Tasks", key: "tasks" },
//             { name: "Logout", key: "logout", isLogout: true },
//           ].map((item, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 if (item.key === "logout") {
//                   localStorage.removeItem("token");
//                   localStorage.removeItem("user");
//                   navigate("/login");
//                 } else {
//                   setActiveTab(item.key);
//                 }
//               }}
//               className={`text-left text-sm px-4 py-2 rounded-lg transition-all duration-200 w-full ${
//                 item.isLogout
//                   ? "text-gray-700 hover:bg-red-100 hover:text-red-600"
//                   : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
//               } hover:scale-[1.02]`}

              

//             >
//               {item.name}
//             </button>
//           ))}
//         </nav>

//         {/* User Info Block at Bottom */}
//         <div
//           className="mt-auto mb-4 mx-4 flex items-center text-sm px-4 py-2 rounded-lg transition-all duration-200 
//                text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 hover:scale-[1.02] cursor-default"
//         >
//           <span className="text-lg mr-2">👤</span>
//           <span className="font-medium">Coordinator - {userName}</span>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {activeTab === "dashboard" && (
//           <>
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">My Dashboard</h1>

//             {/* Analytics Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {analytics.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`p-6 rounded-xl shadow-md text-white ${item.color} flex flex-col items-start`}
//                 >
//                   <div className="text-4xl">{item.icon}</div>
//                   <div className="mt-4 text-lg">{item.title}</div>
//                   <div className="text-2xl font-bold">{item.value}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Your Events Table */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">My Events</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Event Name
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Registrations
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {yourEvents.map((event) => (
//                       <tr key={event.id}>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                           {event.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                           {event.date}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                           {event.registered}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}

//         {activeTab === "my-events" && (
//           <MyRegistrations events={events} loading={loading} />
//         )}

//         {activeTab === "participants" && (
//           <p className="text-xl text-gray-700">Participants section coming soon...</p>
//         )}

//         {activeTab === "tasks" && (
//           <p className="text-xl text-gray-700">Tasks section coming soon...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CoordinatorDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MyRegistrations from "../Components/MyRegistrations"; // Adjust the path if needed



const analytics = [
  { title: "Events Managed", value: 5, icon: "📅", color: "bg-indigo-500" },
  { title: "Registrations", value: 240, icon: "🧑‍🤝‍🧑", color: "bg-green-500" },
  { title: "Pending Tasks", value: 3, icon: "📝", color: "bg-yellow-500" },
];

const yourEvents = [
  { id: 1, name: "Tech Fest 2025", date: "March 10, 2025", registered: 150 },
  { id: 2, name: "Photography Workshop", date: "July 8, 2025", registered: 40 },
  { id: 3, name: "Hackathon 24-Hour Challenge", date: "June 15, 2025", registered: 80 },
];

const CoordinatorDashboard = () => {

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
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name)
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        {/* Top Header */}
        <div className="h-20 flex items-center justify-center text-2xl font-bold text-indigo-600">
          Coordinator
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col p-4 space-y-2">
          {[
            { name: "Dashboard", href: "#"},
            { name: "My Events", href: "#",},
            { name: "Participants", href: "#",},
            { name: "Tasks", href: "#",},
            { name: "Logout", href: "#", isLogout: true },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}

              className={`text-sm px-4 py-2 rounded-lg transition-all duration-200 ${item.isLogout
                ? "text-gray-700 hover:bg-red-100 hover:text-red-600"
                : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                } hover:scale-[1.02]`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* User Info Block at Bottom */}
        <div
          className="mt-auto mb-4 mx-4 flex items-center text-sm px-4 py-2 rounded-lg transition-all duration-200 
               text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 hover:scale-[1.02] cursor-default"
        >
          <span className="text-lg mr-2">👤</span>
          <span className="font-medium">Coordinator - {userName}</span>
        </div>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Dashboard</h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {analytics.map((item, index) => (
            <div key={index} className={`p-6 rounded-xl shadow-md text-white ${item.color} flex flex-col items-start`}>
              <div className="text-4xl">{item.icon}</div>
              <div className="mt-4 text-lg">{item.title}</div>
              <div className="text-2xl font-bold">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Your Events Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrations</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {yourEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.registered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <br />
        <br />

        {/* List My Registration */}
        <MyRegistrations events={events} loading={loading} />
      </main>
    </div>
  );
};

export default CoordinatorDashboard;


