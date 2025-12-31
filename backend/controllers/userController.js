// // import User from "../models/User.js"

// // export const getCurrentUser = async (req,res)=>{
// //     try {
// //         const userId = req.userId
// //         res.status(202).json(userId)
// //         console.log(userId)
// //         // const userId = req.user.Id;
// //         const user = await User.findById(userId);

// //         if(!user){
// //             return res.status(400).json({massage :"user not found"})
// //         }
// //         return res.status(200).json(user)

        
// //     } catch (error) {
// //         return res.status(500).json({massage:`get cuurent user error ${error}`})

        
// //     }
// // }


// import User from "../models/User.js";

// export const getCurrentUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.userId).select("-password");
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: `Server error: ${error.message}` });
//     }
// };






















import User from "../models/User.js";
import bcrypt from "bcryptjs";

// 1️⃣ Get Current User (Jo pehle se tha)
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};






// ✅ NEW: Toggle User Freeze Status (Admin Only)
export const toggleUserFreeze = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Status palat do (Freeze <-> Unfreeze)
    user.isFrozen = !user.isFrozen;
    
    // Agar Unfreeze kar rahe hain, to attempts bhi 0 kar do
    if (!user.isFrozen) {
      user.failedLoginAttempts = 0;
    }

    await user.save();

    res.status(200).json({ 
      message: user.isFrozen ? "User Frozen" : "User Unfrozen successfully", 
      user 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






// 2️⃣ Get All Users (Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    // Password mat bhejo security ke liye
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Khud ko delete karne se roko
    if (user._id.toString() === req.userId) {
      return res.status(400).json({ message: "You cannot delete yourself!" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️⃣ Update User Details (Name, Email, Role)
export const updateUser = async (req, res) => {
  try {
    const { name, email, username, userType } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, username, userType },
      { new: true } // Return updated doc
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// 5️⃣ Admin Reset Password (Directly)
export const adminResetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (newPassword.length < 6) return res.status(400).json({ message: "Password too short" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Reset failed" });
  }
};