import express from "express"
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import { getAllUsers, updateUserRole, getAllCoordinators } from "../controllers/userController.js";


const router = express.Router();


// Only admin can access this router

router.get("/admin",verifyToken,authorizeRoles("admin"), (req,res) => {
    res.json({message:"Welcome Admin"});
});

// Both admin and coordinator can access this route
router.get("/coordinator",verifyToken,authorizeRoles("admin","coordinator"), (req,res) => {
    res.json({message:"Welcome Coordinator"});
});
// All can access this route
router.get("/student",verifyToken,verifyToken,authorizeRoles("admin","coordinator","student"), (req,res) => {
    res.json({message:"Welcome Student"});
});

router.get("/all-users", verifyToken, authorizeRoles("admin"), getAllUsers);
router.get("/coordinators", verifyToken, authorizeRoles("admin"), getAllCoordinators);

router.patch("/update-role/:id", verifyToken, authorizeRoles("admin"), updateUserRole);

export default router
