// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProductDetails = () => {
//   const { id } = useParams(); // URL se ID li
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:7000/api/products/${id}`);
//         setProduct(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product", error);
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading Product...</div>;
//   if (!product) return <div style={{ textAlign: "center", marginTop: "50px" }}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
//       <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back to List</button>

//       <div style={styles.wrapper}>
//         {/* LEFT COLUMN: Images */}
//         <div style={styles.imageSection}>
//           <img src={product.img} alt={product.name} style={styles.mainImage} />
          
//           {/* Barcode Section */}
//           {product.barcodeImg && (
//             <div style={styles.barcodeBox}>
//               <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Product Barcode</p>
//               <img src={product.barcodeImg} alt="Barcode" style={{ width: "100%", maxWidth: "200px" }} />
//               <a href={product.barcodeImg} target="_blank" rel="noreferrer" style={styles.link}>Download / Print</a>
//             </div>
//           )}
//         </div>

//         {/* RIGHT COLUMN: Details */}
//         <div style={styles.infoSection}>
//           <h1 style={styles.title}>{product.name}</h1>
//           <p style={styles.sku}>SKU: {product.sku}</p>

//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{product.price}</span>
//             <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//           </div>

//           <hr style={styles.divider} />

//           <div style={styles.detailRow}>
//             <strong>Category:</strong> <span>{product.category}</span>
//           </div>
//           <div style={styles.detailRow}>
//             <strong>Color:</strong> <span>{product.color}</span>
//           </div>
//           <div style={styles.detailRow}>
//             <strong>Size:</strong> <span>{product.size}</span>
//           </div>
//           <div style={styles.detailRow}>
//             <strong>Stock Status:</strong> 
//             <span style={{ color: product.Qty > 0 ? "green" : "red", fontWeight: "bold" }}>
//               {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//             </span>
//           </div>
          
//           <hr style={styles.divider} />

//           {/* ADMIN ONLY INFO (Hidden from normal view usually) */}
//           <div style={styles.adminBox}>
//              <h4>🔒 Admin Details</h4>
//              <p><strong>Costing Price:</strong> ₹{product.costing_price}</p>
//              <p><strong>Supplier:</strong> {product.Supplier_name}</p>
//              <p><strong>Description:</strong> {product.description || "No description available."}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: { padding: "20px 40px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" },
//   backBtn: { background: "none", border: "none", color: "#1976D2", cursor: "pointer", fontSize: "16px", marginBottom: "20px" },
//   wrapper: { display: "flex", gap: "40px", flexDirection: "row", flexWrap: "wrap" },
  
//   // Left Side
//   imageSection: { flex: "1", minWidth: "300px", textAlign: "center" },
//   mainImage: { width: "100%", maxWidth: "400px", borderRadius: "10px", border: "1px solid #eee", marginBottom: "20px" },
//   barcodeBox: { background: "#f9f9f9", padding: "15px", borderRadius: "8px", border: "1px dashed #ccc", display: "inline-block" },
//   link: { display: "block", marginTop: "5px", fontSize: "12px", color: "blue" },

//   // Right Side
//   infoSection: { flex: "1.5", minWidth: "300px" },
//   title: { fontSize: "28px", margin: "0 0 5px 0", color: "#333" },
//   sku: { color: "#888", fontSize: "14px", marginBottom: "15px" },
//   priceBox: { display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "20px" },
//   price: { fontSize: "32px", fontWeight: "bold", color: "#B12704" },
//   gst: { fontSize: "14px", color: "#555" },
//   divider: { border: "0", borderTop: "1px solid #eee", margin: "20px 0" },
//   detailRow: { display: "flex", justifyContent: "space-between", maxWidth: "300px", marginBottom: "10px", fontSize: "16px" },
  
//   adminBox: { background: "#f0f4f8", padding: "15px", borderRadius: "8px", marginTop: "20px" },
// };

// export default ProductDetails;



















//  with out QTY UPDATE


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// import api from "../api/axios";
// import toast from "react-hot-toast"; // Notification ke liye

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`http://localhost:7000/api/products/${id}`);
//         setProduct(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product", error);
//         toast.error("Error fetching product details");
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // Delete Function
//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
//       try {
//         await api.delete(`http://localhost:7000/api/products/${id}`);
//         toast.success("Product Deleted Successfully");
//         navigate("/dashboard");
//       } catch (error) {
//         console.error("Error deleting product", error);
//         toast.error("Failed to delete product");
//       }
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading Product...</div>;
//   if (!product) return <div style={styles.loading}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate("/dashboard")} 
//         style={styles.backBtn}
//         onMouseEnter={(e) => e.currentTarget.style.color = "#1565C0"}
//         onMouseLeave={(e) => e.currentTarget.style.color = "#1976D2"}
//       >
//         ⬅ Back to Dashboard
//       </button>

//       <div style={styles.wrapper}>
//         {/* --- LEFT COLUMN: Images & Barcode --- */}
//         <div style={styles.imageSection}>
//           <div style={styles.imgContainer}>
//             <img src={product.img} alt={product.name} style={styles.mainImage} />
//           </div>
          
//           {product.barcodeImg && (
//             <div style={styles.barcodeBox}>
//               <p style={styles.barcodeTitle}>Product Barcode</p>
//               <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//               <a href={product.barcodeImg} download target="_blank" rel="noreferrer" style={styles.downloadLink}>
//                 Download / Print
//               </a>
//             </div>
//           )}
//         </div>

//         {/* --- RIGHT COLUMN: All Details (No Admin Hide) --- */}
//         <div style={styles.infoSection}>
          
//           {/* Header Info */}
//           <h1 style={styles.title}>{product.name}</h1>
//           <p style={styles.sku}>SKU: <span style={{color: "#333", fontWeight: "bold"}}>{product.sku}</span></p>

//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{product.price}</span>
//             <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//           </div>

//           <hr style={styles.divider} />

//           {/* Detailed Grid - Sab kuch yahan hai */}
//           <div style={styles.detailsGrid}>
//             <DetailItem label="Category" value={product.category} />
//             <DetailItem label="Color" value={product.color} />
//             <DetailItem label="Size/Scale" value={product.size} />
            
//             {/* Stock Logic */}
//             <div style={styles.detailItem}>
//               <span style={styles.label}>Stock Status:</span>
//               <span style={{ 
//                 fontWeight: "bold", 
//                 color: product.Qty > 0 ? "#2e7d32" : "#d32f2f",
//                 backgroundColor: product.Qty > 0 ? "#e8f5e9" : "#ffebee",
//                 padding: "2px 8px",
//                 borderRadius: "4px"
//               }}>
//                 {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//               </span>
//             </div>

//             {/* Previously Admin Only - Ab Sabko Dikhega */}
//             <DetailItem label="Cost Price (CP)" value={`₹${product.costing_price}`} />
//             <DetailItem label="Supplier Name" value={product.Supplier_name} />
//           </div>
          
//           <hr style={styles.divider} />

//           {/* Description Section */}
//           <div style={styles.descSection}>
//             <h3 style={styles.sectionHeading}>Product Description</h3>
//             <p style={styles.description}>
//               {product.description || "No description provided for this product."}
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div style={styles.actionButtons}>
//             {/* Delete Button */}
//             <button onClick={handleDelete} style={styles.deleteBtn}>
//               🗑 Delete Product
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Component for neat rows
// const DetailItem = ({ label, value }) => (
//   <div style={styles.detailItem}>
//     <span style={styles.label}>{label}:</span>
//     <span style={styles.value}>{value || "-"}</span>
//   </div>
// );

// const styles = {
//   container: { padding: "40px", maxWidth: "1100px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#fff" },
//   loading: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#666" },
  
//   backBtn: {
//     background: "none", border: "none", color: "#1976D2", cursor: "pointer", 
//     fontSize: "15px", fontWeight: "600", marginBottom: "25px", transition: "0.2s"
//   },

//   wrapper: { display: "flex", gap: "50px", flexDirection: "row", flexWrap: "wrap" },

//   // Left Side
//   imageSection: { flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" },
//   imgContainer: { border: "1px solid #e0e0e0", borderRadius: "12px", overflow: "hidden", padding: "10px", textAlign: "center" },
//   mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "400px" },
  
//   barcodeBox: { background: "#f8f9fa", padding: "20px", borderRadius: "12px", border: "1px dashed #bdbdbd", textAlign: "center" },
//   barcodeTitle: { margin: "0 0 10px 0", fontSize: "13px", color: "#757575", fontWeight: "bold", textTransform: "uppercase" },
//   barcodeImg: { width: "100%", maxWidth: "220px", height: "auto" },
//   downloadLink: { display: "inline-block", marginTop: "10px", fontSize: "13px", color: "#1976D2", textDecoration: "none", fontWeight: "600" },

//   // Right Side
//   infoSection: { flex: "1.5", minWidth: "300px" },
//   title: { fontSize: "32px", margin: "0 0 5px 0", color: "#212121", fontWeight: "700" },
//   sku: { color: "#757575", fontSize: "15px", marginBottom: "20px" },
  
//   priceBox: { display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "25px" },
//   price: { fontSize: "36px", fontWeight: "700", color: "#d32f2f" },
//   gst: { fontSize: "15px", color: "#616161", fontWeight: "500" },
  
//   divider: { border: "0", borderTop: "1px solid #eeeeee", margin: "25px 0" },

//   // Grid Layout for Details
//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" },
//   detailItem: { display: "flex", flexDirection: "column", gap: "4px" },
//   label: { fontSize: "13px", color: "#757575", fontWeight: "600", textTransform: "uppercase" },
//   value: { fontSize: "16px", color: "#212121", fontWeight: "500" },

//   // Description
//   descSection: { marginTop: "10px" },
//   sectionHeading: { fontSize: "18px", fontWeight: "600", color: "#424242", marginBottom: "10px" },
//   description: { fontSize: "15px", lineHeight: "1.6", color: "#424242", whiteSpace: "pre-line" },

//   // Actions
//   actionButtons: { marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #eee" },
//   deleteBtn: {
//     padding: "12px 24px",
//     backgroundColor: "#ffebee",
//     color: "#c62828",
//     border: "1px solid #ffcdd2",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//     width: "100%",
//     transition: "0.2s"
//   }
// };

// export default ProductDetails;



















//  with qty update

// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux"; // 1️⃣ Redux Import
// import api from "../api/axios";
// import SkuUpdate from "../components/SkuUpdate"; // 2️⃣ Component Import
// import toast from "react-hot-toast";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 3️⃣ User Permissions Check
//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   // 4️⃣ Fetch Logic ko function banaya taaki reuse kar sakein
//   const fetchProduct = useCallback(async () => {
//     try {
//       // ✅ Sahi API call (localhost:7000 hata diya)
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product", error);
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // Delete Function
//   const handleDelete = async () => {
//     if(!canEdit) return toast.error("Permission Denied");
    
//     if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
//       try {
//         await api.delete(`/products/${id}`);
//         toast.success("Product Deleted Successfully");
//         navigate("/dashboard");
//       } catch (error) {
//         console.error("Error deleting product", error);
//         toast.error(error.response?.data?.message || "Failed to delete product");
//       }
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading Product...</div>;
//   if (!product) return <div style={styles.loading}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
//       {/* Back Button */}
//       <button 
//         onClick={() => navigate("/dashboard")} 
//         style={styles.backBtn}
//         onMouseEnter={(e) => e.currentTarget.style.color = "#1565C0"}
//         onMouseLeave={(e) => e.currentTarget.style.color = "#1976D2"}
//       >
//         ⬅ Back to Dashboard
//       </button>

//       <div style={styles.wrapper}>
//         {/* --- LEFT COLUMN: Images & Barcode --- */}
//         <div style={styles.imageSection}>
//           <div style={styles.imgContainer}>
//             <img src={product.img} alt={product.name} style={styles.mainImage} />
//           </div>
          
//           {product.barcodeImg && (
//             <div style={styles.barcodeBox}>
//               <p style={styles.barcodeTitle}>Product Barcode</p>
//               <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//               <a href={product.barcodeImg} download target="_blank" rel="noreferrer" style={styles.downloadLink}>
//                 Download / Print
//               </a>
//             </div>
//           )}
//         </div>

//         {/* --- RIGHT COLUMN: All Details --- */}
//         <div style={styles.infoSection}>
          
//           <h1 style={styles.title}>{product.name}</h1>
//           <p style={styles.sku}>SKU: <span style={{color: "#333", fontWeight: "bold"}}>{product.sku}</span></p>

//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{product.price}</span>
//             <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//           </div>

//           <hr style={styles.divider} />

//           <div style={styles.detailsGrid}>
//             <DetailItem label="Category" value={product.category} />
//             <DetailItem label="Color" value={product.color} />
//             <DetailItem label="Size/Scale" value={product.size} />
            
//             <div style={styles.detailItem}>
//               <span style={styles.label}>Stock Status:</span>
//               <span style={{ 
//                 fontWeight: "bold", 
//                 color: product.Qty > 0 ? "#2e7d32" : "#d32f2f",
//                 backgroundColor: product.Qty > 0 ? "#e8f5e9" : "#ffebee",
//                 padding: "2px 8px",
//                 borderRadius: "4px"
//               }}>
//                 {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//               </span>
//             </div>

//             <DetailItem label="Cost Price (CP)" value={canEdit ? `₹${product.costing_price}` : "Hidden"} />
//             <DetailItem label="Supplier Name" value={canEdit ? product.Supplier_name : "Hidden"} />
//           </div>
          
//           <hr style={styles.divider} />

        

//           {/* 5️⃣ SKU UPDATE SECTION */}
//           {canEdit && (
//              <div style={styles.skuSection}>
//                 <h3 style={styles.sectionHeading}>Quick Stock Update</h3>
//                 <div style={{border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px', background: '#fafafa'}}>
                   
//                    {/* 👇 YAHAN CHANGE KIYA HAI 👇 */}
//                    <SkuUpdate 
//                       onUpdated={fetchProduct} 
//                       prefillProduct={product} // <-- Ye line add karni hai
//                    />

//                 </div>
//              </div>
//           )}


//           <div style={styles.descSection}>
//             <h3 style={styles.sectionHeading}>Product Description</h3>
//             <p style={styles.description}>
//               {product.description || "No description provided for this product."}
//             </p>
//           </div>

//           <div style={styles.actionButtons}>
//             {canEdit && (
//               <button onClick={handleDelete} style={styles.deleteBtn}>
//                 🗑 Delete Product
//               </button>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div style={styles.detailItem}>
//     <span style={styles.label}>{label}:</span>
//     <span style={styles.value}>{value || "-"}</span>
//   </div>
// );

// const styles = {
//   container: { padding: "40px", maxWidth: "1100px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#fff" },
//   loading: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#666" },
//   backBtn: { background: "none", border: "none", color: "#1976D2", cursor: "pointer", fontSize: "15px", fontWeight: "600", marginBottom: "25px", transition: "0.2s" },
//   wrapper: { display: "flex", gap: "50px", flexDirection: "row", flexWrap: "wrap" },
//   imageSection: { flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" },
//   imgContainer: { border: "1px solid #e0e0e0", borderRadius: "12px", overflow: "hidden", padding: "10px", textAlign: "center" },
//   mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "400px" },
//   barcodeBox: { background: "#f8f9fa", padding: "20px", borderRadius: "12px", border: "1px dashed #bdbdbd", textAlign: "center" },
//   barcodeTitle: { margin: "0 0 10px 0", fontSize: "13px", color: "#757575", fontWeight: "bold", textTransform: "uppercase" },
//   barcodeImg: { width: "100%", maxWidth: "220px", height: "auto" },
//   downloadLink: { display: "inline-block", marginTop: "10px", fontSize: "13px", color: "#1976D2", textDecoration: "none", fontWeight: "600" },
//   infoSection: { flex: "1.5", minWidth: "300px" },
//   title: { fontSize: "32px", margin: "0 0 5px 0", color: "#212121", fontWeight: "700" },
//   sku: { color: "#757575", fontSize: "15px", marginBottom: "20px" },
//   priceBox: { display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "25px" },
//   price: { fontSize: "36px", fontWeight: "700", color: "#d32f2f" },
//   gst: { fontSize: "15px", color: "#616161", fontWeight: "500" },
//   divider: { border: "0", borderTop: "1px solid #eeeeee", margin: "25px 0" },
//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px" },
//   detailItem: { display: "flex", flexDirection: "column", gap: "4px" },
//   label: { fontSize: "13px", color: "#757575", fontWeight: "600", textTransform: "uppercase" },
//   value: { fontSize: "16px", color: "#212121", fontWeight: "500" },
  
//   // New SKU Section Style
//   skuSection: { margin: "20px 0" },

//   descSection: { marginTop: "20px" },
//   sectionHeading: { fontSize: "18px", fontWeight: "600", color: "#424242", marginBottom: "10px" },
//   description: { fontSize: "15px", lineHeight: "1.6", color: "#424242", whiteSpace: "pre-line" },
//   actionButtons: { marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #eee" },
//   deleteBtn: { padding: "12px 24px", backgroundColor: "#ffebee", color: "#c62828", border: "1px solid #ffcdd2", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", width: "100%", transition: "0.2s" }
// };

// export default ProductDetails;
































// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import SkuUpdate from "../components/SkuUpdate";
// import toast from "react-hot-toast";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   const fetchProduct = useCallback(async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product", error);
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // --- DOWNLOAD HELPER FUNCTION ---
//   const downloadImage = async (imageUrl, fileName) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "download.jpg";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       toast.error("Failed to download image");
//     }
//   };

//   const handleDelete = async () => {
//     if(!canEdit) return toast.error("Permission Denied");
    
//     if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
//       try {
//         await api.delete(`/products/${id}`);
//         toast.success("Product Deleted Successfully");
//         navigate("/dashboard");
//       } catch (error) {
//         console.error("Error deleting product", error);
//         toast.error(error.response?.data?.message || "Failed to delete product");
//       }
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading...</div>;
//   if (!product) return <div style={styles.loading}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
//       <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
//         ⬅ Back
//       </button>

//       <div style={styles.wrapper}>
//         <div style={styles.imageSection}>
//           <div style={styles.imgContainer}>
//             <img src={product.img} alt={product.name} style={styles.mainImage} />
//             {/* PRODUCT IMAGE DOWNLOAD BUTTON */}
//             <button 
//               onClick={() => downloadImage(product.img, `${product.name}-product.jpg`)}
//               style={styles.downloadBtn}
//             >
//               📥 Download Product Image
//             </button>
//           </div>
          
//           {product.barcodeImg && (
//             <div style={styles.barcodeBox}>
//               <p style={styles.barcodeTitle}>Barcode / QR Code</p>
//               <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//               <button 
//                 onClick={() => downloadImage(product.barcodeImg, `${product.sku}-barcode.jpg`)}
//                 style={styles.downloadLinkBtn}
//               >
//                 Download Barcode
//               </button>
//             </div>
//           )}

//           {canEdit && (
//              <div style={styles.skuSection}>
//                 <div style={{border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#fafafa'}}>
//                    <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                 </div>
//              </div>
//           )}
//         </div>

//         <div style={styles.infoSection}>
//           <div style={styles.headerGroup}>
//              <h2 style={styles.title}>{product.name}</h2>
//              <span style={styles.skuBadge}>SKU: {product.sku}</span>
//           </div>

//           <div style={styles.priceBox}>
//             <span style={styles.price}>₹{product.price}</span>
//             <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//           </div>

//           <hr style={styles.divider} />

//           <div style={styles.detailsGrid}>
//             <DetailItem label="Category" value={product.category} />
//             <DetailItem label="Color" value={product.color} />
//             <DetailItem label="Size" value={product.size} />
            
//             <div style={styles.detailItem}>
//               <span style={styles.label}>Status:</span>
//               <span style={{ 
//                 fontSize: "13px",
//                 fontWeight: "bold", 
//                 color: product.Qty > 0 ? "#2e7d32" : "#d32f2f",
//                 backgroundColor: product.Qty > 0 ? "#e8f5e9" : "#ffebee",
//                 padding: "2px 8px",
//                 borderRadius: "4px",
//                 display: "inline-block"
//               }}>
//                 {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//               </span>
//             </div>

//             <DetailItem label="Cost Price" value={canEdit ? `₹${product.costing_price}` : "--"} />
//             <DetailItem label="Supplier" value={canEdit ? product.Supplier_name : "--"} />
//           </div>

//           <div style={styles.descSection}>
//             <h4 style={styles.sectionHeading}>Description</h4>
//             <p style={styles.description}>
//               {product.description || "No description."}
//             </p>
//           </div>

//           <div style={styles.actionButtons}>
//             {canEdit && (
//               <button onClick={handleDelete} style={styles.deleteBtn}>
//                 🗑 Delete Product
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div style={styles.detailItem}>
//     <span style={styles.label}>{label}:</span>
//     <span style={styles.value}>{value || "-"}</span>
//   </div>
// );

// const styles = {
//   // ... (aapke purane styles yahan rahenge)
//   container: { padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#fff", minHeight: "100vh" },
//   loading: { textAlign: "center", marginTop: "50px", fontSize: "16px", color: "#666" },
//   backBtn: { background: "none", border: "none", color: "#1976D2", cursor: "pointer", fontSize: "14px", fontWeight: "600", marginBottom: "15px", padding: 0 },
//   wrapper: { display: "flex", gap: "30px", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start" },
//   imageSection: { flex: "1", minWidth: "250px", maxWidth: "350px" },
//   imgContainer: { border: "1px solid #eee", borderRadius: "8px", overflow: "hidden", padding: "5px", textAlign: "center" },
//   mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "300px" },
  
//   // Naya Style Buttons ke liye
//   downloadBtn: { marginTop: "10px", padding: "8px", background: "#f0f7ff", border: "1px solid #1976D2", color: "#1976D2", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "600", width: "100%" },
//   downloadLinkBtn: { background: "none", border: "none", marginTop: "5px", fontSize: "12px", color: "#1976D2", fontWeight: "600", cursor: "pointer", textDecoration: "underline" },

//   barcodeBox: { marginTop: "15px", background: "#f8f9fa", padding: "10px", borderRadius: "8px", border: "1px dashed #ddd", textAlign: "center" },
//   barcodeTitle: { margin: "0 0 5px 0", fontSize: "11px", color: "#777", fontWeight: "bold", textTransform: "uppercase" },
//   barcodeImg: { width: "100%", maxWidth: "180px", height: "auto" },
//   infoSection: { flex: "1.5", minWidth: "300px" },
//   headerGroup: { marginBottom: "10px" },
//   title: { fontSize: "22px", margin: "0 0 5px 0", color: "#222", fontWeight: "700" },
//   skuBadge: { fontSize: "12px", color: "#555", background: "#f0f0f0", padding: "2px 6px", borderRadius: "4px" },
//   priceBox: { display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "15px" },
//   price: { fontSize: "26px", fontWeight: "700", color: "#d32f2f" },
//   gst: { fontSize: "13px", color: "#666" },
//   divider: { border: "0", borderTop: "1px solid #eee", margin: "15px 0" },
//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" },
//   detailItem: { display: "flex", flexDirection: "column" },
//   label: { fontSize: "11px", color: "#777", fontWeight: "700", textTransform: "uppercase" },
//   value: { fontSize: "14px", color: "#333", fontWeight: "500" },
//   skuSection: { margin: "15px 0" },
//   descSection: { marginTop: "15px" },
//   sectionHeading: { fontSize: "15px", fontWeight: "600", color: "#444", marginBottom: "5px" },
//   description: { fontSize: "13px", lineHeight: "1.5", color: "#555", whiteSpace: "pre-line" },
//   actionButtons: { marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #eee" },
//   deleteBtn: { padding: "10px", backgroundColor: "#fff", color: "#c62828", border: "1px solid #ffcdd2", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", width: "100%", transition: "0.2s" }
// };

// export default ProductDetails;






















// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import SkuUpdate from "../components/SkuUpdate";
// import toast from "react-hot-toast";
// import Header from "../components/Header"; // ✅ Header Import

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- EDIT MODAL STATE ---
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     price: "",
//     costing_price: "",
//     description: ""
//   });

//   const user = useSelector((state) => state.user.userData);
//   const isAdmin = user?.userType === "admin";
//   const isSuperUser = user?.userType === "superuser";
//   const canEdit = isAdmin || isSuperUser;

//   const fetchProduct = useCallback(async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching product", error);
//       toast.error("Error fetching product details");
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // --- DOWNLOAD HELPER ---
//   const downloadImage = async (imageUrl, fileName) => {
//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = fileName || "download.jpg";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed", error);
//       toast.error("Failed to download image");
//     }
//   };

//   // --- HANDLE EDIT CLICK ---
//   const handleEditClick = () => {
//     setEditForm({
//       price: product.price,
//       costing_price: product.costing_price,
//       description: product.description || ""
//     });
//     setIsEditing(true);
//   };

//   // --- HANDLE SAVE CHANGES ---
//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/products/${id}`, editForm);
//       toast.success("Product Updated Successfully!");
//       setIsEditing(false);
//       fetchProduct();
//     } catch (error) {
//       console.error("Update failed", error);
//       toast.error("Failed to update product");
//     }
//   };

//   // --- DELETE PRODUCT ---
//   const handleDelete = async () => {
//     if (!canEdit) return toast.error("Permission Denied");

//     if (window.confirm("Are you sure you want to PERMANENTLY delete this product?")) {
//       try {
//         await api.delete(`/products/${id}`);
//         toast.success("Product Deleted Successfully");
//         navigate("/dashboard");
//       } catch (error) {
//         console.error("Error deleting product", error);
//         toast.error(error.response?.data?.message || "Failed to delete product");
//       }
//     }
//   };

//   if (loading) return <div style={styles.loading}>Loading product details...</div>;
//   if (!product) return <div style={styles.loading}>Product Not Found</div>;

//   return (
//     <div style={styles.container}>
      
//       {/* ✅ HEADER ADDED */}
//       <Header />

//       {/* MAIN CONTENT AREA */}
//       <div style={styles.mainContent}>
        
//         {/* Navigation Breadcrumb */}
//         <div style={styles.navBar}>
//            <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
//              ⬅ Back to Dashboard
//            </button>
//         </div>

//         {/* PRODUCT CARD */}
//         <div style={styles.productCard}>
          
//           {/* --- LEFT COLUMN: IMAGES --- */}
//           <div style={styles.imageSection}>
//             <div style={styles.imgContainer}>
//               <img src={product.img} alt={product.name} style={styles.mainImage} />
//               <button
//                 onClick={() => downloadImage(product.img, `${product.name}-product.jpg`)}
//                 style={styles.downloadBtn}
//               >
//                 📥 Download Image
//               </button>
//             </div>

//             {product.barcodeImg && (
//               <div style={styles.barcodeBox}>
//                 <p style={styles.barcodeTitle}>Barcode / QR Code</p>
//                 <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
//                 <button
//                   onClick={() => downloadImage(product.barcodeImg, `${product.sku}-barcode.jpg`)}
//                   style={styles.downloadLinkBtn}
//                 >
//                   Download Barcode
//                 </button>
//               </div>
//             )}

//             {canEdit && (
//               <div style={styles.skuSection}>
//                 <div style={{ border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#f8fafc' }}>
//                   <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* --- RIGHT COLUMN: DETAILS --- */}
//           <div style={styles.infoSection}>
            
//             <div style={styles.headerGroup}>
//               <h2 style={styles.title}>{product.name}</h2>
//               <span style={styles.skuBadge}>SKU: {product.sku}</span>
//             </div>

//             <div style={styles.priceBox}>
//               <span style={styles.price}>₹{product.price}</span>
//               <span style={styles.gst}>(Inc. GST {product.gst}%)</span>
//             </div>

//             <hr style={styles.divider} />

//             <div style={styles.detailsGrid}>
//               <DetailItem label="Category" value={product.category} />
//               <DetailItem label="Color" value={product.color} />
//               <DetailItem label="Size" value={product.size} />

//               <div style={styles.detailItem}>
//                 <span style={styles.label}>Status</span>
//                 <span style={{
//                   fontSize: "13px",
//                   fontWeight: "bold",
//                   color: product.Qty > 0 ? "#166534" : "#dc2626",
//                   backgroundColor: product.Qty > 0 ? "#dcfce7" : "#fee2e2",
//                   padding: "4px 10px",
//                   borderRadius: "20px",
//                   display: "inline-block",
//                   textAlign: "center",
//                   maxWidth: "fit-content"
//                 }}>
//                   {product.Qty > 0 ? `In Stock (${product.Qty})` : "Out of Stock"}
//                 </span>
//               </div>

//               <DetailItem label="Cost Price" value={canEdit ? `₹${product.costing_price}` : "--"} />
//               <DetailItem label="Supplier" value={canEdit ? product.Supplier_name : "--"} />
//             </div>

//             <div style={styles.descSection}>
//               <h4 style={styles.sectionHeading}>Description</h4>
//               <p style={styles.description}>
//                 {product.description || "No description provided."}
//               </p>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div style={styles.actionButtons}>
//               {canEdit && (
//                 <>
//                   <button onClick={handleEditClick} style={styles.editBtn}>
//                     ✏️ Edit Details
//                   </button>
//                   <button onClick={handleDelete} style={styles.deleteBtn}>
//                     🗑 Delete Product
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- EDIT MODAL OVERLAY --- */}
//       {isEditing && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h3 style={styles.modalTitle}>Edit Product Details</h3>
            
//             <form onSubmit={handleSaveChanges} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              
//               {/* Cost Price */}
//               <div>
//                 <label style={styles.inputLabel}>Cost Price (₹)</label>
//                 <input
//                   type="number"
//                   value={editForm.costing_price}
//                   onChange={(e) => setEditForm({ ...editForm, costing_price: e.target.value })}
//                   style={styles.input}
//                   required
//                 />
//               </div>

//               {/* Selling Price */}
//               <div>
//                 <label style={styles.inputLabel}>Selling Price (₹)</label>
//                 <input
//                   type="number"
//                   value={editForm.price}
//                   onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
//                   style={styles.input}
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label style={styles.inputLabel}>Description</label>
//                 <textarea
//                   value={editForm.description}
//                   onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//                   style={{ ...styles.input, height: "100px", resize: "none", fontFamily: "inherit" }}
//                   placeholder="Enter product description..."
//                 />
//               </div>

//               <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//                 <button type="submit" style={styles.saveBtn}>Save Changes</button>
//                 <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// const DetailItem = ({ label, value }) => (
//   <div style={styles.detailItem}>
//     <span style={styles.label}>{label}</span>
//     <span style={styles.value}>{value || "-"}</span>
//   </div>
// );

// // ✨ UPDATED PROFESSIONAL CSS
// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#f3f4f6", // Light grey background
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     display: "flex",
//     flexDirection: "column",
//   },
//   loading: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#64748b", fontWeight: "600" },
  
//   mainContent: {
//     padding: "30px 20px",
//     width: "100%",
//     maxWidth: "1100px",
//     margin: "0 auto",
//     boxSizing: "border-box",
//   },
  
//   navBar: { marginBottom: "20px" },
//   backBtn: { 
//     background: "transparent", 
//     border: "none", 
//     color: "#64748b", 
//     cursor: "pointer", 
//     fontSize: "14px", 
//     fontWeight: "600", 
//     display: "flex", 
//     alignItems: "center",
//     transition: "color 0.2s"
//   },

//   // Main Card
//   productCard: {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     backgroundColor: "#fff",
//     borderRadius: "16px",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//     overflow: "hidden",
//     border: "1px solid #e2e8f0"
//   },

//   // --- Left Column ---
//   imageSection: { 
//     flex: "1", 
//     minWidth: "300px", 
//     maxWidth: "400px",
//     padding: "30px",
//     borderRight: "1px solid #f1f5f9",
//     backgroundColor: "#fff"
//   },
//   imgContainer: { 
//     border: "1px solid #e2e8f0", 
//     borderRadius: "12px", 
//     overflow: "hidden", 
//     padding: "10px", 
//     textAlign: "center",
//     marginBottom: "20px",
//     backgroundColor: "#fff"
//   },
//   mainImage: { width: "100%", height: "auto", objectFit: "contain", maxHeight: "350px" },
//   downloadBtn: { marginTop: "10px", padding: "10px", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", width: "100%" },
  
//   barcodeBox: { marginTop: "20px", background: "#f8fafc", padding: "15px", borderRadius: "12px", border: "2px dashed #cbd5e1", textAlign: "center" },
//   barcodeTitle: { margin: "0 0 10px 0", fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
//   barcodeImg: { width: "100%", maxWidth: "150px", height: "auto" },
//   downloadLinkBtn: { background: "none", border: "none", marginTop: "8px", fontSize: "13px", color: "#2563eb", fontWeight: "600", cursor: "pointer", textDecoration: "underline" },
  
//   skuSection: { marginTop: "25px" },

//   // --- Right Column ---
//   infoSection: { 
//     flex: "1.5", 
//     minWidth: "350px", 
//     padding: "40px",
//   },
//   headerGroup: { marginBottom: "15px" },
//   title: { fontSize: "28px", margin: "0 0 10px 0", color: "#1e293b", fontWeight: "800", lineHeight: "1.2" },
//   skuBadge: { fontSize: "13px", color: "#475569", background: "#f1f5f9", padding: "4px 10px", borderRadius: "6px", fontWeight: "600", border: "1px solid #e2e8f0" },

//   priceBox: { display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" },
//   price: { fontSize: "32px", fontWeight: "800", color: "#059669" }, // Green for price looks better
//   gst: { fontSize: "14px", color: "#64748b", fontWeight: "500" },

//   divider: { border: "0", borderTop: "1px solid #f1f5f9", margin: "25px 0" },

//   detailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px 30px" },
//   detailItem: { display: "flex", flexDirection: "column" },
//   label: { fontSize: "12px", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", marginBottom: "5px", letterSpacing: "0.5px" },
//   value: { fontSize: "16px", color: "#334155", fontWeight: "600" },

//   descSection: { marginTop: "30px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px" },
//   sectionHeading: { fontSize: "14px", fontWeight: "700", color: "#475569", marginBottom: "8px", textTransform: "uppercase" },
//   description: { fontSize: "14px", lineHeight: "1.6", color: "#334155", whiteSpace: "pre-line", margin: 0 },

//   actionButtons: { marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", display: "flex", gap: "15px" },
//   editBtn: { flex: 1, padding: "12px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "0.2s", boxShadow: "0 2px 4px rgba(37,99,235,0.2)" },
//   deleteBtn: { flex: 1, padding: "12px", backgroundColor: "#fff", color: "#dc2626", border: "1px solid #fca5a5", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "0.2s" },

//   // Modal
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 },
//   modalContent: { background: "#fff", padding: "30px", borderRadius: "16px", width: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
//   modalTitle: { margin: "0 0 20px 0", color: "#1e293b", fontSize: "20px", fontWeight: "700" },
//   inputLabel: { display: "block", fontSize: "13px", color: "#475569", marginBottom: "6px", fontWeight: "600" },
//   input: { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" },
//   saveBtn: { flex: 1, background: "#16a34a", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
//   cancelBtn: { flex: 1, background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }
// };

// export default ProductDetails;





import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import SkuUpdate from "../components/SkuUpdate";
import toast from "react-hot-toast";
import Header from "../components/Header";
import * as XLSX from "xlsx"; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- MODAL STATES ---
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editForm, setEditForm] = useState({
    price: "",
    costing_price: "",
    description: "",
    Supplier_name: "" // 👈 Added Supplier Name here
  });

  const user = useSelector((state) => state.user.userData);
  const isAdmin = user?.userType === "admin";
  const isSuperUser = user?.userType === "superuser";
  const canEdit = isAdmin || isSuperUser;

  const fetchProduct = useCallback(async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product", error);
      toast.error("Error fetching product details");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // --- EXCEL & IMAGE LOGIC ---
  const downloadOneProductExcel = () => {
    if (!product) return;
    const dataToExport = [
      {
        "Product Name": product.name,
        SKU: product.sku,
        Category: product.category,
        Color: product.color,
        Size: product.size,
        Price: product.price,
        "Cost Price": canEdit ? product.costing_price : "N/A",
        Stock: product.Qty,
        Supplier: canEdit ? product.Supplier_name : "N/A",
        Status: product.Qty > 0 ? "In Stock" : "Out of Stock",
        Description: product.description,
        "Product Image Link": product.img || "No Image",
        "Barcode Link": product.barcodeImg || "No Barcode"
      }
    ];
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product Details");
    XLSX.writeFile(workbook, `${product.sku}_Details.xlsx`);
    toast.success("Excel downloaded successfully!");
  };

  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "download.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      toast.error("Failed to download image");
    }
  };

  // --- EDIT HANDLERS ---
  const handleEditClick = () => {
    setEditForm({
      price: product.price,
      costing_price: product.costing_price,
      description: product.description || "",
      Supplier_name: product.Supplier_name || "" // 👈 Prefill Supplier
    });
    setIsEditing(true);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, editForm);
      toast.success("Product Updated Successfully!");
      setIsEditing(false);
      fetchProduct();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // --- DELETE HANDLERS ---
  const openDeleteModal = () => {
    if (!canEdit) return toast.error("Permission Denied");
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product Deleted Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
    setShowDeleteModal(false);
  };

  if (loading) return <div style={styles.centerMsg}>Loading...</div>;
  if (!product) return <div style={styles.centerMsg}>Not Found</div>;

  return (
    <div style={styles.container}>
      <Header />

      <div style={styles.mainContent}>
        <div style={styles.navBar}>
           <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>⬅ Back</button>
           <button onClick={downloadOneProductExcel} style={styles.excelBtn}>📥 Excel</button>
        </div>

        <div style={styles.productCard}>
          {/* LEFT: IMAGE ONLY */}
          <div style={styles.leftCol}>
            <div style={styles.imgWrapper}>
              <img src={product.img} alt={product.name} style={styles.productImg} />
              <button onClick={() => downloadImage(product.img, `${product.name}.jpg`)} style={styles.iconBtn} title="Download">⬇</button>
            </div>

            {product.barcodeImg && (
              <div style={styles.barcodeWrapper}>
                <img src={product.barcodeImg} alt="Barcode" style={styles.barcodeImg} />
                <button onClick={() => downloadImage(product.barcodeImg, `${product.sku}.jpg`)} style={styles.miniLink}>Download QR</button>
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div style={styles.rightCol}>
            <div style={styles.headerRow}>
               <div>
                 <h2 style={styles.title}>{product.name}</h2>
                 <span style={styles.sku}>SKU: {product.sku}</span>
               </div>
               <div style={{textAlign:'right'}}>
                 <div style={styles.price}>₹{product.price}</div>
                 <div style={styles.gst}>+ {product.gst}% GST</div>
               </div>
            </div>

            <hr style={styles.divider} />

            <div style={styles.infoGrid}>
               <InfoBox label="Category" val={product.category} />
               <InfoBox label="Color" val={product.color} />
               <InfoBox label="Size" val={product.size} />
               <InfoBox label="Status" val={product.Qty > 0 ? "In Stock" : "Out of Stock"} color={product.Qty > 0 ? "green" : "red"} />
               <InfoBox label="Stock" val={product.Qty} />
               <InfoBox label="Cost" val={canEdit ? `₹${product.costing_price}` : "--"} />
               <InfoBox label="Supplier" val={canEdit ? product.Supplier_name : "--"} />
            </div>

            {/* SPLIT ROW */}
            <div style={styles.splitRow}>
                <div style={styles.descBox}>
                    <span style={styles.label}>Description:</span>
                    <p style={styles.descText}>{product.description || "No description."}</p>
                </div>
                {canEdit && (
                    <div style={styles.skuBoxRight}>
                        <SkuUpdate onUpdated={fetchProduct} prefillProduct={product} />
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            {canEdit && (
                <div style={styles.actionRow}>
                  <button onClick={handleEditClick} style={styles.editBtn}>✏️ Edit</button>
                  <button onClick={openDeleteModal} style={styles.delBtn}>🗑 Delete</button>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isEditing && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={{margin:'0 0 10px 0', color: "#333"}}>Edit Product Details</h3>
            
            <form onSubmit={handleSaveChanges} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
              
              {/* Row 1: Cost & Selling Price */}
              <div style={{display:'flex', gap:'10px'}}>
                 <div style={{flex: 1}}>
                    <label style={styles.label}>Cost Price (₹)</label>
                    <input 
                        type="number" 
                        value={editForm.costing_price} 
                        onChange={(e)=>setEditForm({...editForm, costing_price:e.target.value})} 
                        style={styles.input} 
                        required 
                    />
                 </div>
                 <div style={{flex: 1}}>
                    <label style={styles.label}>Selling Price (₹)</label>
                    <input 
                        type="number" 
                        value={editForm.price} 
                        onChange={(e)=>setEditForm({...editForm, price:e.target.value})} 
                        style={styles.input} 
                        required 
                    />
                 </div>
              </div>

              {/* Row 2: Supplier Name (New) */}
              <div>
                 <label style={styles.label}>Supplier Name</label>
                 <input 
                    type="text" 
                    value={editForm.Supplier_name} 
                    onChange={(e)=>setEditForm({...editForm, Supplier_name:e.target.value})} 
                    style={styles.input} 
                    required 
                 />
              </div>

              {/* Row 3: Description */}
              <div>
                 <label style={styles.label}>Description</label>
                 <textarea 
                    value={editForm.description} 
                    onChange={(e)=>setEditForm({...editForm, description:e.target.value})} 
                    style={styles.textarea} 
                 />
              </div>

              <div style={{display:'flex', gap:'10px', marginTop: '5px'}}>
                <button type="submit" style={styles.saveBtn}>Save Changes</button>
                <button type="button" onClick={()=>setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE MODAL --- */}
      {showDeleteModal && (
        <div style={styles.overlay}>
          <div style={{...styles.modal, maxWidth: '350px'}}>
            <div style={{textAlign: 'center', marginBottom: '15px'}}>
               <div style={{fontSize: '40px', marginBottom: '10px'}}>⚠️</div>
               <h3 style={{margin: '0 0 5px 0', color: '#dc2626'}}>Delete Product?</h3>
               <p style={{fontSize: '13px', color: '#555', margin: 0}}>
                 Are you sure you want to remove <b>{product.name}</b> permanently?
               </p>
            </div>
            <div style={{display:'flex', gap:'10px'}}>
                <button onClick={confirmDelete} style={{...styles.saveBtn, background: '#dc2626'}}>Yes, Delete</button>
                <button onClick={()=>setShowDeleteModal(false)} style={styles.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const InfoBox = ({ label, val, color }) => (
  <div style={{background:'#f8fafc', padding:'5px 8px', borderRadius:'4px', border:'1px solid #e2e8f0'}}>
    <div style={{fontSize:'10px', color:'#64748b', fontWeight:'700', textTransform:'uppercase'}}>{label}</div>
    <div style={{fontSize:'13px', fontWeight:'600', color: color || '#334155'}}>{val}</div>
  </div>
);

// ✨ CSS SAME AS BEFORE (Compact Layout)
const styles = {
  container: {
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#f1f5f9",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', sans-serif",
  },
  centerMsg: { display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', color:'#666' },
  mainContent: { flex: 1, padding: "10px 20px", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" },
  navBar: { display:'flex', justifyContent:'space-between', height: '30px', alignItems:'center', flexShrink: 0 },
  backBtn: { background:'none', border:'none', color:'#64748b', cursor:'pointer', fontWeight:'600', fontSize:'13px' },
  excelBtn: { background:'#107c41', color:'#fff', border:'none', borderRadius:'4px', padding:'4px 10px', fontSize:'12px', cursor:'pointer' },
  productCard: { display: "flex", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", overflow: "hidden", flex: 1, border: "1px solid #e2e8f0", minHeight: 0 },
  
  // Left
  leftCol: { width: "30%", minWidth: "250px", backgroundColor: "#f8fafc", padding: "15px", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto" },
  imgWrapper: { position:'relative', background:'#fff', borderRadius:'6px', border:'1px solid #e2e8f0', padding:'5px', textAlign:'center', flex: 1, display:'flex', alignItems:'center', justifyContent:'center', minHeight: "200px" },
  productImg: { maxWidth:'100%', maxHeight:'100%', objectFit:'contain' },
  iconBtn: { position:'absolute', top:'5px', right:'5px', background:'#eee', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer' },
  barcodeWrapper: { background:'#fff', padding:'5px', borderRadius:'6px', border:'1px dashed #ccc', textAlign:'center', flexShrink: 0 },
  barcodeImg: { height:'35px', maxWidth:'100%' },
  miniLink: { fontSize:'10px', color:'#2563eb', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' },

  // Right
  rightCol: { width: "70%", padding: "15px", display: "flex", flexDirection: "column", overflowY: "auto" },
  headerRow: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexShrink: 0 },
  title: { fontSize:'20px', margin:0, color:'#1e293b', fontWeight:'700' },
  sku: { fontSize:'12px', color:'#64748b', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px' },
  price: { fontSize:'22px', fontWeight:'800', color:'#059669' },
  gst: { fontSize:'11px', color:'#64748b' },
  divider: { border:'0', borderTop:'1px solid #e2e8f0', margin:'10px 0' },
  infoGrid: { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'8px', marginBottom:'10px', flexShrink: 0 },
  splitRow: { display: "flex", gap: "15px", flex: 1, minHeight: "0", marginBottom: "5px" },
  descBox: { flex: 2, background:'#fdfdfd', border:'1px solid #f1f5f9', borderRadius:'6px', padding:'10px', overflowY:'auto' },
  skuBoxRight: { flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  label: { fontSize:'11px', fontWeight:'700', color:'#475569', display:'block', marginBottom:'3px' },
  descText: { fontSize:'13px', margin:0, color:'#334155', lineHeight:'1.4' },
  actionRow: { display:'flex', gap:'10px', marginTop:'auto', flexShrink: 0 },
  editBtn: { flex:1, padding:'8px', background:'#2563eb', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'600' },
  delBtn: { flex:1, padding:'8px', background:'#fff', color:'#dc2626', border:'1px solid #fca5a5', borderRadius:'4px', cursor:'pointer', fontWeight:'600' },

  // Modal
  overlay: { position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:100 },
  modal: { background:'#fff', padding:'20px', borderRadius:'8px', width:'350px' }, // Width thodi badha di
  input: { padding:'8px', width:'100%', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', boxSizing:'border-box' },
  textarea: { padding:'8px', width:'100%', height:'60px', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', resize:'none', boxSizing:'border-box' },
  saveBtn: { flex:1, background:'#16a34a', color:'#fff', border:'none', padding:'8px', borderRadius:'4px', cursor:'pointer' },
  cancelBtn: { flex:1, background:'#f1f5f9', color:'#333', border:'1px solid #ccc', padding:'8px', borderRadius:'4px', cursor:'pointer' }
};

export default ProductDetails;