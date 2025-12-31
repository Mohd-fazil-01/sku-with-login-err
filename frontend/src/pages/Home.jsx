// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import ProductList from "../components/ProductList";
// // import SkuUpdate from "../components/SkuUpdate";
// // import { useNavigate } from "react-router-dom";

// // export default function Home() {
// //   const [products, setProducts] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [categoryFilter, setCategoryFilter] = useState("");
// //   const [showData, setShowData] = useState(false);

// //   const navigate = useNavigate();

// //   const fetchProducts = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:7000/api/products");
// //       setProducts(res.data);
// //     } catch (err) {
// //       console.error("Fetch Error:", err);
// //     }
// //   };

// //   const logout = () => {
// //   localStorage.removeItem("token");
// //   window.location.href = "/";
// // };


// //   const handleSearch = async () => {
// //     if (!search.trim() && !categoryFilter) {
// //       return alert("Enter something or select a category to search.");
// //     }

// //     await fetchProducts();
// //     setShowData(true);
// //   };

// //   const filteredProducts = products.filter((p) => {
// //     const s = search.toLowerCase();

// //     const matchSearch =
// //       p.name.toLowerCase().includes(s) ||
// //       p.color.toLowerCase().includes(s) ||
// //       p.category.toLowerCase().includes(s);

// //     const matchCategory =
// //       categoryFilter === "" || categoryFilter === "All"
// //         ? true
// //         : p.category === categoryFilter;

// //     return matchSearch && matchCategory;
// //   });

// //   useEffect(() => {
// //     if (!search.trim() && !categoryFilter) {
// //       setShowData(false);
// //     }
// //   }, [search, categoryFilter]);

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         background: "#fafafa",
// //         display: "flex",
// //         flexDirection: "column",
// //         alignItems: "center",
// //         paddingTop: 40,
// //       }}
// //     >
// //       {/* Title */}
// //       <h1 style={{ fontSize: "36px", marginBottom: 30, color: "#202124" }}>
// //         Inventory Search
// //       </h1>

// //       {/* Search Box Area – Styled like Google */}
// //       <div
// //         style={{
// //           background: "#fff",
// //           padding: 25,
// //           borderRadius: 30,
// //           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
// //           display: "flex",
// //           alignItems: "center",
// //           gap: 10,
// //           width: "90%",
// //           maxWidth: "650px",
// //         }}
// //       >
// //         {/* Search Input */}
// //         <input
// //           type="text"
// //           placeholder="Search by name, color, category..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           style={{
// //             flex: 1,
// //             padding: "12px 18px",
// //             borderRadius: 25,
// //             border: "1px solid #ddd",
// //             fontSize: "15px",
// //           }}
// //         />

// //         {/* Category Filter */}
// //         <select
// //           value={categoryFilter}
// //           onChange={(e) => setCategoryFilter(e.target.value)}
// //           style={{
// //             padding: "10px 15px",
// //             borderRadius: 25,
// //             border: "1px solid #ddd",
// //             fontSize: "15px",
// //             background: "white",
// //           }}
// //         >
// //           <option value="">Choose Category</option>
// //           <option value="All">All Categories</option>
// //           <option value="Die-cast">Die-cast</option>
// //           <option value="Remote Control">Remote Control</option>
// //           <option value="Soft Toy">Soft Toy</option>
// //           <option value="Board Game">Board Game</option>
// //           <option value="Scooter">Scooter</option>
// //         </select>

// //         {/* Search Button */}
// //         <button
// //           onClick={handleSearch}
// //           style={{
// //             padding: "10px 20px",
// //             borderRadius: 25,
// //             border: "none",
// //             background: "#1a73e8",
// //             color: "white",
// //             fontSize: "15px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           Search
// //         </button>
// //       </div>

// //       {/* Page Buttons */}
// //       <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
// //         <button
// //           onClick={() => navigate("/add-product")}
// //           style={{
// //             padding: "10px 20px",
// //             borderRadius: 25,
// //             background: "#34a853",
// //             color: "white",
// //             border: "none",
// //             cursor: "pointer",
// //           }}
// //         >
// //           + Add Product
// //         </button>

// //         <button
// //           onClick={() => navigate("/graphs")}
// //           style={{
// //             padding: "10px 20px",
// //             borderRadius: 25,
// //             background: "#673ab7",
// //             color: "white",
// //             border: "none",
// //             cursor: "pointer",
// //           }}
// //         >
// //           📊 Graphs
// //         </button>
// //       </div>
// //       <button
// //         onClick={() => navigate("/create-user")}
// //         style={{
// //           padding: "10px 20px",
// //           borderRadius: 25,
// //           background: "#ff9800",
// //           color: "white",
// //           border: "none",
// //           cursor: "pointer",
// //         }}
// //       >
// //         👤 Create User
// //       </button>
// //       <button onClick={logout}>Logout</button>


// //       {/* SKU Update Form */}
// //       <div style={{ marginTop: 30 }}>
// //         <SkuUpdate onUpdated={fetchProducts} />
// //       </div>

// //       {/* Results Section */}
// //       {showData && (
// //         <div style={{ width: "95%", maxWidth: 1100, marginTop: 30 }}>
// //           <button
// //             onClick={() => setShowData(false)}
// //             style={{
// //               padding: "8px 15px",
// //               background: "#d93025",
// //               color: "white",
// //               border: "none",
// //               borderRadius: 25,
// //               marginBottom: 15,
// //             }}
// //           >
// //             Close Results
// //           </button>

// //           {/* ⭐ ProductList Wahi Andar Rahega ⭐ */}
// //           <ProductList
// //             products={filteredProducts}
// //             onEdit={() => alert("Edit only from Add Product Page.")}
// //             onDelete={async (id) => {
// //               await axios.delete(`http://localhost:7000/api/products/${id}`);
// //               fetchProducts();
// //             }}
// //           />


// //         </div>
// //       )}

// //     </div>
// //   );
// // }





































// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import ProductList from "../components/ProductList";
// import SkuUpdate from "../components/SkuUpdate";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios"
// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [showData, setShowData] = useState(false);
//   const user = useSelector((state) => state.user.userData);

//   const navigate = useNavigate();

//   // 🔹 Fetch products
//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//   };

//   // 🔹 Logout (COOKIE BASED – CORRECT)
// const logout = async () => {
//   try {
//     await axios.post(
//       "http://localhost:7000/api/auth/signout", // 👈 CORRECT ROUTE
//       {},
//       { withCredentials: true }
//     );

//     window.location.href = "/login";
//   } catch (error) {
//     console.error("Logout failed", error);
//   }
// };


//   // 🔹 Search
//   const handleSearch = async () => {
//     if (!search.trim() && !categoryFilter) {
//       return alert("Enter something or select a category.");
//     }
//     await fetchProducts();
//     setShowData(true);
//   };

//   // 🔹 Filter logic
//   const filteredProducts = products.filter((p) => {
//     const s = search.toLowerCase();

//     const matchSearch =
//       p.name.toLowerCase().includes(s) ||
//       p.color.toLowerCase().includes(s) ||
//       p.category.toLowerCase().includes(s);

//     const matchCategory =
//       !categoryFilter || categoryFilter === "All"
//         ? true
//         : p.category === categoryFilter;

//     return matchSearch && matchCategory;
//   });

//   useEffect(() => {
//     if (!search.trim() && !categoryFilter) {
//       setShowData(false);
//     }
//   }, [search, categoryFilter]);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#fafafa",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         paddingTop: 40,
//       }}
//     >
//       <h1 style={{ fontSize: 36, marginBottom: 30 }}>
//         Inventory Search
//       </h1>
//       {/* <p>Hello, {user.name}</p> */}

//       {/* 🔍 Search Box */}
//       <div
//         style={{
//           background: "#fff",
//           padding: 25,
//           borderRadius: 30,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           display: "flex",
//           gap: 10,
//           width: "90%",
//           maxWidth: 650,
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Search by name, color, category..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             flex: 1,
//             padding: "12px 18px",
//             borderRadius: 25,
//             border: "1px solid #ddd",
//           }}
//         />

//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           style={{
//             padding: "10px 15px",
//             borderRadius: 25,
//             border: "1px solid #ddd",
//           }}
//         >
//           <option value="">Choose Category</option>
//           <option value="All">All</option>
//           <option value="Die-cast">Die-cast</option>
//           <option value="Remote Control">Remote Control</option>
//           <option value="Soft Toy">Soft Toy</option>
//           <option value="Board Game">Board Game</option>
//           <option value="Scooter">Scooter</option>
//         </select>

//         <button
//           onClick={handleSearch}
//           style={{
//             padding: "10px 20px",
//             borderRadius: 25,
//             background: "#1a73e8",
//             color: "#fff",
//             border: "none",
//           }}
//         >
//           Search
//         </button>
//       </div>

//       {/* 🔘 Action Buttons */}
//       <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
//         <button onClick={() => navigate("/add-product")}>
//           + Add Product
//         </button>
//         <button onClick={() => navigate("/graphs")}>
//           📊 Graphs
//         </button>
//         <button onClick={() => navigate("/create-user")}>
//           👤 Create User
//         </button>
//         <button onClick={logout} style={{ background: "red", color: "#fff" }}>
//           Logout
//         </button>
//       </div>

//       {/* 🔄 SKU Update */}
//       <div style={{ marginTop: 30 }}>
//         <SkuUpdate onUpdated={fetchProducts} />
//       </div>

//       {/* 📦 Results */}
//       {showData && (
//         <div style={{ width: "95%", maxWidth: 1100, marginTop: 30 }}>
//           <button
//             onClick={() => setShowData(false)}
//             style={{ marginBottom: 15 }}
//           >
//             Close Results
//           </button>

//           <ProductList
//             products={filteredProducts}
//             onEdit={() => alert("Edit from Add Product page")}
//             onDelete={async (id) => {
//               await api.delete(`/products/${id}`);
//               fetchProducts();
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }























// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../api/axios";
// import ProductList from "../components/ProductList";
// import SkuUpdate from "../components/SkuUpdate";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { logoutUser } from "../redux/userSlice";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [showData, setShowData] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   // Redux se user data nikala
//   const user = useSelector((state) => state.user.userData);
//   const navigate = useNavigate();

//   // 🔒 ROLE BASED LOGIC
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser; // Admin or Superuser can edit inventory

//   // 🔹 Fetch products
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error("Failed to fetch inventory");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Logout
//   const logout = async () => {
//     try {
//       await api.post("/auth/signout");

//       // 1️⃣ Frontend se data saaf karo
//       localStorage.removeItem("user"); // Storage clear
//       dispatch(logoutUser()); // Redux clear

//       toast.success("Logged out successfully");
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Logout failed", error);

//       // Agar API fail bhi ho jaye, tab bhi frontend se nikal do user ko
//       localStorage.removeItem("user");
//       dispatch(logoutUser());
//       navigate("/login");

//       toast.error("Logout failed");
//     }
//   };

//   // 🔹 Search Logic
//   const handleSearch = async () => {
//     if (!search.trim() && !categoryFilter) {
//       return toast.error("Please enter a keyword or select a category");
//     }
//     await fetchProducts();
//     setShowData(true);
//   };

//   // 🔹 Filter Logic
//   const filteredProducts = products.filter((p) => {
//     const s = search.toLowerCase();
//     const matchSearch =
//       p.name.toLowerCase().includes(s) ||
//       p.color.toLowerCase().includes(s) ||
//       p.category.toLowerCase().includes(s);

//     const matchCategory =
//       !categoryFilter || categoryFilter === "All" || categoryFilter === ""
//         ? true
//         : p.category === categoryFilter;

//     return matchSearch && matchCategory;
//   });

//   // Auto hide results
//   useEffect(() => {
//     if (!search.trim() && !categoryFilter) {
//       setShowData(false);
//     }
//   }, [search, categoryFilter]);

//   return (
//     <div style={styles.container}>

//       {/* --- TOP HEADER --- */}
//       <header style={styles.header}>
//         <div style={styles.logoArea}>
//           <h1 style={styles.appTitle}>📦 InventoryHub</h1>
//         </div>
//         <div style={styles.userArea}>
//           <div style={{textAlign: "right"}}>
//              <span style={styles.userName}>Hello, {user?.name || "User"}</span>
//              <span style={styles.userRole}>({user?.userType || "Guest"})</span>
//           </div>
//           <button onClick={logout} style={styles.logoutBtn}>Logout</button>
//         </div>
//       </header>

//       {/* --- MAIN CONTENT --- */}
//       <main style={styles.mainContent}>

//         {/* 1️⃣ SEARCH SECTION (Sabke liye visible) */}
//         <section style={styles.searchCard}>
//           <h2 style={styles.sectionTitle}>Search Inventory</h2>

//           <div style={styles.searchBarWrapper}>
//             <input
//               type="text"
//               placeholder="Search by Name, Color, Category..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               style={styles.searchInput}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//             />

//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               style={styles.searchSelect}
//             >
//               <option value="">Select</option>
//               <option value="All">All Categories</option>
//               <option value="Die-cast">Die-cast</option>
//               <option value="Remote Control">Remote Control</option>
//               <option value="Soft Toy">Soft Toy</option>
//               <option value="Board Game">Board Game</option>
//               <option value="Scooter">Scooter</option>
//             </select>

//             <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>
//               {loading ? "Searching..." : "Search"}
//             </button>
//           </div>
//         </section>

//         {/* 2️⃣ QUICK ACTIONS GRID (Conditional Rendering) */}
//         {!showData && (
//           <section style={styles.actionsGrid}>

//             {/* 🔒 ADD PRODUCT: Only Admin & Superuser */}
//             {canEdit && (
//               <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
//                 <span style={styles.actionIcon}>➕</span>
//                 <h3>Add Product</h3>
//                 <p>Add new items to inventory</p>
//               </div>
//             )}

//             {/* 🔓 ANALYTICS: Visible to Everyone */}
//             <div style={styles.actionCard} onClick={() => navigate("/graphs")}>
//               <span style={styles.actionIcon}>📊</span>
//               <h3>Analytics</h3>
//               <p>View sales & stock graphs</p>
//             </div>

//             {/* 🔒 MANAGE USERS: Only Admin */}
//             {isAdmin && (
//               <div style={styles.actionCard} onClick={() => navigate("/create-user")}>
//                 <span style={styles.actionIcon}>👤</span>
//                 <h3>Manage Users</h3>
//                 <p>Create admin or staff accounts</p>
//               </div>
//             )}

//           </section>
//         )}

//         {/* 3️⃣ SEARCH RESULTS */}
//         {showData && (
//           <section style={styles.resultsSection}>
//             <div style={styles.resultsHeader}>
//               <h3>Search Results ({filteredProducts.length})</h3>
//               <button onClick={() => setShowData(false)} style={styles.closeBtn}>
//                 ✕ Close Results
//               </button>
//             </div>

//             <div style={styles.listWrapper}>
//                <ProductList
//                 products={filteredProducts}
//                 onEdit={() => toast("View details to edit")}
//                 // 🔒 DELETE: Only Admin & Superuser can delete
//                 onDelete={async (id) => {
//                   if(!canEdit) {
//                     return toast.error("Access Denied: You cannot delete items.");
//                   }
//                   if(window.confirm("Delete this item?")) {
//                     await api.delete(`/products/${id}`);
//                     fetchProducts();
//                     toast.success("Item deleted");
//                   }
//                 }}
//               />
//             </div>
//           </section>
//         )}

//       </main>
//     </div>
//   );
// }

// // --- PROFESSIONAL STYLES ---
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6", // Light Grey
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//   },

//   // Header
//   header: {
//     backgroundColor: "#1e293b", // Dark Blue
//     padding: "15px 40px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//   },
//   appTitle: { color: "#fff", fontSize: "22px", margin: 0, fontWeight: "700" },
//   userArea: { display: "flex", alignItems: "center", gap: "20px" },
//   userName: { color: "#cbd5e1", fontSize: "14px", display: "block", fontWeight: "600" },
//   userRole: { color: "#94a3b8", fontSize: "12px", display: "block", textTransform: "uppercase" },
//   logoutBtn: {
//     backgroundColor: "#ef4444", // Red
//     color: "#fff",
//     border: "none",
//     padding: "8px 16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "13px",
//     fontWeight: "600",
//   },

//   // Main Layout
//   mainContent: {
//     padding: "40px",
//     maxWidth: "1100px",
//     margin: "0 auto",
//     width: "100%",
//     boxSizing: "border-box",
//   },

//   // Search Section
//   searchCard: {
//     backgroundColor: "#fff",
//     padding: "30px",
//     borderRadius: "16px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//     marginBottom: "40px",
//     textAlign: "center",
//   },
//   sectionTitle: { margin: "0 0 20px 0", color: "#334155", fontSize: "24px" },
//   searchBarWrapper: {
//     display: "flex",
//     gap: "10px",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   searchInput: {
//     flex: "1",
//     minWidth: "250px",
//     padding: "14px 20px",
//     borderRadius: "50px",
//     border: "1px solid #cbd5e1",
//     fontSize: "16px",
//     outline: "none",
//     backgroundColor: "#f8fafc",
//   },
//   searchSelect: {
//     padding: "14px 20px",
//     borderRadius: "50px",
//     border: "1px solid #cbd5e1",
//     fontSize: "15px",
//     outline: "none",
//     cursor: "pointer",
//     backgroundColor: "#fff",
//   },
//   searchBtn: {
//     padding: "14px 30px",
//     borderRadius: "50px",
//     border: "none",
//     backgroundColor: "#2563eb", // Brand Blue
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "background 0.2s",
//   },

//   // Action Grid (Dashboard Style)
//   actionsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//     gap: "20px",
//     marginBottom: "40px",
//   },
//   actionCard: {
//     backgroundColor: "#fff",
//     padding: "25px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//     cursor: "pointer",
//     textAlign: "center",
//     transition: "transform 0.2s, box-shadow 0.2s",
//     border: "1px solid #e2e8f0",
//   },
//   actionIcon: { fontSize: "32px", marginBottom: "10px", display: "block" },

//   // SKU Update specific style
//   skuCard: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
//     border: "1px solid #e2e8f0",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // Results Section
//   resultsSection: {
//     backgroundColor: "#fff",
//     borderRadius: "12px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden",
//   },
//   resultsHeader: {
//     padding: "20px",
//     borderBottom: "1px solid #e2e8f0",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#f8fafc",
//   },
//   closeBtn: {
//     background: "transparent",
//     border: "1px solid #ef4444",
//     color: "#ef4444",
//     padding: "5px 12px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "13px",
//     fontWeight: "bold",
//   },
//   listWrapper: {
//     padding: "20px",
//   }
// };

















// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../api/axios";
// import ProductList from "../components/ProductList";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { logoutUser } from "../redux/userSlice";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [showData, setShowData] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.user.userData);
//   const navigate = useNavigate();

//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error("Failed to fetch inventory");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       await api.post("/auth/signout");
//       localStorage.removeItem("user");
//       dispatch(logoutUser());
//       toast.success("Logged out successfully");
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Logout failed", error);
//       localStorage.removeItem("user");
//       dispatch(logoutUser());
//       navigate("/login");
//       toast.error("Logout failed");
//     }
//   };

//   const handleSearch = async () => {
//     if (!search.trim() && !categoryFilter) {
//       return toast.error("Please enter a keyword or select a category");
//     }
//     await fetchProducts();
//     setShowData(true);
//   };

//   const filteredProducts = products.filter((p) => {
//     const s = search.toLowerCase();
//     const matchSearch =
//       p.name.toLowerCase().includes(s) ||
//       p.color.toLowerCase().includes(s) ||
//       p.category.toLowerCase().includes(s);

//     const matchCategory =
//       !categoryFilter || categoryFilter === "All" || categoryFilter === ""
//         ? true
//         : p.category === categoryFilter;

//     return matchSearch && matchCategory;
//   });

//   useEffect(() => {
//     if (!search.trim() && !categoryFilter) {
//       setShowData(false);
//     }
//   }, [search, categoryFilter]);

//   return (
//     <div style={styles.container}>

//       {/* --- TOP HEADER (Compact) --- */}
//       <header style={styles.header}>
//         <div style={styles.logoArea}>
//           <h3 style={styles.appTitle}>📦 InventoryHub</h3>
//         </div>
//         <div style={styles.userArea}>
//           <div style={{ textAlign: "right", lineHeight: "1.2" }}>
//             <span style={styles.userName}>Hello, {user?.name || "User"}</span>
//             <span style={styles.userRole}>{user?.userType || "Guest"}</span>
//           </div>
//           <button onClick={logout} style={styles.logoutBtn}>Logout</button>
//         </div>
//       </header>

//       {/* --- MAIN CONTENT --- */}
//       <main style={styles.mainContent}>

//         {/* 1️⃣ SEARCH SECTION (Compact) */}
//         <section style={styles.searchCard}>
//           {/* Title hata diya ya chota kar diya space bachane ke liye */}

//           <div style={styles.searchBarWrapper}>
//             <input
//               type="text"
//               placeholder="Search Name, Color, Category..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               style={styles.searchInput}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//             />

//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               style={styles.searchSelect}
//             >
//               <option value="">Category</option>
//               <option value="All">All</option>
//               <option value="Die-cast">Die-cast</option>
//               <option value="Remote Control">Remote Control</option>
//               <option value="Soft Toy">Soft Toy</option>
//               <option value="Board Game">Board Game</option>
//               <option value="Scooter">Scooter</option>
//             </select>

//             <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>
//               {loading ? "..." : "Search"}
//             </button>
//           </div>
//         </section>

//         {/* 2️⃣ QUICK ACTIONS GRID (Smaller Cards) */}
//         {!showData && (
//           <section style={styles.actionsGrid}>

//             {canEdit && (
//               <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
//                 <span style={styles.actionIcon}>➕</span>
//                 <div style={styles.actionText}>
//                   <h3>Add Product</h3>
//                   <p>New Entry</p>
//                 </div>
//               </div>
//             )}

//             <div style={styles.actionCard} onClick={() => navigate("/graphs")}>
//               <span style={styles.actionIcon}>📊</span>
//               <div style={styles.actionText}>
//                 <h3>Analytics</h3>
//                 <p>View Graphs</p>
//               </div>
//             </div>

//             {/* {isAdmin && (
//               <div style={styles.actionCard} onClick={() => navigate("/create-user")}>
//                 <span style={styles.actionIcon}>👤</span>
//                 <div style={styles.actionText}>
//                    <h3>Manage Users</h3>
//                    <p>Admin/Staff</p>
//                 </div>
//               </div>
//             )} */}



//             {/* // ... Home.jsx code */}
//             {isAdmin && (
//               <div style={styles.actionCard} onClick={() => navigate("/users")}> {/* 👈 Change to /users */}
//                 <span style={styles.actionIcon}>👤</span>
//                 <div style={styles.actionText}>
//                   <h3>Manage Users</h3>
//                   <p>Admin/Staff</p>
//                 </div>
//               </div>
//             )}





//           </section>
//         )}

//         {/* 3️⃣ SEARCH RESULTS (Full Width, No Extra Padding) */}
//         {showData && (
//           <section style={styles.resultsSection}>
//             <div style={styles.resultsHeader}>
//               <h4 style={{ margin: 0 }}>Results ({filteredProducts.length})</h4>
//               <button onClick={() => setShowData(false)} style={styles.closeBtn}>
//                 ✕ Close
//               </button>
//             </div>

//             <div style={styles.listWrapper}>
//               <ProductList
//                 products={filteredProducts}
//                 onEdit={() => toast("View details to edit")}
//                 onDelete={async (id) => {
//                   if (!canEdit) return toast.error("Access Denied");
//                   if (window.confirm("Delete item?")) {
//                     await api.delete(`/products/${id}`);
//                     fetchProducts();
//                     toast.success("Deleted");
//                   }
//                 }}
//               />
//             </div>
//           </section>
//         )}

//       </main>
//     </div>
//   );
// }

// // --- COMPACT STYLES ---
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//   },

//   // Header: Height kam ki, padding kam ki
//   header: {
//     backgroundColor: "#1e293b",
//     padding: "10px 20px", // Reduced
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//     height: "50px" // Fixed height for slim look
//   },
//   appTitle: { color: "#fff", fontSize: "18px", margin: 0, fontWeight: "600" },
//   userArea: { display: "flex", alignItems: "center", gap: "15px" },
//   userName: { color: "#cbd5e1", fontSize: "13px", display: "block", fontWeight: "600" },
//   userRole: { color: "#94a3b8", fontSize: "11px", display: "block", textTransform: "uppercase" },
//   logoutBtn: {
//     backgroundColor: "#ef4444",
//     color: "#fff",
//     border: "none",
//     padding: "5px 12px", // Smaller btn
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "12px",
//     fontWeight: "600",
//   },

//   // Main Layout: Top padding kam ki
//   mainContent: {
//     padding: "20px", // 40 se 20 kiya
//     maxWidth: "1000px",
//     margin: "0 auto",
//     width: "100%",
//     boxSizing: "border-box",
//   },

//   // Search Section: Sleek bar
//   searchCard: {
//     backgroundColor: "#fff",
//     padding: "15px", // 30 se 15 kiya
//     borderRadius: "10px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
//     marginBottom: "20px", // 40 se 20 kiya
//   },
//   searchBarWrapper: {
//     display: "flex",
//     gap: "10px",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   searchInput: {
//     flex: "1",
//     minWidth: "200px",
//     padding: "8px 15px", // Slim input
//     borderRadius: "6px", // Roundness kam ki
//     border: "1px solid #cbd5e1",
//     fontSize: "14px",
//     outline: "none",
//     backgroundColor: "#f8fafc",
//   },
//   searchSelect: {
//     padding: "8px 10px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     fontSize: "13px",
//     outline: "none",
//     cursor: "pointer",
//     backgroundColor: "#fff",
//   },
//   searchBtn: {
//     padding: "8px 20px",
//     borderRadius: "6px",
//     border: "none",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontSize: "14px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },

//   // Action Grid: Chote Cards
//   actionsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "15px", // Gap kam kiya
//     marginBottom: "20px",
//   },
//   actionCard: {
//     backgroundColor: "#fff",
//     padding: "15px", // Padding reduced
//     borderRadius: "8px",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//     cursor: "pointer",
//     display: "flex", // Horizontal layout for compact look
//     alignItems: "center",
//     gap: "15px",
//     border: "1px solid #e2e8f0",
//     transition: "transform 0.1s",
//   },
//   actionIcon: { fontSize: "24px" }, // Icon chota kiya
//   actionText: { textAlign: "left" },
//   // h3 aur p ko CSS styles ke through control kiya ja raha hai (default size chota hai)

//   // Results Section
//   resultsSection: {
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
//     overflow: "hidden",
//   },
//   resultsHeader: {
//     padding: "10px 15px", // Reduced
//     borderBottom: "1px solid #eee",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#f8fafc",
//     fontSize: "14px"
//   },
//   closeBtn: {
//     background: "transparent",
//     border: "1px solid #ef4444",
//     color: "#ef4444",
//     padding: "4px 10px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "11px",
//     fontWeight: "bold",
//   },
//   listWrapper: {
//     padding: "0", // Padding 0 kar di kyunki ProductList me already padding hai
//   }
// };

























// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux"; // useDispatch hata diya kyunki logout ab Header me hai
// import api from "../api/axios";
// import ProductList from "../components/ProductList";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/Header"; // ✅ Import Header

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [showData, setShowData] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const user = useSelector((state) => state.user.userData);
//   const navigate = useNavigate();

//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       toast.error("Failed to fetch inventory");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!search.trim() && !categoryFilter) {
//       return toast.error("Please enter a keyword or select a category");
//     }
//     await fetchProducts();
//     setShowData(true);
//   };

//   const filteredProducts = products.filter((p) => {
//     const s = search.toLowerCase();
//     const matchSearch =
//       p.name.toLowerCase().includes(s) ||
//       p.color.toLowerCase().includes(s) ||
//       p.category.toLowerCase().includes(s);

//     const matchCategory =
//       !categoryFilter || categoryFilter === "All" || categoryFilter === ""
//         ? true
//         : p.category === categoryFilter;

//     return matchSearch && matchCategory;
//   });

//   useEffect(() => {
//     if (!search.trim() && !categoryFilter) {
//       setShowData(false);
//     }
//   }, [search, categoryFilter]);

//   return (
//     <div style={styles.container}>
      
//       {/* ✅ NEW HEADER COMPONENT ADDED HERE */}
//       <Header />

//       {/* --- MAIN CONTENT --- */}
//       <main style={styles.mainContent}>

//         {/* 1️⃣ SEARCH SECTION */}
//         <section style={styles.searchCard}>
//           <div style={styles.searchBarWrapper}>
//             <input
//               type="text"
//               placeholder="Search Name, Color, Category..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               style={styles.searchInput}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//             />

//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               style={styles.searchSelect}
//             >
//               <option value="">Category</option>
//               <option value="All">All</option>
//               <option value="Die-cast">Die-cast</option>
//               <option value="Remote Control">Remote Control</option>
//               <option value="Soft Toy">Soft Toy</option>
//               <option value="Board Game">Board Game</option>
//               <option value="Scooter">Scooter</option>
//             </select>

//             <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>
//               {loading ? "..." : "Search"}
//             </button>
//           </div>
//         </section>

//         {/* 2️⃣ QUICK ACTIONS GRID */}
//         {!showData && (
//           <section style={styles.actionsGrid}>

//             {canEdit && (
//               <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
//                 <span style={styles.actionIcon}>➕</span>
//                 <div style={styles.actionText}>
//                   <h3>Add Product</h3>
//                   <p>New Entry</p>
//                 </div>
//               </div>
//             )}

//             <div style={styles.actionCard} onClick={() => navigate("/graphs")}>
//               <span style={styles.actionIcon}>📊</span>
//               <div style={styles.actionText}>
//                 <h3>Analytics</h3>
//                 <p>View Graphs</p>
//               </div>
//             </div>

//             {isAdmin && (
//               <div style={styles.actionCard} onClick={() => navigate("/users")}>
//                 <span style={styles.actionIcon}>👤</span>
//                 <div style={styles.actionText}>
//                   <h3>Manage Users</h3>
//                   <p>Admin/Staff</p>
//                 </div>
//               </div>
//             )}

//           </section>
//         )}

//         {/* 3️⃣ SEARCH RESULTS */}
//         {showData && (
//           <section style={styles.resultsSection}>
//             <div style={styles.resultsHeader}>
//               <h4 style={{ margin: 0 }}>Results ({filteredProducts.length})</h4>
//               <button onClick={() => setShowData(false)} style={styles.closeBtn}>
//                 ✕ Close
//               </button>
//             </div>

//             <div style={styles.listWrapper}>
//               <ProductList
//                 products={filteredProducts}
//                 onEdit={() => toast("View details to edit")}
//                 onDelete={async (id) => {
//                   if (!canEdit) return toast.error("Access Denied");
//                   if (window.confirm("Delete item?")) {
//                     await api.delete(`/products/${id}`);
//                     fetchProducts();
//                     toast.success("Deleted");
//                   }
//                 }}
//               />
//             </div>
//           </section>
//         )}

//       </main>
//     </div>
//   );
// }

// // --- STYLES (Styles ab Header ke liye yahan se hata diye hain) ---
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//   },
//   // Header styles removed (Header.jsx me hain ab)

//   mainContent: {
//     padding: "20px",
//     maxWidth: "1000px",
//     margin: "0 auto",
//     width: "100%",
//     boxSizing: "border-box",
//   },
//   searchCard: {
//     backgroundColor: "#fff",
//     padding: "15px",
//     borderRadius: "10px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
//     marginBottom: "20px",
//   },
//   searchBarWrapper: {
//     display: "flex",
//     gap: "10px",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   searchInput: {
//     flex: "1",
//     minWidth: "200px",
//     padding: "8px 15px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     fontSize: "14px",
//     outline: "none",
//     backgroundColor: "#f8fafc",
//   },
//   searchSelect: {
//     padding: "8px 10px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     fontSize: "13px",
//     outline: "none",
//     cursor: "pointer",
//     backgroundColor: "#fff",
//   },
//   searchBtn: {
//     padding: "8px 20px",
//     borderRadius: "6px",
//     border: "none",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontSize: "14px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
//   actionsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "15px",
//     marginBottom: "20px",
//   },
//   actionCard: {
//     backgroundColor: "#fff",
//     padding: "15px",
//     borderRadius: "8px",
//     boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     border: "1px solid #e2e8f0",
//     transition: "transform 0.1s",
//   },
//   actionIcon: { fontSize: "24px" },
//   actionText: { textAlign: "left" },
//   resultsSection: {
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
//     overflow: "hidden",
//   },
//   resultsHeader: {
//     padding: "10px 15px",
//     borderBottom: "1px solid #eee",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#f8fafc",
//     fontSize: "14px"
//   },
//   closeBtn: {
//     background: "transparent",
//     border: "1px solid #ef4444",
//     color: "#ef4444",
//     padding: "4px 10px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     fontSize: "11px",
//     fontWeight: "bold",
//   },
//   listWrapper: {
//     padding: "0",
//   }
// };


















import React, { useState, useEffect, useRef } from "react"; // 👈 1. useRef Import kiya
import { useSelector } from "react-redux";
import api from "../api/axios";
import ProductList from "../components/ProductList";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";
import * as XLSX from "xlsx"; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);

  // 👇 2. Ref create kiya scroll ke liye
  const resultsRef = useRef(null);

  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const isAdmin = user?.userType === "admin";
  const isSuperUser = user?.userType === "superuser";
  const canEdit = isAdmin || isSuperUser;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim() && !categoryFilter) {
      return toast.error("Please enter a keyword or select a category");
    }
    await fetchProducts();
    setShowData(true);
  };

  // 👇 3. Ye Effect tab chalega jab showData TRUE hoga (Search complete hone par)
  useEffect(() => {
    if (showData && resultsRef.current) {
      // Thoda smooth scroll effect
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showData]); // Dependency: showData

  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(s) ||
      p.color.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s);

    const matchCategory =
      !categoryFilter || categoryFilter === "All" || categoryFilter === ""
        ? true
        : p.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  useEffect(() => {
    if (!search.trim() && !categoryFilter) {
      setShowData(false);
    }
  }, [search, categoryFilter]);

  const downloadExcel = () => {
    if (filteredProducts.length === 0) {
      return toast.error("No data to export");
    }

    const dataToExport = filteredProducts.map((p) => ({
      Name: p.name,
      SKU: p.sku,
      Category: p.category,
      Color: p.color,
      Size: p.size,
      Price: p.price,
      "Cost Price": canEdit ? p.costing_price : "N/A",
      Stock: p.Qty,
      Supplier: canEdit ? p.Supplier_name : "N/A",
      Status: p.Qty > 0 ? "In Stock" : "Out of Stock",
      "Product Image URL": p.img || "No Image",
      "Barcode Image URL": p.barcodeImg || "No Barcode"
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Data");

    XLSX.writeFile(workbook, "Inventory_With_Links.xlsx");
    toast.success("Excel downloaded with Image Links!");
  };

  return (
    <div style={styles.container}>
      
      <Header />

      <main style={styles.mainContent}>

        {/* 1️⃣ SEARCH SECTION */}
        <section style={styles.searchCard}>
          <h2 style={styles.sectionTitle}>Search Inventory</h2>
          <div style={styles.searchBarWrapper}>
            <input
              type="text"
              placeholder="Search Name, Color, or Category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={styles.searchSelect}
            >
              <option value="">Select Category</option>
              <option value="All">All Categories</option>
              <option value="Die-cast">Die-cast</option>
              <option value="Remote Control">Remote Control</option>
              <option value="Soft Toy">Soft Toy</option>
              <option value="Board Game">Board Game</option>
              <option value="Scooter">Scooter</option>
            </select>

            <button onClick={handleSearch} disabled={loading} style={styles.searchBtn}>
              {loading ? "Searching..." : "🔍 Search"}
            </button>
          </div>
        </section>

        {/* 2️⃣ QUICK ACTIONS GRID */}
        {!showData && (
          <section style={styles.actionsSection}>
            <h3 style={styles.gridLabel}>Quick Actions</h3>
            <div style={styles.actionsGrid}>
              
              {canEdit && (
                <div style={styles.actionCard} onClick={() => navigate("/add-product")}>
                  <div style={{...styles.iconCircle, background: "#dbeafe", color: "#2563eb"}}>➕</div>
                  <div style={styles.actionText}>
                    <h3>Add Product</h3>
                    <p>Create new inventory entry</p>
                  </div>
                </div>
              )}

              <div style={styles.actionCard} onClick={() => navigate("/graphs")}>
                <div style={{...styles.iconCircle, background: "#f3e8ff", color: "#9333ea"}}>📊</div>
                <div style={styles.actionText}>
                  <h3>Analytics</h3>
                  <p>View visual data reports</p>
                </div>
              </div>

              {isAdmin && (
                <div style={styles.actionCard} onClick={() => navigate("/users")}>
                  <div style={{...styles.iconCircle, background: "#ffedd5", color: "#ea580c"}}>👤</div>
                  <div style={styles.actionText}>
                    <h3>Manage Users</h3>
                    <p>Admin controls & Staff</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 3️⃣ SEARCH RESULTS */}
        {showData && (
          // 👇 4. Ref yahan attach kiya (Jahan scroll karke aana hai)
          <section style={styles.resultsSection} ref={resultsRef}>
            <div style={styles.resultsHeader}>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <h4 style={styles.resultsTitle}>Search Results <span style={styles.countBadge}>({filteredProducts.length})</span></h4>
                
                {filteredProducts.length > 0 && (
                   <button onClick={downloadExcel} style={styles.excelBtn} title="Download Excel">
                     📥 Export Excel
                   </button>
                )}
              </div>

              <button onClick={() => setShowData(false)} style={styles.closeBtn}>
                ✕ Close Results
              </button>
            </div>

            <div style={styles.listWrapper}>
              <ProductList
                products={filteredProducts}
                onEdit={() => toast("View details to edit")}
                onDelete={async (id) => {
                  if (!canEdit) return toast.error("Access Denied");
                  if (window.confirm("Delete item?")) {
                    await api.delete(`/products/${id}`);
                    fetchProducts();
                    toast.success("Deleted");
                  }
                }}
              />
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

// ✨ STYLES (SAME AS BEFORE)
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    padding: "30px 20px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  searchCard: {
    backgroundColor: "#ffffff",
    padding: "25px 30px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    margin: "0 0 15px 0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#334155",
  },
  searchBarWrapper: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  searchInput: {
    flex: "2",
    minWidth: "250px",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    backgroundColor: "#f8fafc",
    transition: "border 0.2s",
  },
  searchSelect: {
    flex: "1",
    minWidth: "180px",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  searchBtn: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
    transition: "background 0.2s",
  },
  actionsSection: {
    marginTop: "10px",
  },
  gridLabel: {
    fontSize: "14px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "700",
    marginBottom: "15px",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  actionCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    border: "1px solid #e2e8f0",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  iconCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    flexShrink: 0,
  },
  actionText: { textAlign: "left" },
  resultsSection: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    marginTop: "20px",
  },
  resultsHeader: {
    padding: "15px 25px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  resultsTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#1e293b",
    fontWeight: "700",
  },
  countBadge: {
    color: "#64748b",
    fontWeight: "500",
    fontSize: "16px",
  },
  excelBtn: {
    backgroundColor: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background 0.2s",
  },
  closeBtn: {
    background: "transparent",
    border: "1px solid #ef4444",
    color: "#ef4444",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  listWrapper: { padding: "0" }
};