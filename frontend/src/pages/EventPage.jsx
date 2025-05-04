import React from "react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Tech Fest 2025",
    date: "March 10, 2025",
    location: "Auditorium Hall",
    description: "A grand festival showcasing tech innovations, coding competitions, and workshops.",
    image: "https://images.unsplash.com/photo-1581092580492-ff9c3c47ae1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "April 5, 2025",
    location: "Open Ground",
    description: "An evening filled with dance, music, drama, and cultural performances by students.",
    image: "https://images.unsplash.com/photo-1515165562835-c9203f2a51b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "Alumni Meet 2025",
    date: "May 20, 2025",
    location: "Conference Center",
    description: "A meet and greet event for college alumni, with discussions and networking.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    title: "Hackathon 24-Hour Challenge",
    date: "June 15, 2025",
    location: "Innovation Lab",
    description: "A non-stop 24-hour coding and hacking marathon for tech enthusiasts.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    title: "Photography Workshop",
    date: "July 8, 2025",
    location: "Room 402",
    description: "Learn professional photography skills from top industry experts.",
    image: "https://images.unsplash.com/photo-1504890001756-758bba39b9b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    title: "Entrepreneurship Bootcamp",
    date: "August 12, 2025",
    location: "Business Incubation Center",
    description: "An intensive camp to build business models, pitching skills, and startups.",
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
];

const EventsPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      

      {/* Events List */}
      <section className="flex flex-col items-center justify-center flex-grow px-4 py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Upcoming Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <img
                src={event.image}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-1"><strong>Date:</strong> {event.date}</p>
                <p className="text-gray-600 text-sm mb-3"><strong>Location:</strong> {event.location}</p>
                <p className="text-gray-700 text-base">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default EventsPage;
