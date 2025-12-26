// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// const router = express.Router();

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "10d" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Login error" });
//   }
// });

// export default router;



// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   checkAuth,
// } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/signup", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);

// // Protected route
// router.get("/check", protect, checkAuth);

// export default router;


import express from "express";
// import signup from "../../frontend/src/pages/Signup";
import { signIn, signOut, signUp } from "../controllers/authController.js";

const authRouter = express.Router()

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);

export default authRouter;

