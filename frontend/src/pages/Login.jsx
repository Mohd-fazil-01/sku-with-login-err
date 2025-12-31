// // import { useState } from "react";
// // import api from "../api/axios";
// // import { useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { setUserData } from "../redux/userSlice";

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const dispatch = useDispatch()

// //   const login = async () => {
// //     try {
// //       const result = await api.post("/auth/signin", form);
// //       dispatch(setUserData(result.data))
// //       console.log(result.data)
// //       navigate("/dashboard");
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Login failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>

// //       <input
// //         placeholder="Email"
// //         onChange={(e) => setForm({ ...form, email: e.target.value })}
// //       />

// //       <input
// //         type="password"
// //         placeholder="Password"
// //         onChange={(e) => setForm({ ...form, password: e.target.value })}
// //       />

// //       <button onClick={login}>Login</button>

// //       <p onClick={() => navigate("/forgot-password")}>
// //         Forgot Password?
// //       </p>

// //       <p onClick={() => navigate("/signup")}>
// //         Create new account
// //       </p>
// //     </div>
// //   );
// // }



// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../redux/userSlice";

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // State
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false); // Eye toggle ke liye
//   const [loading, setLoading] = useState(false); // Button loading state ke liye

//   // Login Logic (Same as before)
//   const login = async (e) => {
//     e.preventDefault(); // Form submit refresh rokne ke liye
//     setLoading(true);
    
//     try {
//       const result = await api.post("/auth/signin", form);
//       dispatch(setUserData(result.data));
//       console.log(result.data);
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
        
//         {/* Header Section */}
//         <div style={styles.header}>
//           <h2 style={styles.title}>Welcome Back</h2>
//           <p style={styles.subtitle}>Please enter your details to sign in</p>
//         </div>

//         {/* Form Section */}
//         <form onSubmit={login} style={styles.form}>
          
//           {/* Email Input */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Email Address</label>
//             <input
//               type="email"
//               required
//               placeholder="Enter your email"
//               style={styles.input}
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//           </div>

//           {/* Password Input with Eye Icon */}
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Password</label>
//             <div style={styles.passwordWrapper}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 placeholder="Enter your password"
//                 style={styles.input}
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//               />
//               <span 
//                 onClick={() => setShowPassword(!showPassword)} 
//                 style={styles.eyeIcon}
//                 title={showPassword ? "Hide Password" : "Show Password"}
//               >
//                 {showPassword ? "👁️" : "🙈"} 
//               </span>
//             </div>
//           </div>

//           {/* Forgot Password Link */}
//           <div style={styles.forgotPassContainer}>
//             <span onClick={() => navigate("/forgot-password")} style={styles.link}>
//               Forgot Password?
//             </span>
//           </div>

//           {/* Login Button */}
//           <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
//             {loading ? "Signing in..." : "Sign In"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// // Professional CSS-in-JS Styles
// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f3f4f6", // Light Grey Background
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     width: "100%",
//     maxWidth: "400px",
//     padding: "40px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soft Shadow
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "30px",
//   },
//   title: {
//     fontSize: "26px",
//     fontWeight: "700",
//     color: "#1a1a1a",
//     marginBottom: "8px",
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#6b7280",
//     margin: 0,
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   inputGroup: {
//     marginBottom: "20px",
//   },
//   label: {
//     display: "block",
//     fontSize: "14px",
//     fontWeight: "500",
//     color: "#374151",
//     marginBottom: "8px",
//   },
//   input: {
//     width: "100%",
//     padding: "12px 15px",
//     fontSize: "15px",
//     borderRadius: "6px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     transition: "border-color 0.2s",
//     boxSizing: "border-box", // Important for padding
//   },
//   passwordWrapper: {
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//   },
//   eyeIcon: {
//     position: "absolute",
//     right: "15px",
//     cursor: "pointer",
//     fontSize: "18px",
//     userSelect: "none",
//     background: "transparent",
//   },
//   forgotPassContainer: {
//     textAlign: "right",
//     marginBottom: "20px",
//   },
//   link: {
//     fontSize: "13px",
//     color: "#1976D2", // Brand Blue
//     cursor: "pointer",
//     textDecoration: "none",
//   },
//   linkBold: {
//     fontSize: "14px",
//     color: "#1976D2",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   button: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#1976D2", // Brand Blue
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "background-color 0.2s",
//   },
//   buttonDisabled: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#93c5fd",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "not-allowed",
//   },
//   footerText: {
//     textAlign: "center",
//     fontSize: "14px",
//     color: "#6b7280",
//     marginTop: "20px",
//   },
// };







import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State: 'email' ko badal kar 'identifier' kar diya
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    
    try {
      // Backend ko 'identifier' aur 'password' bhej rahe hain
      const result = await api.post("/auth/signin", form);
      
      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch(setUserData(result.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in with your Email or Username</p>
        </div>

        <form onSubmit={login} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email or Username</label>
            <input
              type="text" // 'email' se 'text' kar diya taaki username bhi allow ho
              name="identifier"
              required
              placeholder="Enter email or username"
              style={error ? styles.inputError : styles.input}
              value={form.identifier}
              onChange={handleChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                style={error ? styles.inputError : styles.input}
                value={form.password}
                onChange={handleChange}
              />
              <span 
                onClick={() => setShowPassword(!showPassword)} 
                style={styles.eyeIcon}
              >
                {showPassword ? "👁️" : "🙈"} 
              </span>
            </div>
            {error && <p style={styles.errorMessage}>⚠️ {error}</p>}
          </div>

          <div style={styles.forgotPassContainer}>
            <span onClick={() => navigate("/forgot-password")} style={styles.link}>
              Forgot Password?
            </span>
          </div>

          <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ... Styles (Same as before)
const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  card: { backgroundColor: "#ffffff", width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" },
  header: { textAlign: "center", marginBottom: "30px" },
  title: { fontSize: "26px", fontWeight: "700", color: "#1a1a1a", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#6b7280", margin: 0 },
  form: { display: "flex", flexDirection: "column" },
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" },
  input: { width: "100%", padding: "12px 15px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" },
  inputError: { width: "100%", padding: "12px 15px", fontSize: "15px", borderRadius: "6px", border: "1px solid #dc2626", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box", backgroundColor: "#fef2f2" },
  passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
  eyeIcon: { position: "absolute", right: "15px", cursor: "pointer", fontSize: "18px", userSelect: "none", background: "transparent" },
  errorMessage: { color: "#dc2626", fontSize: "13px", marginTop: "5px", fontWeight: "500", display: "flex", alignItems: "center", gap: "5px" },
  forgotPassContainer: { textAlign: "right", marginBottom: "20px" },
  link: { fontSize: "13px", color: "#1976D2", cursor: "pointer", textDecoration: "none" },
  button: { width: "100%", padding: "14px", backgroundColor: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "background-color 0.2s" },
  buttonDisabled: { width: "100%", padding: "14px", backgroundColor: "#93c5fd", color: "#fff", border: "none", borderRadius: "6px", cursor: "not-allowed" },
};