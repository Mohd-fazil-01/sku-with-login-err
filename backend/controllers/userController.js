// import User from "../models/User.js"

// export const getCurrentUser = async (req,res)=>{
//     try {
//         const userId = req.userId
//         res.status(202).json(userId)
//         console.log(userId)
//         // const userId = req.user.Id;
//         const user = await User.findById(userId);

//         if(!user){
//             return res.status(400).json({massage :"user not found"})
//         }
//         return res.status(200).json(user)

        
//     } catch (error) {
//         return res.status(500).json({massage:`get cuurent user error ${error}`})

        
//     }
// }


import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};
