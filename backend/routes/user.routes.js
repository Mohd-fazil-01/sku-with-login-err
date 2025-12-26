// import express from "express";
// import bcrypt from "bcrypt";
// import User from "../models/User.js";

// const router = express.Router();

// // CREATE USER
// router.post("/", async (req, res) => {
//   try {
//     const { username, name, email, number, password, userType } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       name,
//       email,
//       number,
//       password: hashedPassword,
//       userType
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User created successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Error creating user" });
//   }
// });

// export default router;





// import express from "express";
// import { getCurrentUser } from "../controllers/user.controllers.js";
// import  isAuth  from "../middlewares/isAuth.js";

// const userRouter = express.Router()

// userRouter.get("/current",isAuth,getCurrentUser)


// export default userRouter;



import express from "express";
// import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/userController.js";

const router = express.Router();

// Current user route (protected)
router.get("/users/current", isAuth, getCurrentUser);

export default router;
