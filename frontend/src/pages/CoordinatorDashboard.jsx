import React, { useEffect, useState } from "react";


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
        <div className="h-20 flex items-center justify-center text-2xl font-bold text-indigo-600">
          Coordinator
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="#" className="text-gray-700 hover:text-indigo-600">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600">My Events</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600">Participants</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600">Tasks</a>
          <a href="#" className="text-gray-700 hover:text-red-500">Logout</a>
        </nav>

        {/* User Info at Bottom */}
        <div className="mt-auto p-4 border-t flex items-center space-x-3">
          <div className="text-2xl">👤</div>
          <div className="text-gray-800 font-medium">Admin User {userName}</div>
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

      </main>
    </div>
  );
};

export default CoordinatorDashboard;
