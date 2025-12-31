// // import mongoose from "mongoose";

// // const UserSchema = new mongoose.Schema(
// //   {
// //     username: { type: String, required: true, unique: true },

// //     name: { type: String, required: true },

// //     email: { type: String, required: true, unique: true },

// //     number: { type: String, required: true },

// //     password: { type: String, required: true },

// //     userType: {
// //       type: String,
// //       enum: ["admin", "superuser", "user"],
// //       default: "user"
// //     }
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.model("User", UserSchema);


// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     // name: {
//     //   type: String,
//     //   required: true,
//     // },
//     // email: {
//     //   type: String,
//     //   required: true,
//     //   unique: true,
//     // },
//     // password: {
//     //   type: String,
//     //   required: true,
//     // },



//     // username: { type: String, required: true, unique: true },

//     name: { type: String, required: true },

//     email: { type: String, required: true, unique: true },

//     // number: { type: String, required: true },

//     password: { type: String, required: true },

//     userType: {
//       type: String,
//       enum: ["admin", "superuser", "user"],
//       default: "user"
//     },
//     resetCode: String,
//     resetCodeExpire: Date,
//   },
//   { timestamps: true }
// );

// // ✅ Password encrypt (CORRECT WAY)
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // Password match
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model("User", userSchema);







// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true },
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     userType: {
//       type: String,
//       enum: ["admin", "superuser", "user"],
//       default: "user"
//     },
//     resetCode: String,
//     resetCodeExpire: Date,
//   },
//   { timestamps: true }
// );

// // ❌ "pre-save" hook hata diya gaya hai. 
// // Ab password automatically hash nahi hoga.

// // ✅ Password match method (Ye login mein kaam aayega)
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model("User", userSchema);












import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["admin", "superuser", "user"],
      default: "user"
    },
    // 👇 Ye 2 fields add kar
    failedLoginAttempts: { type: Number, default: 0 },
    isFrozen: { type: Boolean, default: false }, // True matlab account locked
    
    resetCode: String,
    resetCodeExpire: Date,
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);