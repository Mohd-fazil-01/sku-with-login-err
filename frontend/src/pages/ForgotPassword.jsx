// // import { useState } from "react";
// // import api from "../api/axios";

// // export default function ForgotPassword() {
// //   const [stage, setStage] = useState(1);
// //   const [email, setEmail] = useState("");
// //   const [code, setCode] = useState("");
// //   const [password, setPassword] = useState("");

// //   const sendCode = async () => {
// //     setStage(2);
// //     await api.post("/password/forgot", { email });
    
   
// //   };

// //   const verifyCode = async () => {
// //     await api.post("/password/verify", { email, code });
// //     setStage(3);
// //   };

// //   const resetPassword = async () => {
// //     await api.post("/password/reset", { email, password });
// //     alert("Password reset successful");
// //   };

// //   return (
// //     <div>
// //       {stage === 1 && (
// //         <>
// //           <h2>Enter Email</h2>
// //           <input onChange={(e) => setEmail(e.target.value)} />
// //           <button onClick={sendCode}>Send Code</button>
// //         </>
// //       )}

// //       {stage === 2 && (
// //         <>
// //           <h2>Enter Code</h2>
// //           <input onChange={(e) => setCode(e.target.value)} />
// //           <button onClick={verifyCode}>Verify</button>
// //         </>
// //       )}

// //       {stage === 3 && (
// //         <>
// //           <h2>Reset Password</h2>
// //           <input
// //             type="password"
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           <button onClick={resetPassword}>Reset</button>
// //         </>
// //       )}
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function ForgotPassword() {
//   const navigate = useNavigate();

//   // State Management
//   const [stage, setStage] = useState(1);
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [password, setPassword] = useState("");
  
//   // UI States
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   // --- STAGE 1: Send Code ---
//   const sendCode = async () => {
//     if (!email) return setError("Please enter your email.");
//     setLoading(true);
//     setError("");
    
//     try {
//       await api.post("/password/forgot", { email });
//       setStage(2);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- STAGE 2: Verify Code ---
//   const verifyCode = async () => {
//     if (!code) return setError("Please enter the verification code.");
//     setLoading(true);
//     setError("");

//     try {
//       await api.post("/password/verify", { email, code });
//       setStage(3);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- STAGE 3: Reset Password ---
//   const resetPassword = async () => {
//     if (!password) return setError("Please enter a new password.");
//     setLoading(true);
//     setError("");

//     try {
//       await api.post("/password/reset", { email, password });
//       alert("Password reset successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to reset password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
        
//         {/* Header changes dynamically based on stage */}
//         <div style={styles.header}>
//           <h2 style={styles.title}>
//             {stage === 1 ? "Forgot Password?" : stage === 2 ? "Verification Code" : "Reset Password"}
//           </h2>
//           <p style={styles.subtitle}>
//             {stage === 1 ? "Enter your email to receive a reset code." : 
//              stage === 2 ? `Code sent to ${email}` : 
//              "Create a new strong password."}
//           </p>
//         </div>

//         {/* Error Message Box */}
//         {error && <div style={styles.errorBox}>{error}</div>}

//         <div style={styles.formContent}>
          
//           {/* --- STAGE 1: EMAIL INPUT --- */}
//           {stage === 1 && (
//             <>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Email Address</label>
//                 <input 
//                   type="email" 
//                   placeholder="name@company.com" 
//                   onChange={(e) => setEmail(e.target.value)} 
//                   value={email}
//                   style={styles.input}
//                 />
//               </div>
//               <button onClick={sendCode} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
//                 {loading ? "Sending..." : "Send Verification Code"}
//               </button>
//             </>
//           )}

//           {/* --- STAGE 2: OTP INPUT --- */}
//           {stage === 2 && (
//             <>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Enter OTP Code</label>
//                 <input 
//                   type="text" 
//                   placeholder="e.g. 123456" 
//                   onChange={(e) => setCode(e.target.value)} 
//                   value={code}
//                   style={{...styles.input, textAlign: 'center', letterSpacing: '2px', fontSize: '18px'}}
//                 />
//               </div>
//               <button onClick={verifyCode} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
//                 {loading ? "Verifying..." : "Verify Code"}
//               </button>
              
//               <p style={styles.linkText} onClick={() => setStage(1)}>
//                  Wrong email? Go back
//               </p>
//             </>
//           )}

//           {/* --- STAGE 3: NEW PASSWORD --- */}
//           {stage === 3 && (
//             <>
//                <div style={styles.inputGroup}>
//                 <label style={styles.label}>New Password</label>
//                 <div style={styles.passwordWrapper}>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter new password"
//                     style={styles.input}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <span 
//                     onClick={() => setShowPassword(!showPassword)} 
//                     style={styles.eyeIcon}
//                     title={showPassword ? "Hide" : "Show"}
//                   >
//                     {showPassword ? "👁️" : "🙈"} 
//                   </span>
//                 </div>
//               </div>
//               <button onClick={resetPassword} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
//                 {loading ? "Resetting..." : "Set New Password"}
//               </button>
//             </>
//           )}

//         </div>

//         {/* Back to Login Footer */}
//         <div style={styles.footer}>
//           <span onClick={() => navigate("/login")} style={styles.backLink}>
//              ⬅ Back to Login
//           </span>
//         </div>

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
//     backgroundColor: "#f3f4f6",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     width: "100%",
//     maxWidth: "400px",
//     padding: "40px",
//     borderRadius: "12px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
//     border: "1px solid #e5e7eb",
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "25px",
//   },
//   title: {
//     fontSize: "24px",
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: "8px",
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#6b7280",
//     margin: 0,
//     lineHeight: "1.4",
//   },
//   formContent: {
//     marginBottom: "20px",
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
//     boxSizing: "border-box",
//     transition: "all 0.2s",
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
//     background: "transparent",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#1976D2",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "background 0.2s",
//   },
//   buttonDisabled: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#93c5fd",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "not-allowed",
//   },
//   errorBox: {
//     backgroundColor: "#fee2e2",
//     color: "#b91c1c",
//     padding: "10px",
//     borderRadius: "6px",
//     fontSize: "14px",
//     marginBottom: "20px",
//     textAlign: "center",
//     border: "1px solid #fecaca",
//   },
//   linkText: {
//     textAlign: "center",
//     marginTop: "15px",
//     fontSize: "13px",
//     color: "#6b7280",
//     cursor: "pointer",
//     textDecoration: "underline",
//   },
//   footer: {
//     textAlign: "center",
//     borderTop: "1px solid #e5e7eb",
//     paddingTop: "20px",
//   },
//   backLink: {
//     fontSize: "14px",
//     color: "#1976D2",
//     fontWeight: "600",
//     cursor: "pointer",
//   }
// };








// import { useState, useEffect } from "react"; // useEffect add kiya timer ke liye
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function ForgotPassword() {
//   const navigate = useNavigate();

//   // State Management
//   const [stage, setStage] = useState(1);
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [password, setPassword] = useState("");
  
//   // UI States
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   // Timer State for Resend Code
//   const [timer, setTimer] = useState(30);

//   // Timer Logic: Jab Stage 2 active ho aur timer > 0 ho, tab countdown chalega
//   useEffect(() => {
//     let interval;
//     if (stage === 2 && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [stage, timer]);

//   // --- STAGE 1: Send Code ---

//   const sendCode = async () => {
//     if (!email) return setError("Please enter your email.");
//     setLoading(true);
//     setError("");
    
//     try {
//       await api.post("/password/forgot", { email });
//       setStage(2);
//       setTimer(30); 
//     } catch (err) {
//       // 🛑 Backend se "Account Frozen" ka message aayega to wo yahan dikh jayega
//       setError(err.response?.data?.message || "Failed to send code.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   // const sendCode = async () => {
//   //   if (!email) return setError("Please enter your email.");
//   //   setLoading(true);
//   //   setError("");
    
//   //   try {
//   //     await api.post("/password/forgot", { email });
//   //     setStage(2);
//   //     setTimer(30); // Timer reset karein jab naya code bheje
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || "Failed to send code.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // --- RESEND CODE FUNCTION ---
//   const resendCode = async () => {
//     if (timer > 0) return; // Agar timer chal raha hai to click na ho
    
//     setLoading(true);
//     setError("");
    
//     try {
//       await api.post("/password/forgot", { email });
//       alert(`New code sent to ${email}`);
//       setTimer(30); // Timer wapas 30s se shuru
//     } catch (err) {
//       setError("Failed to resend code. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- STAGE 2: Verify Code ---
//   const verifyCode = async () => {
//     if (!code) return setError("Please enter the verification code.");
//     setLoading(true);
//     setError("");

//     try {
//       await api.post("/password/verify", { email, code });
//       setStage(3);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid code.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- STAGE 3: Reset Password ---
//   const resetPassword = async () => {
//     if (!password) return setError("Please enter a new password.");
//     setLoading(true);
//     setError("");

//     try {
//       await api.post("/password/reset", { email, password });
//       alert("Password reset successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to reset password.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
        
//         <div style={styles.header}>
//           <h2 style={styles.title}>
//             {stage === 1 ? "Forgot Password?" : stage === 2 ? "Verification Code" : "Reset Password"}
//           </h2>
//           <p style={styles.subtitle}>
//             {stage === 1 ? "Enter your email to receive a reset code." : 
//              stage === 2 ? `Code sent to ${email}` : 
//              "Create a new strong password."}
//           </p>
//         </div>

//         {error && <div style={styles.errorBox}>{error}</div>}

//         <div style={styles.formContent}>
          
//           {/* --- STAGE 1: EMAIL INPUT --- */}
//           {stage === 1 && (
//             <>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Email Address</label>
//                 <input 
//                   type="email" 
//                   placeholder="name@company.com" 
//                   onChange={(e) => setEmail(e.target.value)} 
//                   value={email}
//                   style={styles.input}
//                 />
//               </div>
//               <button onClick={sendCode} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
//                 {loading ? "Sending..." : "Send Verification Code"}
//               </button>
//             </>
//           )}

//           {/* --- STAGE 2: OTP INPUT --- */}
//           {stage === 2 && (
//             <>
//               <div style={styles.inputGroup}>
//                 <label style={styles.label}>Enter OTP Code</label>
//                 <input 
//                   type="text" 
//                   placeholder="e.g. 123456" 
//                   onChange={(e) => setCode(e.target.value)} 
//                   value={code}
//                   style={{...styles.input, textAlign: 'center', letterSpacing: '2px', fontSize: '18px'}}
//                 />
//               </div>
              
//               <button onClick={verifyCode} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
//                 {loading ? "Verifying..." : "Verify Code"}
//               </button>

//               {/* Resend Logic Here */}
//               <div style={styles.resendContainer}>
//                 {timer > 0 ? (
//                   <p style={styles.timerText}>Resend code in {timer}s</p>
//                 ) : (
//                   <p onClick={resendCode} style={styles.resendLink}>
//                     Didn't receive code? <b>Resend</b>
//                   </p>
//                 )}
//               </div>
              
//               <p style={styles.linkText} onClick={() => setStage(1)}>
//                  Change Email Address
//               </p>
//             </>
//           )}

//           {/* --- STAGE 3: NEW PASSWORD --- */}
//           {stage === 3 && (
//             <>
//                <div style={styles.inputGroup}>
//                 <label style={styles.label}>New Password</label>
//                 <div style={styles.passwordWrapper}>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter new password"
//                     style={styles.input}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <span 
//                     onClick={() => setShowPassword(!showPassword)} 
//                     style={styles.eyeIcon}
//                     title={showPassword ? "Hide" : "Show"}
//                   >
//                     {showPassword ? "👁️" : "🙈"} 
//                   </span>
//                 </div>
//               </div>
//               <button onClick={resetPassword} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
//                 {loading ? "Resetting..." : "Set New Password"}
//               </button>
//             </>
//           )}

//         </div>

//         <div style={styles.footer}>
//           <span onClick={() => navigate("/login")} style={styles.backLink}>
//              ⬅ Back to Login
//           </span>
//         </div>

//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#f3f4f6",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     width: "100%",
//     maxWidth: "400px",
//     padding: "40px",
//     borderRadius: "12px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
//     border: "1px solid #e5e7eb",
//   },
//   header: { textAlign: "center", marginBottom: "25px" },
//   title: { fontSize: "24px", fontWeight: "700", color: "#111827", marginBottom: "8px" },
//   subtitle: { fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: "1.4" },
//   formContent: { marginBottom: "20px" },
//   inputGroup: { marginBottom: "20px" },
//   label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" },
//   input: { width: "100%", padding: "12px 15px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", boxSizing: "border-box", transition: "all 0.2s" },
//   passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
//   eyeIcon: { position: "absolute", right: "15px", cursor: "pointer", fontSize: "18px", background: "transparent" },
//   button: { width: "100%", padding: "12px", backgroundColor: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s" },
//   buttonDisabled: { width: "100%", padding: "12px", backgroundColor: "#93c5fd", color: "#fff", border: "none", borderRadius: "6px", cursor: "not-allowed" },
//   errorBox: { backgroundColor: "#fee2e2", color: "#b91c1c", padding: "10px", borderRadius: "6px", fontSize: "14px", marginBottom: "20px", textAlign: "center", border: "1px solid #fecaca" },
  
//   // Resend Styles
//   resendContainer: { textAlign: "center", marginTop: "15px" },
//   timerText: { fontSize: "14px", color: "#9ca3af" },
//   resendLink: { fontSize: "14px", color: "#1976D2", cursor: "pointer" },

//   linkText: { textAlign: "center", marginTop: "10px", fontSize: "13px", color: "#6b7280", cursor: "pointer", textDecoration: "underline" },
//   footer: { textAlign: "center", borderTop: "1px solid #e5e7eb", paddingTop: "20px" },
//   backLink: { fontSize: "14px", color: "#1976D2", fontWeight: "600", cursor: "pointer" }
// };





















import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  // State Management
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Success message box ke liye
  const [showPassword, setShowPassword] = useState(false);

  // Timer State for Resend Code
  const [timer, setTimer] = useState(30);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (stage === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stage, timer]);

  // --- STAGE 1: Send Code ---
  const sendCode = async () => {
    if (!email) return setError("Please enter your email.");
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await api.post("/password/forgot", { email });
      setStage(2);
      setTimer(30); 
    } catch (err) {
      // Agar backend admin bypass allow karta hai, toh error nahi aayega.
      // Agar account frozen hai, toh yahan message dikhega.
      setError(err.response?.data?.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  // --- RESEND CODE ---
  const resendCode = async () => {
    if (timer > 0) return;
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await api.post("/password/forgot", { email });
      setSuccess(`A new code has been sent to ${email}`);
      setTimer(30);
    } catch (err) {
      setError("Failed to resend code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- STAGE 2: Verify Code ---
  const verifyCode = async () => {
    if (!code) return setError("Please enter the verification code.");
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/password/verify", { email, code });
      setStage(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  // --- STAGE 3: Reset Password ---
  const resetPassword = async () => {
    if (!password) return setError("Please enter a new password.");
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/password/reset", { email, password });
      setSuccess("Password reset successful! Redirecting to login...");
      
      // Admin bypass ke baad login par redirect
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <div style={styles.header}>
          <h2 style={styles.title}>
            {stage === 1 ? "Forgot Password?" : stage === 2 ? "Verification Code" : "Reset Password"}
          </h2>
          <p style={styles.subtitle}>
            {stage === 1 ? "Enter your email to receive a reset code." : 
             stage === 2 ? `Code sent to ${email}` : 
             "Create a new strong password."}
          </p>
        </div>

        {/* Error Message Display */}
        {error && <div style={styles.errorBox}>{error}</div>}

        {/* Success Message Display (Instead of Alert) */}
        {success && <div style={styles.successBox}>{success}</div>}

        <div style={styles.formContent}>
          
          {stage === 1 && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  style={styles.input}
                />
              </div>
              <button onClick={sendCode} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </>
          )}

          {stage === 2 && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Enter OTP Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. 123456" 
                  onChange={(e) => setCode(e.target.value)} 
                  value={code}
                  style={{...styles.input, textAlign: 'center', letterSpacing: '2px', fontSize: '18px'}}
                />
              </div>
              
              <button onClick={verifyCode} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
                {loading ? "Verifying..." : "Verify Code"}
              </button>

              <div style={styles.resendContainer}>
                {timer > 0 ? (
                  <p style={styles.timerText}>Resend code in {timer}s</p>
                ) : (
                  <p onClick={resendCode} style={styles.resendLink}>
                    Didn't receive code? <b>Resend</b>
                  </p>
                )}
              </div>
              
              <p style={styles.linkText} onClick={() => {setStage(1); setError(""); setSuccess("");}}>
                  Change Email Address
              </p>
            </>
          )}

          {stage === 3 && (
            <>
               <div style={styles.inputGroup}>
                <label style={styles.label}>New Password</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={styles.eyeIcon}
                  >
                    {showPassword ? "👁️" : "🙈"} 
                  </span>
                </div>
              </div>
              <button onClick={resetPassword} disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
                {loading ? "Resetting..." : "Set New Password"}
              </button>
            </>
          )}

        </div>

        <div style={styles.footer}>
          <span onClick={() => navigate("/login")} style={styles.backLink}>
              ⬅ Back to Login
          </span>
        </div>

      </div>
    </div>
  );
}

const styles = {
  // ... (Apke purane styles yahan aayenge)
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  card: { backgroundColor: "#ffffff", width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb" },
  header: { textAlign: "center", marginBottom: "25px" },
  title: { fontSize: "24px", fontWeight: "700", color: "#111827", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#6b7280", margin: 0, lineHeight: "1.4" },
  formContent: { marginBottom: "20px" },
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" },
  input: { width: "100%", padding: "12px 15px", fontSize: "15px", borderRadius: "6px", border: "1px solid #d1d5db", outline: "none", boxSizing: "border-box", transition: "all 0.2s" },
  passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
  eyeIcon: { position: "absolute", right: "15px", cursor: "pointer", fontSize: "18px", background: "transparent" },
  button: { width: "100%", padding: "12px", backgroundColor: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s" },
  buttonDisabled: { width: "100%", padding: "12px", backgroundColor: "#93c5fd", color: "#fff", border: "none", borderRadius: "6px", cursor: "not-allowed" },
  errorBox: { backgroundColor: "#fee2e2", color: "#b91c1c", padding: "10px", borderRadius: "6px", fontSize: "14px", marginBottom: "20px", textAlign: "center", border: "1px solid #fecaca" },
  
  // ✅ Naya Success Box Style
  successBox: { backgroundColor: "#dcfce7", color: "#166534", padding: "10px", borderRadius: "6px", fontSize: "14px", marginBottom: "20px", textAlign: "center", border: "1px solid #bbf7d0" },
  
  resendContainer: { textAlign: "center", marginTop: "15px" },
  timerText: { fontSize: "14px", color: "#9ca3af" },
  resendLink: { fontSize: "14px", color: "#1976D2", cursor: "pointer" },
  linkText: { textAlign: "center", marginTop: "10px", fontSize: "13px", color: "#6b7280", cursor: "pointer", textDecoration: "underline" },
  footer: { textAlign: "center", borderTop: "1px solid #e5e7eb", paddingTop: "20px" },
  backLink: { fontSize: "14px", color: "#1976D2", fontWeight: "600", cursor: "pointer" }
};