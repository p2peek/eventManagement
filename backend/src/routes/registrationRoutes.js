import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import {registerForEvent,getMyRegistrations,} from "../controllers/registrationController.js";

const router = express.Router();

// Protected routes
router.post("/register", verifyToken, registerForEvent);
router.get("/my-registrations", verifyToken, getMyRegistrations);

export default router;
