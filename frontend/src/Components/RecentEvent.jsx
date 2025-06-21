import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentEventsTable = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get("/api/registration/my-registrations", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setEvents(res.data);
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents(); // ← THIS is essential
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Events</h2>
            <div className="overflow-x-auto">
                {loading ? (
                    <p className="text-gray-500">Loading events...</p>
                ) : (
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Event
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Max Participants
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {events.map((event) => (
                                <tr key={event._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {event.event?.title || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {event.event?.date
                                            ? new Date(event.event.date).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })
                                            : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {event.event?.maxParticipants ?? "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default RecentEventsTable;
