// // backend/routes/user.routes.js
// import express from "express";
// import isAuth from "../middlewares/isAuth.js";
// import { getCurrentUser } from "../controllers/userController.js";

// const router = express.Router();

// // ✅ Sirf ye ek line rakhein
// router.get("/current", isAuth, getCurrentUser);

// export default router;








// import express from "express";
// import isAuth from "../middlewares/isAuth.js";
// import { 
//   getCurrentUser, 
//   getAllUsers, 
//   deleteUser, 
//   updateUser, 
//   adminResetPassword 
// } from "../controllers/userController.js";

// const router = express.Router();

// // Current User
// router.get("/current", isAuth, getCurrentUser);

// // User Management Routes (Protected)
// router.get("/all", isAuth, getAllUsers);           // Sab users lao
// router.delete("/:id", isAuth, deleteUser);         // Delete karo
// router.put("/:id", isAuth, updateUser);            // Edit karo
// router.put("/reset-password/:id", isAuth, adminResetPassword); // Password badlo

// export default router;







import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { 
  getCurrentUser, 
  getAllUsers, 
  deleteUser, 
  updateUser, 
  adminResetPassword,
  toggleUserFreeze // 👈 Import This
} from "../controllers/userController.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);
router.get("/all", isAuth, getAllUsers);
router.delete("/:id", isAuth, deleteUser);
router.put("/:id", isAuth, updateUser);
router.put("/reset-password/:id", isAuth, adminResetPassword);

// ✅ NEW ROUTE FOR FREEZE/UNFREEZE
router.put("/toggle-freeze/:id", isAuth, toggleUserFreeze);

export default router;