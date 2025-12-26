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



// signIn
export const signIn = async (req, res) => {
    try {
        const {email, password } = req.body;

        const user = await User.findOne( {email} );
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }


        const isMatch = bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({massage:"Incorrect passwor or Email"})
        }

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 day  });
        });
        return res.json(201).json(user)


    } catch (error) {
        return res.status(500).json({massage:`signin error ${error}`})

    }

}


//  signout
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout successful"
    });
  } catch (error) {
    return res.status(500).json({
      message: `signOut error ${error.message}`
    });
  }
};
