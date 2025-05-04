import mongoose from "mongoose";
import { User } from "./userModel.js";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "", // optional: a placeholder URL or uploaded file URL
    },
    maxParticipants: {
      type: Number,
      default: 100,
    },
    isRegistrationOpen: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // auto-generates createdAt and updatedAt
  }
);

export const Event = mongoose.model("Event", eventSchema);
