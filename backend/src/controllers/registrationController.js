import { Registration } from "../models/registrationModel.js";
import { Event } from "../models/event.Model.js";

// @desc Register user for an event
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    // check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // check if registration already exists
    const alreadyRegistered = await Registration.findOne({
      user: req.user.id,
      event: eventId,
    });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    const registration = new Registration({
      user: req.user.id,
      event: eventId,
    });

    await registration.save();

    res.status(201).json({ message: "Registered successfully", registration });
  } catch (error) {
    res.status(500).json({ message: "Failed to register", error: error.message });
  }
};
export const registerForEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    // Check if already registered
    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({ error: "Already registered for this event." });
    }

    const registration = new Registration({
      user: userId,
      event: eventId,
    });

    await registration.save();

    res.status(201).json({ message: "Successfully registered for the event." });
  } catch (error) {
    res.status(500).json({ error: "Failed to register", message: error.message });
  }
};

// @desc Get all events user registered for
export const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id }).populate("event");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registrations", error: error.message });
  }
};