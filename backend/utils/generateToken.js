// import jwt from "jsonwebtoken";

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 24 * 60 * 60 * 1000, // 1 day  });
// };

// export default generateToken;

import jwt from "jsonwebtoken";

const genToken = async (userID) => {
  try {
    const token = jwt.sign(
      { id: userID },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return token;
  } catch (error) {
    throw new Error(`gen token error: ${error.message}`);
  }
};

export default genToken;


