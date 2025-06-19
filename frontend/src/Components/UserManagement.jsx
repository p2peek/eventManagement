import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/api/users/all-users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUsers(res.data);
            setFilteredUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateRole = async (id, role) => {
        try {
            await axios.patch(
                `/api/users/update-role/${id}`,
                { role },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            fetchUsers();
        } catch (error) {
            console.error("Failed to update role:", error);
            alert("Failed to update role");
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = users.filter((user) =>
            user.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h2>

            {/* Search Input */}
            <div className="mb-4">


                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by email..."
                    className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 bg-white"
                />

            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-indigo-600 text-white text-left">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Current Role</th>
                            <th className="py-3 px-6">Change Role</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="py-3 px-6">{user.name}</td>
                                <td className="py-3 px-6">{user.email}</td>
                                <td className="py-3 px-6 capitalize">{user.role}</td>
                                <td className="py-3 px-6">
                                    <select
                                        value={user.role}
                                        onChange={(e) => updateRole(user._id, e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    >
                                        <option value="student">Student</option>
                                        <option value="coordinator">Coordinator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
