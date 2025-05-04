import { User } from "../models/userModel.js";
import { Event } from "../models/event.Model.js";


export const createEventAdmin = async (req, res) => {
    try {
        const {
            title,
            description,
            venue,
            date,
            time,
            imageUrl,
            maxParticipants,
        } = req.body;

        const newEvent = new Event({
            title,
            description,
            venue,
            date,
            time,
            imageUrl,
            maxParticipants,
            createdBy: req.user.id, // assuming req.user is populated from auth middleware
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to create event", message: error.message });
    }
};
// @desc Update an event
export const updateEvent = async (req, res) => {
    try {
        const updatedData = {
            ...req.body,
            updatedBy: req.user._id, // tracked automatically
        };

        const event = await Event.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to update event", message: error.message });
    }
};

// @desc Get single event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("createdBy updatedBy", "name email");

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event", message: error.message });
    }
};

// @desc Delete an event
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event", message: error.message });
    }
};

export const listEvents = async (req, res) => {
    try {
      const events = await Event.find()
        .populate("createdBy", "name email")  // show creator's name & email
        .populate("updatedBy", "name email")  // show updater's name & email
        .sort({ date: 1 }); // optional: sort by date (earliest first)
  
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch events",
        message: error.message,
      });
    }
  };