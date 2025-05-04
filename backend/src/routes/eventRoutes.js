import express from "express"
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { createEventAdmin,updateEvent,deleteEvent,getEventById, listEvents } from "../controllers/eventController.js";


const router = express.Router();

router.get("/", listEvents);
router.post("/createEvent",verifyToken,authorizeRoles("admin"), createEventAdmin);
router.post("/findEvent/:id",verifyToken,authorizeRoles("admin","coordinator"), getEventById);
router.put("/updateEvent/:id", verifyToken, authorizeRoles("admin","coordinator"), updateEvent);
router.delete("/deleteEvent/:id", verifyToken, authorizeRoles("admin"), deleteEvent);

export default router