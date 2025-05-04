import express from "express"
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";


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

export default router
