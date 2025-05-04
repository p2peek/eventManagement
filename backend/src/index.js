import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./configs/dbConnect.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
dotenv.config();

dbConnect();

const app = express();

// Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// Start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})