import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coordinators, setCoordinators] = useState([]);

    useEffect(() => {
        fetchEvents();
        fetchCoordinators();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get("/api/events");
            setEvents(res.data);
        } catch (err) {
            console.error("Failed to fetch events", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCoordinators = async () => {
        try {
            const res = await axios.get("/api/users/coordinators", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const onlyCoordinators = res.data.filter((u) => u.role === "coordinator");
            setCoordinators(onlyCoordinators);
        } catch (err) {
            console.error("Failed to fetch coordinators", err);
        }
    };

    const deleteEvent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        try {
            await axios.delete(`/api/events/deleteEvent/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            fetchEvents();
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    const updateEvent = (eventId) => {
        navigate(`/admin/edit-event/${eventId}`);
    };

    const assignCoordinator = async (eventId, coordinatorId) => {
        try {
            await axios.patch(
                `/api/events/assign-coordinators/${eventId}`,
                { coordinatorId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Coordinator assigned successfully");
            fetchEvents(); // refresh to show updated list
        } catch (err) {
            console.error("Failed to assign coordinator", err);
        }
    };
    const removeCoordinator = async (eventId, coordinatorId) => {
        try {
            await axios.patch(
                `/api/events/remove-coordinator/${eventId}`,
                { coordinatorId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Coordinator removed successfully");
            fetchEvents(); // refresh
        } catch (err) {
            console.error("Failed to remove coordinator", err);
        }
    };

    if (loading)
        return <p className="text-center mt-10 text-gray-600">Loading events...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700">Manage Events</h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
                <table className="min-w-full text-sm text-left text-gray-800">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Venue</th>
                            <th className="py-3 px-4">Assigned Coordinators</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((ev) => (
                            <tr key={ev._id} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{ev.title}</td>
                                <td className="py-3 px-4">{new Date(ev.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4">{ev.venue}</td>
                                <td className="py-3 px-4">
                                    <ul className="list-disc list-inside space-y-1">
                                        {ev.coordinators && ev.coordinators.length > 0 ? (
                                            ev.coordinators.map((coordId) => {
                                                const coord = coordinators.find((c) => c._id === coordId);
                                                return (
                                                    <li key={coordId} className="flex justify-between items-center">
                                                        <span>{coord ? coord.name : "Unknown"}</span>
                                                        <button
                                                            onClick={() => removeCoordinator(ev._id, coordId)}
                                                            className="text-red-500 hover:underline ml-2 text-xs"
                                                        >
                                                            Remove
                                                        </button>
                                                    </li>
                                                );
                                            })
                                        ) : (
                                            <span className="text-gray-500 italic">None</span>
                                        )}
                                    </ul>

                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <button
                                            onClick={() => updateEvent(ev._id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteEvent(ev._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <select
                                        onChange={(e) => assignCoordinator(ev._id, e.target.value)}
                                        defaultValue=""
                                        className="w-full mt-1 border border-gray-300 rounded-md px-2 py-1 text-sm"
                                    >
                                        <option value="" disabled>
                                            Assign Coordinator
                                        </option>
                                        {coordinators.map((coord) => (
                                            <option key={coord._id} value={coord._id}>
                                                {coord.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {events.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No events found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageEvents;
