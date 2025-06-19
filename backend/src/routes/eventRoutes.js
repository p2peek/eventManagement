import express from "express"
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { createEventAdmin,updateEvent,deleteEvent,getEventById, listEvents, assignCoordinator, removeCoordinator } from "../controllers/eventController.js";


const router = express.Router();

router.get("/", listEvents);
router.post("/createEvent",verifyToken,authorizeRoles("admin"), createEventAdmin);
router.post("/findEvent/:id",verifyToken,authorizeRoles("admin","coordinator","student"), getEventById);
router.put("/updateEvent/:id", verifyToken, authorizeRoles("admin","coordinator"), updateEvent);
router.delete("/deleteEvent/:id", verifyToken, authorizeRoles("admin"), deleteEvent);
router.patch("/assign-coordinators/:eventId", verifyToken, authorizeRoles("admin"), assignCoordinator);
router.patch("/remove-coordinator/:eventId", verifyToken, authorizeRoles("admin"), removeCoordinator);

export default router