import { User } from "../models/userModel.js";

// GET all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// PATCH to update user role
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["admin", "coordinator","student"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: `User role updated to ${role}`, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await User.find({ role: "coordinator" }).select("-password");
    res.status(200).json(coordinators);
  } catch (error) {
    console.error("Error fetching coordinators:", error);
    res.status(500).json({ message: "Server error while fetching coordinators" });
  }
};
