import User from "../models/User.js";
import genToken from "../utils/generateToken.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";


// Check Auth (Protected)
export const checkAuth = (req, res) => {
    res.status(200).json({ success: true, userId: req.user });
};

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Body check
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // 🔐 password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = await genToken(user._id);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ message: `Signup error: ${error.message}` });
    }
}





// export const signIn = async (req, res) => {
//     try {
//         // 1️⃣ CHANGE: 'email' ki jagah 'identifier' lo
//         // Kyunki frontend ab { identifier: "...", password: "..." } bhej raha hai
//         const { identifier, password } = req.body;

//         if (!identifier || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // 2️⃣ CHANGE: DB Query me $or lagao
//         // Check karo ki jo 'identifier' aaya hai wo 'email' hai ya 'username'
//         const user = await User.findOne({
//             $or: [
//                 { email: identifier },
//                 { username: identifier }
//             ]
//         });

//         // Agar user nahi mila
//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         // 3. Check password (Same as before)
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             // Message thoda generic kar diya taaki hacker ko pata na chale kya galat hai
//             return res.status(400).json({ message: "Invalid Credentials" });
//         }

//         // 4. Generate Token (Same as before)
//         const token = await genToken(user._id);

//         // 5. Set Cookie (Same as before)
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production", // Production check laga diya safe side
//             sameSite: "strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000, 
//         });

//         // 6. Send Response
//         // Password ko response se hata dena security ke liye better hota hai
//         const { password: userPass, ...userDetails } = user._doc;
        
//         return res.status(200).json(userDetails);

//     } catch (error) {
//         console.log("Internal Server Error:", error);
//         return res.status(500).json({ message: `signin error: ${error.message}` });
//     }
// };







// import User from "../models/User.js";
// import genToken from "../utils/generateToken.js";
// import bcrypt from "bcryptjs";

// ... (baki imports aur functions same rahenge)

export const signIn = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. User dhundho
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      // Security: User nahi mila to bhi Generic error do
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 🛑 2. Check karo agar Account Frozen hai
    if (user.isFrozen) {
      return res.status(403).json({ 
        message: "Account is Frozen due to multiple failed attempts. Contact Admin." 
      });
    }

    // 3. Password Check karo
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // ❌ Password Galat hai -> Count Badhao
      user.failedLoginAttempts += 1;

      // Agar 5 ya usse zyada attempts ho gaye to Freeze kar do
      if (user.failedLoginAttempts >= 5) {
        user.isFrozen = true;
        await user.save();
        return res.status(403).json({ message: "Account Frozen! Too many wrong attempts." });
      }

      await user.save();
      const attemptsLeft = 5 - user.failedLoginAttempts;
      return res.status(400).json({ message: `Invalid Password. ${attemptsLeft} attempts remaining.` });
    }

    // ✅ 4. Password Sahi hai (Login Success)
    // Count reset karo 0 par aur Frozen hatao (just in case)
    user.failedLoginAttempts = 0;
    user.isFrozen = false; 
    await user.save();

    // Token generate karo
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: userPass, ...userDetails } = user._doc;
    return res.status(200).json(userDetails);

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: `Signin error: ${error.message}` });
  }
};

// ... (signOut aur createUser same rahenge)



// export const signIn = async (req, res) => {
//     try {
//         console.log("👉 1. Signin Hit hua!");
//         console.log("👉 Body Aayi:", req.body); // Check kar body aa rahi hai ya empty hai?

//         const { identifier, password } = req.body;

//         if (!identifier || !password) {
//             console.log("❌ Error: Missing Identifier or Password");
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         console.log("👉 2. Finding User in DB...");
//         const user = await User.findOne({
//             $or: [
//                 { email: identifier },
//                 { username: identifier }
//             ]
//         });

//         if (!user) {
//             console.log("❌ Error: User Nahi Mila DB me");
//             return res.status(400).json({ message: "User not found (Check Username/Email)" });
//         }

//         console.log("👉 3. Checking Password...");
//         const isMatch = await bcrypt.compare(password, user.password);
        
//         if (!isMatch) {
//             console.log("❌ Error: Password Match Nahi Hua");
//             return res.status(400).json({ message: "Invalid Password" });
//         }

//         console.log("✅ 4. Success! Token bana rahe hain...");
//         const token = await genToken(user._id);

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production", 
//             sameSite: "strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000, 
//         });

//         const { password: userPass, ...userDetails } = user._doc;
//         return res.status(200).json(userDetails);

//     } catch (error) {
//         console.log("❌ Internal Error:", error);
//         return res.status(500).json({ message: `signin error: ${error.message}` });
//     }
// };




// export const signIn = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // 1. Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         // 2. Check password (with await)
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Incorrect password or Email" });
//         }

//         // 3. Generate Token
//         const token = await genToken(user._id);

//         // 4. Set Cookie
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false, // development mein false rakhein
//             sameSite: "strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000, 
//         });

//         // 5. Send FINAL Response (Corrected Status)
//         return res.status(200).json(user);

//     } catch (error) {
//         console.log("Internal Server Error:", error);
//         return res.status(500).json({ message: `signin error: ${error.message}` });
//     }
// };

// Create User (Admin Only)
// export const createUser = async (req, res) => {
//   try {
//     const { username, name, email, password, userType } = req.body;

//     // Validate required fields
//     if (!username || !name || !email || !password || !userType) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     // const userExists = await User.findOne({ email });
//     // if (userExists) {
//     //   return res.status(400).json({ message: "User already exists" });
//     // }
//     const userExists = await User.findOne({ 
//       $or: [{ email: email }, { username: username }] 
//     });

//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

//     // Hash Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create User
//     const user = await User.create({
//       username,
//       name,
//       email,
//       password: hashedPassword,
//       userType, // admin / superuser / user
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       user,
//     });

//   } catch (error) {
//     console.error("Create User Error:", error);
//     return res.status(500).json({ message: `Create user error: ${error.message}` });
//   }
// };









// Create User (Admin Only)
export const createUser = async (req, res) => {
  try {
    // 1️⃣ Username bhi receive karo
    const { name, email, password, userType, username } = req.body;

    // 2️⃣ Validation mein username add karo
    if (!name || !email || !password || !userType || !username) {
      return res.status(400).json({ message: "All fields are required (including Username)" });
    }

    // 3️⃣ Check karo User exist karta hai ya nahi (Email YA Username dono check karo)
    const userExists = await User.findOne({ 
      $or: [{ email: email }, { username: username }] 
    });
    
    if (userExists) {
      return res.status(400).json({ message: "User with this Email or Username already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ User create karte waqt username save karo
    const user = await User.create({
      username, // 👈 Ye zaroori hai
      name,
      email,
      password: hashedPassword,
      userType, 
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });

  } catch (error) {
    console.error("Create User Error:", error);
    
    // Duplicate Key Error ko handle karna (Safety ke liye)
    if (error.code === 11000) {
        return res.status(400).json({ message: "Username or Email already exists" });
    }

    return res.status(500).json({ message: `Create user error: ${error.message}` });
  }
};

// signout
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,     // production me true
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `signOut error ${error.message}`,
    });
  }
};

