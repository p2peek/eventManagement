import React from "react";

const analytics = [
  { title: "Total Events", value: 20, icon: "🎯", color: "bg-blue-500" },
  { title: "Events Registered", value: 6, icon: "✅", color: "bg-green-500" },
  { title: "Upcoming Events", value: 3, icon: "⏳", color: "bg-purple-500" },
];

const registeredEvents = [
  { id: 1, name: "Tech Fest 2025", date: "March 10, 2025", status: "Upcoming" },
  { id: 2, name: "Photography Workshop", date: "July 8, 2025", status: "Upcoming" },
  { id: 3, name: "Cultural Night", date: "April 5, 2025", status: "Completed" },
];

const StudentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="h-20 flex items-center justify-center text-2xl font-bold text-blue-600">
          Student Panel
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Upcoming Events</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">My Events</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Profile</a>
          <a href="#" className="text-gray-700 hover:text-red-500">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h1>

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

        {/* Registered Events Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Registered Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registeredEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{event.status}</td>
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

export default StudentDashboard;
