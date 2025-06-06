import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js";

export const register =  async (req,res) => {
    try{
    const {name,email,password,role} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({name,email,password:hashedPassword,role});
    await newUser.save();
    res.status(201).json({message:`user registered ${name}`})
    }
    catch(err){
        console.error("Registration Error:", err);
        res.status(500).json({message:`something went wrong`})
    }
};
// export const login = async (req,res) => {
//     try {
//         const {email,password,role} = req.body;
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(404).json({message:`user ${email} not found`})
//         }
//         const isMatch = await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.status(400).json({message: "Invalid password"})
//         }
//         const token = jwt.sign(
//             {id : user._id, role: user.role},
//             process.env.JWT_SECRET,
//             {expiresIn : "1h"}
//         );
//         res.status(200).json({token});
//     } catch (error) {
//         res.status(500).json({message:`something went wrong`});
//     }
    
// };


export const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: `User ${email} not found` });
      }
  
      // Enforce role match
      if (user.role.toLowerCase() !== role.toLowerCase()) {
        return res.status(403).json({ message: `Incorrect role selected` });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id
        }
      });
  
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: `Something went wrong` });
    }
  };
  