// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Edit Modal State
//   const [editingUser, setEditingUser] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", email: "", username: "", userType: "" });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // 1️⃣ Fetch All Users
//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users/all");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2️⃣ Delete User
//   const handleDelete = async (id, name) => {
//     if (window.confirm(`Are you sure you want to delete ${name}?`)) {
//       try {
//         await api.delete(`/users/${id}`);
//         toast.success("User deleted");
//         fetchUsers(); // Refresh list
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Delete failed");
//       }
//     }
//   };

//   // 3️⃣ Reset Password (Prompt se)
//   const handleResetPass = async (id) => {
//     const newPass = window.prompt("Enter new password for this user:");
//     if (!newPass) return;
//     if (newPass.length < 6) return toast.error("Password must be 6+ chars");

//     try {
//       await api.put(`/users/reset-password/${id}`, { newPassword: newPass });
//       toast.success("Password reset successfully");
//     } catch (error) {
//       toast.error("Failed to reset password");
//     }
//   };

//   // 4️⃣ Open Edit Modal
//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setEditForm({
//       name: user.name,
//       email: user.email,
//       username: user.username,
//       userType: user.userType
//     });
//   };

//   // 5️⃣ Save Edited User
//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/users/${editingUser._id}`, editForm);
//       toast.success("User updated");
//       setEditingUser(null); // Close modal
//       fetchUsers(); // Refresh list
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
      
//       {/* HEADER */}
//       <div style={styles.header}>
//         <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
//            <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
//            <h2 style={{margin: 0, fontSize: "20px", color: "#333"}}>User Management</h2>
//         </div>
//         <button onClick={() => navigate("/create-user")} style={styles.createBtn}>
//           ➕ Create New User
//         </button>
//       </div>

//       {/* TABLE */}
//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Name</th>
//               <th style={styles.th}>Username</th>
//               <th style={styles.th}>Email</th>
//               <th style={styles.th}>Role</th>
//               <th style={{...styles.th, textAlign: "right"}}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="5" style={{padding: "20px", textAlign: "center"}}>Loading users...</td></tr>
//             ) : users.map((u) => (
//               <tr key={u._id} style={styles.row}>
//                 <td style={styles.td}><b>{u.name}</b></td>
//                 <td style={styles.td}>{u.username}</td>
//                 <td style={styles.td}>{u.email}</td>
//                 <td style={styles.td}>
//                    <span style={{
//                       ...styles.roleBadge,
//                       background: u.userType === "admin" ? "#e3f2fd" : u.userType === "superuser" ? "#fff3e0" : "#f5f5f5",
//                       color: u.userType === "admin" ? "#1976D2" : u.userType === "superuser" ? "#f57c00" : "#666"
//                    }}>
//                      {u.userType.toUpperCase()}
//                    </span>
//                 </td>
//                 <td style={{...styles.td, textAlign: "right"}}>
//                   <button onClick={() => handleEditClick(u)} style={styles.editBtn}>Edit</button>
//                   <button onClick={() => handleResetPass(u._id)} style={styles.keyBtn} title="Reset Password">🔑</button>
//                   <button onClick={() => handleDelete(u._id, u.name)} style={styles.delBtn}>🗑</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* EDIT MODAL (Simple Overlay) */}
//       {editingUser && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0}}>Edit User</h3>
//             <form onSubmit={handleUpdateUser} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
//               <input 
//                 value={editForm.name} 
//                 onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
//                 placeholder="Name" style={styles.input} required 
//               />
//               <input 
//                 value={editForm.username} 
//                 onChange={(e) => setEditForm({...editForm, username: e.target.value})} 
//                 placeholder="Username" style={styles.input} required 
//               />
//               <input 
//                 value={editForm.email} 
//                 onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
//                 placeholder="Email" style={styles.input} required 
//               />
//               <select 
//                 value={editForm.userType} 
//                 onChange={(e) => setEditForm({...editForm, userType: e.target.value})} 
//                 style={styles.input}
//               >
//                 <option value="user">User</option>
//                 <option value="superuser">Superuser</option>
//                 <option value="admin">Admin</option>
//               </select>
              
//               <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
//                 <button type="submit" style={styles.saveBtn}>Save Changes</button>
//                 <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// // ✨ COMPACT & CLEAN STYLES
// const styles = {
//   container: { padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif" },
//   header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  
//   backBtn: { background: "none", border: "1px solid #ddd", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" },
//   createBtn: { background: "#2e7d32", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" },

//   tableWrapper: { border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden", background: "#fff" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "10px 15px", background: "#f8f9fa", textAlign: "left", fontSize: "13px", color: "#555", borderBottom: "1px solid #ddd" },
//   td: { padding: "10px 15px", borderBottom: "1px solid #eee", fontSize: "14px", color: "#333" },
//   row: { background: "#fff" },

//   roleBadge: { padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" },

//   // Action Buttons
//   editBtn: { marginRight: "5px", padding: "4px 8px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
//   keyBtn: { marginRight: "5px", padding: "4px 8px", background: "#FF9800", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
//   delBtn: { padding: "4px 8px", background: "#ef5350", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },

//   // Modal
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
//   modalContent: { background: "#fff", padding: "25px", borderRadius: "8px", width: "300px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" },
//   input: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "100%", boxSizing: "border-box" },
//   saveBtn: { flex: 1, background: "#1976D2", color: "#fff", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer" },
//   cancelBtn: { flex: 1, background: "#ddd", color: "#333", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer" }
// };










// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header"; // ✅ Header Import

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Edit Modal State
//   const [editingUser, setEditingUser] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", email: "", username: "", userType: "" });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // 1️⃣ Fetch All Users
//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users/all");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2️⃣ Delete User
//   const handleDelete = async (id, name) => {
//     if (window.confirm(`Are you sure you want to delete ${name}?`)) {
//       try {
//         await api.delete(`/users/${id}`);
//         toast.success("User deleted");
//         fetchUsers(); 
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Delete failed");
//       }
//     }
//   };

//   // 3️⃣ Reset Password
//   const handleResetPass = async (id) => {
//     const newPass = window.prompt("Enter new password for this user:");
//     if (!newPass) return;
//     if (newPass.length < 6) return toast.error("Password must be 6+ chars");

//     try {
//       await api.put(`/users/reset-password/${id}`, { newPassword: newPass });
//       toast.success("Password reset successfully");
//     } catch (error) {
//       toast.error("Failed to reset password");
//     }
//   };

//   // 4️⃣ Open Edit Modal
//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setEditForm({
//       name: user.name,
//       email: user.email,
//       username: user.username,
//       userType: user.userType
//     });
//   };

//   // 5️⃣ Save Edited User
//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/users/${editingUser._id}`, editForm);
//       toast.success("User updated");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
      
//       {/* ✅ HEADER ADDED */}
//       <Header />

//       {/* MAIN CONTENT */}
//       <div style={styles.mainContent}>
        
//         {/* PAGE HEADER (Title + Create Button) */}
//         <div style={styles.pageHeader}>
//           <div>
//             <h2 style={styles.pageTitle}>User Management</h2>
//             <p style={styles.pageSubtitle}>Manage system access and permissions</p>
//           </div>
//           <button onClick={() => navigate("/create-user")} style={styles.createBtn}>
//              ➕ Create New User
//           </button>
//         </div>

//         {/* TABLE CARD */}
//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Username</th>
//                 <th style={styles.th}>Email</th>
//                 <th style={styles.th}>Role</th>
//                 <th style={{...styles.th, textAlign: "right"}}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="5" style={{padding: "30px", textAlign: "center", color: "#666"}}>Loading users...</td></tr>
//               ) : users.length === 0 ? (
//                 <tr><td colSpan="5" style={{padding: "30px", textAlign: "center", color: "#666"}}>No users found.</td></tr>
//               ) : (
//                 users.map((u) => (
//                   <tr key={u._id} style={styles.row}>
//                     <td style={styles.td}>
//                       <span style={{fontWeight: "600", color: "#333"}}>{u.name}</span>
//                     </td>
//                     <td style={styles.td}>{u.username}</td>
//                     <td style={styles.td}>{u.email}</td>
//                     <td style={styles.td}>
//                       <span style={{
//                         ...styles.roleBadge,
//                         background: u.userType === "admin" ? "#e0f2fe" : u.userType === "superuser" ? "#fff7ed" : "#f3f4f6",
//                         color: u.userType === "admin" ? "#0284c7" : u.userType === "superuser" ? "#c2410c" : "#4b5563"
//                       }}>
//                         {u.userType.toUpperCase()}
//                       </span>
//                     </td>
//                     <td style={{...styles.td, textAlign: "right"}}>
//                       <button onClick={() => handleEditClick(u)} style={styles.actionBtn}>Edit</button>
//                       <button onClick={() => handleResetPass(u._id)} style={{...styles.actionBtn, color: "#f59e0b"}} title="Reset Password">Pass</button>
//                       <button onClick={() => handleDelete(u._id, u.name)} style={{...styles.actionBtn, color: "#ef4444"}} title="Delete">Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* EDIT MODAL */}
//       {editingUser && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0, marginBottom: "20px", color: "#1e293b"}}>Edit User Details</h3>
//             <form onSubmit={handleUpdateUser} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
//               <div>
//                 <label style={styles.label}>Name</label>
//                 <input 
//                   value={editForm.name} 
//                   onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
//                   style={styles.input} required 
//                 />
//               </div>
//               <div>
//                 <label style={styles.label}>Username</label>
//                 <input 
//                   value={editForm.username} 
//                   onChange={(e) => setEditForm({...editForm, username: e.target.value})} 
//                   style={styles.input} required 
//                 />
//               </div>
//               <div>
//                 <label style={styles.label}>Email</label>
//                 <input 
//                   value={editForm.email} 
//                   onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
//                   style={styles.input} required 
//                 />
//               </div>
//               <div>
//                 <label style={styles.label}>Role</label>
//                 <select 
//                   value={editForm.userType} 
//                   onChange={(e) => setEditForm({...editForm, userType: e.target.value})} 
//                   style={styles.input}
//                 >
//                   <option value="user">User</option>
//                   <option value="superuser">Superuser</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
              
//               <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
//                 <button type="submit" style={styles.saveBtn}>Save Changes</button>
//                 <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// // ✨ UPDATED PROFESSIONAL STYLES
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6", // Matching light grey background
//     fontFamily: "'Segoe UI', sans-serif",
//     display: "flex",
//     flexDirection: "column",
//   },
  
//   mainContent: {
//     padding: "30px 20px",
//     width: "100%",
//     maxWidth: "1000px",
//     margin: "0 auto",
//     boxSizing: "border-box",
//   },

//   // Page Header Area
//   pageHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "25px",
//   },
//   pageTitle: {
//     margin: "0",
//     fontSize: "24px",
//     color: "#1e293b",
//     fontWeight: "700",
//   },
//   pageSubtitle: {
//     margin: "5px 0 0 0",
//     color: "#64748b",
//     fontSize: "14px",
//   },
//   createBtn: {
//     backgroundColor: "#16a34a",
//     color: "#fff",
//     border: "none",
//     padding: "10px 20px",
//     borderRadius: "8px",
//     fontWeight: "600",
//     cursor: "pointer",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//     transition: "0.2s",
//     fontSize: "14px",
//     display: "flex",
//     alignItems: "center",
//     gap: "5px"
//   },

//   // Table Card
//   tableCard: {
//     backgroundColor: "#ffffff",
//     borderRadius: "12px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden", // Important for rounded corners
//     border: "1px solid #e2e8f0",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   th: {
//     padding: "15px 20px",
//     backgroundColor: "#f8fafc",
//     textAlign: "left",
//     fontSize: "13px",
//     fontWeight: "600",
//     color: "#64748b",
//     textTransform: "uppercase",
//     borderBottom: "1px solid #e2e8f0",
//   },
//   td: {
//     padding: "15px 20px",
//     borderBottom: "1px solid #f1f5f9",
//     fontSize: "14px",
//     color: "#334155",
//   },
//   row: {
//     transition: "background-color 0.1s",
//   },
  
//   // Badges & Buttons
//   roleBadge: {
//     padding: "4px 10px",
//     borderRadius: "20px",
//     fontSize: "11px",
//     fontWeight: "700",
//     display: "inline-block",
//   },
//   actionBtn: {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//     padding: "5px",
//     marginLeft: "5px",
//     transition: "transform 0.1s",
//   },

//   // Modal Styles
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "rgba(15, 23, 42, 0.6)", // Darker overlay
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modalContent: {
//     background: "#fff",
//     padding: "30px",
//     borderRadius: "12px",
//     width: "400px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//   },
//   label: {
//     display: "block",
//     marginBottom: "5px",
//     fontSize: "13px",
//     fontWeight: "600",
//     color: "#475569",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     fontSize: "14px",
//     boxSizing: "border-box",
//     outline: "none",
//     transition: "border 0.2s",
//   },
//   saveBtn: {
//     flex: 1,
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     border: "none",
//     padding: "10px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   cancelBtn: {
//     flex: 1,
//     backgroundColor: "#f1f5f9",
//     color: "#475569",
//     border: "1px solid #cbd5e1",
//     padding: "10px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
// };







// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Edit Modal State
//   const [editingUser, setEditingUser] = useState(null);
  
//   // ✅ State me 'password' add kiya
//   const [editForm, setEditForm] = useState({ 
//     name: "", 
//     email: "", 
//     username: "", 
//     userType: "", 
//     password: "" // New field
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users/all");
//       setUsers(res.data);
//     } catch (error) {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, name) => {
//     if (window.confirm(`Are you sure you want to delete ${name}?`)) {
//       try {
//         await api.delete(`/users/${id}`);
//         toast.success("User deleted");
//         fetchUsers(); 
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Delete failed");
//       }
//     }
//   };

//   // 4️⃣ Open Edit Modal (Set Data + Empty Password)
//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setEditForm({
//       name: user.name,
//       email: user.email,
//       username: user.username,
//       userType: user.userType,
//       password: "" // Hamesha empty rakhenge start me
//     });
//   };

//   // 5️⃣ Save Edited User (Details + Password Logic)
//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//       // 1. Pehle Details Update karo
//       await api.put(`/users/${editingUser._id}`, {
//         name: editForm.name,
//         email: editForm.email,
//         username: editForm.username,
//         userType: editForm.userType
//       });

//       // 2. Agar Password field me kuch likha hai, tabhi Password update karo
//       if (editForm.password && editForm.password.trim() !== "") {
//          if (editForm.password.length < 6) {
//             return toast.error("Password must be at least 6 chars");
//          }
//          // Password Reset API Call
//          await api.put(`/users/reset-password/${editingUser._id}`, { 
//             newPassword: editForm.password 
//          });
//       }

//       toast.success("User updated successfully");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (error) {
//       console.error(error);
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
      
//       <Header />

//       <div style={styles.mainContent}>
        
//         {/* PAGE HEADER */}
//         <div style={styles.pageHeader}>
//           <div>
//             <h2 style={styles.pageTitle}>User Management</h2>
//             <p style={styles.pageSubtitle}>Manage system access and permissions</p>
//           </div>
//           <button onClick={() => navigate("/create-user")} style={styles.createBtn}>
//              ➕ Create New User
//           </button>
//         </div>

//         {/* TABLE CARD */}
//         <div style={styles.tableCard}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Username</th>
//                 <th style={styles.th}>Email</th>
//                 <th style={styles.th}>Role</th>
//                 <th style={{...styles.th, textAlign: "right"}}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan="5" style={{padding: "30px", textAlign: "center", color: "#666"}}>Loading users...</td></tr>
//               ) : users.length === 0 ? (
//                 <tr><td colSpan="5" style={{padding: "30px", textAlign: "center", color: "#666"}}>No users found.</td></tr>
//               ) : (
//                 users.map((u) => (
//                   <tr key={u._id} style={styles.row}>
//                     <td style={styles.td}>
//                       <span style={{fontWeight: "600", color: "#333"}}>{u.name}</span>
//                     </td>
//                     <td style={styles.td}>{u.username}</td>
//                     <td style={styles.td}>{u.email}</td>
//                     <td style={styles.td}>
//                       <span style={{
//                         ...styles.roleBadge,
//                         background: u.userType === "admin" ? "#e0f2fe" : u.userType === "superuser" ? "#fff7ed" : "#f3f4f6",
//                         color: u.userType === "admin" ? "#0284c7" : u.userType === "superuser" ? "#c2410c" : "#4b5563"
//                       }}>
//                         {u.userType.toUpperCase()}
//                       </span>
//                     </td>
//                     <td style={{...styles.td, textAlign: "right"}}>
//                       <button onClick={() => handleEditClick(u)} style={styles.editBtn}>Edit</button>
//                       <button onClick={() => handleDelete(u._id, u.name)} style={styles.deleteBtn}>Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* EDIT MODAL */}
//       {editingUser && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={{marginTop: 0, marginBottom: "20px", color: "#1e293b"}}>Edit User Details</h3>
            
//             <form onSubmit={handleUpdateUser} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
              
//               <div style={styles.rowGroup}>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Name</label>
//                     <input 
//                       value={editForm.name} 
//                       onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
//                       style={styles.input} required 
//                     />
//                  </div>
//                  <div style={{flex: 1}}>
//                     <label style={styles.label}>Username</label>
//                     <input 
//                       value={editForm.username} 
//                       onChange={(e) => setEditForm({...editForm, username: e.target.value})} 
//                       style={styles.input} required 
//                     />
//                  </div>
//               </div>

//               <div>
//                 <label style={styles.label}>Email</label>
//                 <input 
//                   value={editForm.email} 
//                   onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
//                   style={styles.input} required 
//                 />
//               </div>

//               <div>
//                 <label style={styles.label}>Role</label>
//                 <select 
//                   value={editForm.userType} 
//                   onChange={(e) => setEditForm({...editForm, userType: e.target.value})} 
//                   style={styles.input}
//                 >
//                   <option value="user">User</option>
//                   <option value="superuser">Superuser</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>

//               {/* ✅ NEW PASSWORD FIELD */}
//               <div style={{background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1"}}>
//                 <label style={{...styles.label, color: "#ef4444"}}>
//                     Change Password <span style={{fontWeight: "400", color: "#64748b", fontSize: "12px"}}>(Optional)</span>
//                 </label>
//                 <input 
//                   type="text" 
//                   placeholder="Enter new password to reset"
//                   value={editForm.password} 
//                   onChange={(e) => setEditForm({...editForm, password: e.target.value})} 
//                   style={styles.input} 
//                 />
//               </div>
              
//               <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>
//                 <button type="submit" style={styles.saveBtn}>Save Changes</button>
//                 <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6",
//     fontFamily: "'Segoe UI', sans-serif",
//     display: "flex",
//     flexDirection: "column",
//   },
//   mainContent: {
//     padding: "30px 20px",
//     width: "100%",
//     maxWidth: "1000px",
//     margin: "0 auto",
//     boxSizing: "border-box",
//   },
//   pageHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "25px",
//   },
//   pageTitle: { margin: "0", fontSize: "24px", color: "#1e293b", fontWeight: "700" },
//   pageSubtitle: { margin: "5px 0 0 0", color: "#64748b", fontSize: "14px" },
//   createBtn: {
//     backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "10px 20px",
//     borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px"
//   },
//   tableCard: {
//     backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden", border: "1px solid #e2e8f0",
//   },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: {
//     padding: "15px 20px", backgroundColor: "#f8fafc", textAlign: "left", fontSize: "13px",
//     fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0",
//   },
//   td: { padding: "15px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155" },
//   row: { transition: "background-color 0.1s" },
//   roleBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", display: "inline-block" },
  
//   // Table Buttons
//   editBtn: { background: "#eff6ff", color: "#2563eb", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", cursor: "pointer", marginRight: "8px" },
//   deleteBtn: { background: "#fef2f2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "600", cursor: "pointer" },

//   // Modal
//   modalOverlay: {
//     position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.6)",
//     display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000,
//   },
//   modalContent: {
//     background: "#fff", padding: "30px", borderRadius: "12px", width: "450px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//   },
//   rowGroup: { display: "flex", gap: "15px" },
//   label: { display: "block", marginBottom: "5px", fontSize: "13px", fontWeight: "600", color: "#475569" },
//   input: {
//     width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1",
//     fontSize: "14px", boxSizing: "border-box", outline: "none", transition: "border 0.2s",
//   },
//   saveBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
//   cancelBtn: { flex: 1, backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
// };









import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- MODAL STATES ---
  const [editingUser, setEditingUser] = useState(null); // Edit Form ke liye
  const [deleteModal, setDeleteModal] = useState(null); // Delete Confirmation ke liye (User Object store karega)
  const [freezeModal, setFreezeModal] = useState(null); // Freeze Confirmation ke liye (User Object store karega)

  // Edit Form State
  const [editForm, setEditForm] = useState({ 
    name: "", email: "", username: "", userType: "", password: "" 
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/all");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // --- 1. FREEZE / UNFREEZE LOGIC ---
  
  // Step A: Modal Kholo
  const openFreezeModal = (user) => {
    setFreezeModal(user);
  };

  // Step B: Confirm karne par API call
  const confirmFreezeToggle = async () => {
    if (!freezeModal) return;
    try {
      await api.put(`/users/toggle-freeze/${freezeModal._id}`);
      toast.success(freezeModal.isFrozen ? "User Unfrozen Successfully" : "User Frozen Successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Action failed");
    }
    setFreezeModal(null); // Close Modal
  };

  // --- 2. DELETE LOGIC ---

  // Step A: Modal Kholo
  const openDeleteModal = (user) => {
    setDeleteModal(user);
  };

  // Step B: Confirm delete
  const confirmDelete = async () => {
    if (!deleteModal) return;
    try {
      await api.delete(`/users/${deleteModal._id}`);
      toast.success("User deleted");
      fetchUsers(); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
    setDeleteModal(null); // Close Modal
  };

  // --- 3. EDIT LOGIC (Existing) ---
  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      username: user.username,
      userType: user.userType,
      password: "" 
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editingUser._id}`, {
        name: editForm.name,
        email: editForm.email,
        username: editForm.username,
        userType: editForm.userType
      });

      if (editForm.password && editForm.password.trim() !== "") {
         if (editForm.password.length < 6) return toast.error("Password too short");
         await api.put(`/users/reset-password/${editingUser._id}`, { newPassword: editForm.password });
      }

      toast.success("User updated");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.mainContent}>
        
        {/* HEADER */}
        <div style={styles.pageHeader}>
          <div>
            <h2 style={styles.pageTitle}>User Management</h2>
            <p style={styles.pageSubtitle}>Manage access and freeze accounts</p>
          </div>
          <button onClick={() => navigate("/create-user")} style={styles.createBtn}>
             ➕ Create New User
          </button>
        </div>

        {/* TABLE */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name / Username</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th> {/* ✅ Status Column */}
                <th style={{...styles.th, textAlign: "right"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={{padding: "30px", textAlign: "center"}}>Loading...</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} style={styles.row}>
                    <td style={styles.td}>
                      <div style={{fontWeight: "600", color: "#333"}}>{u.name}</div>
                      <div style={{fontSize: "12px", color: "#666"}}>@{u.username}</div>
                    </td>
                    
                    <td style={styles.td}>
                      <span style={{
                        ...styles.roleBadge,
                        background: u.userType === "admin" ? "#e0f2fe" : "#f3f4f6",
                        color: u.userType === "admin" ? "#0284c7" : "#4b5563"
                      }}>{u.userType.toUpperCase()}</span>
                    </td>

                    {/* ✅ STATUS BADGE */}
                    <td style={styles.td}>
                        <span style={{
                            ...styles.statusBadge,
                            backgroundColor: u.isFrozen ? "#fee2e2" : "#dcfce7",
                            color: u.isFrozen ? "#dc2626" : "#166534"
                        }}>
                            {u.isFrozen ? "❄️ Frozen" : "● Active"}
                        </span>
                    </td>

                    <td style={{...styles.td, textAlign: "right"}}>
                      {/* Toggle Freeze Button */}
                      <button 
                        onClick={() => openFreezeModal(u)} 
                        style={u.isFrozen ? styles.unfreezeBtn : styles.freezeBtn}
                        title={u.isFrozen ? "Unfreeze Account" : "Freeze Account"}
                      >
                         {u.isFrozen ? "Unfreeze" : " Freeze"}
                      </button>

                      <button onClick={() => handleEditClick(u)} style={styles.editBtn}> Edit</button>
                      <button onClick={() => openDeleteModal(u)} style={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL 1: EDIT FORM --- */}
      {editingUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Edit User</h3>
            <form onSubmit={handleUpdateUser} style={styles.formStack}>
               <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} style={styles.input} required placeholder="Name" />
               <input value={editForm.username} onChange={(e) => setEditForm({...editForm, username: e.target.value})} style={styles.input} required placeholder="Username" />
               <input value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} style={styles.input} required placeholder="Email" />
               <select value={editForm.userType} onChange={(e) => setEditForm({...editForm, userType: e.target.value})} style={styles.input}>
                  <option value="user">User</option>
                  <option value="superuser">Superuser</option>
                  <option value="admin">Admin</option>
               </select>
               <div style={styles.passwordBox}>
                <label style={{fontSize: "11px", color: "#ef4444", fontWeight: "bold"}}>Reset Password (Optional)</label>
                <input type="text" placeholder="New Password" value={editForm.password} onChange={(e) => setEditForm({...editForm, password: e.target.value})} style={styles.input} />
               </div>
               <div style={styles.modalActions}>
                <button type="submit" style={styles.saveBtn}>Save</button>
                <button type="button" onClick={() => setEditingUser(null)} style={styles.cancelBtn}>Cancel</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: DELETE CONFIRMATION --- */}
      {deleteModal && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContent, width: '350px', textAlign: 'center'}}>
             <div style={{fontSize: '40px', marginBottom: '10px'}}>🗑️</div>
             <h3 style={{margin: '0 0 10px 0', color: '#dc2626'}}>Delete User?</h3>
             <p style={{fontSize: '14px', color: '#555'}}>Are you sure you want to delete <b>{deleteModal.name}</b>?</p>
             <div style={styles.modalActions}>
                <button onClick={confirmDelete} style={{...styles.saveBtn, background: '#dc2626'}}>Yes, Delete</button>
                <button onClick={() => setDeleteModal(null)} style={styles.cancelBtn}>Cancel</button>
             </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: FREEZE/UNFREEZE CONFIRMATION --- */}
      {freezeModal && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContent, width: '350px', textAlign: 'center'}}>
             <div style={{fontSize: '40px', marginBottom: '10px'}}>
               {freezeModal.isFrozen ? "🔓" : "❄️"}
             </div>
             <h3 style={{margin: '0 0 10px 0', color: '#333'}}>
                {freezeModal.isFrozen ? "Unfreeze Account?" : "Freeze Account?"}
             </h3>
             <p style={{fontSize: '14px', color: '#555'}}>
               {freezeModal.isFrozen 
                 ? `Allow ${freezeModal.name} to login again?`
                 : `Block ${freezeModal.name} from logging in?`
               }
             </p>
             <div style={styles.modalActions}>
                <button onClick={confirmFreezeToggle} style={styles.saveBtn}>
                   {freezeModal.isFrozen ? "Yes, Unfreeze" : "Yes, Freeze"}
                </button>
                <button onClick={() => setFreezeModal(null)} style={styles.cancelBtn}>Cancel</button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ✨ STYLES
const styles = {
  container: { minHeight: "100vh", backgroundColor: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif", display: "flex", flexDirection: "column" },
  mainContent: { padding: "30px 20px", maxWidth: "1000px", margin: "0 auto", width: "100%", boxSizing: "border-box" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" },
  pageTitle: { margin: "0", fontSize: "24px", color: "#1e293b", fontWeight: "700" },
  pageSubtitle: { margin: "5px 0 0 0", color: "#64748b", fontSize: "14px" },
  createBtn: { backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" },
  tableCard: { backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)", overflow: "hidden", border: "1px solid #e2e8f0" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "15px 20px", backgroundColor: "#f8fafc", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "15px 20px", borderBottom: "1px solid #f1f5f9", fontSize: "14px", color: "#334155", verticalAlign: "middle" },
  row: { transition: "background-color 0.1s" },
  
  // Badges
  roleBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", display: "inline-block" },
  statusBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "inline-block" },

  // Buttons in Row
  unfreezeBtn: { background: "#fff", border: "1px solid #22c55e", color: "#16a34a", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: "600", marginRight: "8px" },
  freezeBtn: { background: "#fff", border: "1px solid #cbd5e1", color: "#64748b", padding: "5px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: "600", marginRight: "8px" },
  editBtn: { background: "#eff6ff", color: "#2563eb", border: "none", padding: "6px 10px", borderRadius: "6px", fontSize: "14px", cursor: "pointer", marginRight: "8px" },
  deleteBtn: { background: "#fef2f2", color: "#dc2626", border: "none", padding: "6px 10px", borderRadius: "6px", fontSize: "14px", cursor: "pointer" },

  // Modal Styles
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
  modalContent: { background: "#fff", padding: "30px", borderRadius: "12px", width: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  modalTitle: { marginTop: 0, marginBottom: "20px", color: "#1e293b" },
  formStack: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box", outline: "none" },
  passwordBox: { background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" },
  modalActions: { display: "flex", gap: "10px", marginTop: "10px" },
  saveBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
  cancelBtn: { flex: 1, backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" },
};