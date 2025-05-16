import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import {registerForEvent,getMyRegistrations,registerForEvents} from "../controllers/registrationController.js";

const router = express.Router();

// Protected routes
router.post("/register", verifyToken, registerForEvent);
router.post("/register/:eventId", verifyToken, registerForEvents);
router.get("/my-registrations", verifyToken, getMyRegistrations);

export default router;
