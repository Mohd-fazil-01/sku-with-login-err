// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import api from "../api/axios";
// import { logoutUser } from "../redux/userSlice";
// import toast from "react-hot-toast";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.userData);

//   // --- LOGOUT LOGIC (Moved here) ---
//   const logout = async () => {
//     try {
//       await api.post("/auth/signout");
//       localStorage.removeItem("user");
//       dispatch(logoutUser());
//       toast.success("Logged out successfully");
//       navigate("/"); // Login page
//     } catch (error) {
//       console.error("Logout failed", error);
//       localStorage.removeItem("user");
//       dispatch(logoutUser());
//       navigate("/");
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <header style={styles.header}>
//       {/* Clickable Logo Area */}
//       <div 
//         style={styles.logoArea} 
//         onClick={() => navigate("/dashboard")}
//         title="Go to Dashboard"
//       >
//         <h3 style={styles.appTitle}>📦 InventoryHub</h3>
//       </div>

//       <div style={styles.userArea}>
//         <div style={{ textAlign: "right", lineHeight: "1.2" }}>
//           <span style={styles.userName}>Hello, {user?.name || "User"}</span>
//           <span style={styles.userRole}>{user?.userType || "Guest"}</span>
//         </div>
//         <button onClick={logout} style={styles.logoutBtn}>
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// // --- STYLES FOR HEADER ---
// const styles = {
//   header: {
//     backgroundColor: "#1e293b",
//     padding: "10px 20px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//     height: "50px",
//     color: "#fff",
//     position: "sticky", // Optional: Top par chipka rahega
//     top: 0,
//     zIndex: 100
//   },
//   logoArea: {
//     cursor: "pointer", // Hand icon aayega
//     userSelect: "none"
//   },
//   appTitle: { color: "#fff", fontSize: "18px", margin: 0, fontWeight: "600" },
//   userArea: { display: "flex", alignItems: "center", gap: "15px" },
//   userName: { color: "#cbd5e1", fontSize: "13px", display: "block", fontWeight: "600" },
//   userRole: { color: "#94a3b8", fontSize: "11px", display: "block", textTransform: "uppercase" },
//   logoutBtn: {
//     backgroundColor: "#ef4444",
//     color: "#fff",
//     border: "none",
//     padding: "5px 12px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "12px",
//     fontWeight: "600",
//   },
// };

// export default Header;



























import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axios";
import { logoutUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const logout = async () => {
    try {
      // 1. Backend se cookie clear karo
      await api.post("/auth/signout");

      // 2. Local storage saaf karo
      localStorage.removeItem("user");

      // 3. Redux state clear karo
      dispatch(logoutUser());

      toast.success("Logged out successfully");

      // ✅ FIX: 'navigate' ki jagah Hard Redirect use karo
      // Ye browser ko force karega page reload karne ke liye
      window.location.href = "/"; 
      
    } catch (error) {
      console.error("Logout failed", error);
      // Agar error aaye tab bhi user ko bahar fek do (Safety fallback)
      localStorage.removeItem("user");
      dispatch(logoutUser());
      window.location.href = "/";
    }
  };

  return (
    <header style={styles.header}>
      <div 
        style={styles.logoArea} 
        onClick={() => navigate("/dashboard")}
        title="Go to Dashboard"
      >
        <h3 style={styles.appTitle}>📦 InventoryHub</h3>
      </div>

      <div style={styles.userArea}>
        <div style={{ textAlign: "right", lineHeight: "1.2" }}>
          <span style={styles.userName}>Hello, {user?.name || "User"}</span>
          <span style={styles.userRole}>{user?.userType || "Guest"}</span>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#1e293b",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    height: "50px",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  logoArea: { cursor: "pointer", userSelect: "none" },
  appTitle: { color: "#fff", fontSize: "18px", margin: 0, fontWeight: "600" },
  userArea: { display: "flex", alignItems: "center", gap: "15px" },
  userName: { color: "#cbd5e1", fontSize: "13px", display: "block", fontWeight: "600" },
  userRole: { color: "#94a3b8", fontSize: "11px", display: "block", textTransform: "uppercase" },
  logoutBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "5px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
};

export default Header;