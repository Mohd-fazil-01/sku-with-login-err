// import React, { useState } from "react";

// function ProductList({ products, onEdit, onDelete }) {
//   const [view, setView] = useState("table"); // table OR box

//   return (
//     <div style={{ padding: "10px" }}>
//       <h2>📦 Products</h2>

//       <button
//         style={styles.toggleBtn}
//         onClick={() => setView(view === "table" ? "box" : "table")}
//       >
//         Switch to {view === "table" ? "Box View" : "Table View"}
//       </button>

//       {view === "table" ? (
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>S. No.</th>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>Category</th>
//                 <th style={styles.th}>Color</th>
//                 <th style={styles.th}>Size</th>
//                 <th style={styles.th}>Price</th>
//                 <th style={styles.th}>Costing Price</th>
//                 <th style={styles.th}>GST</th>
//                 <th style={styles.th}>Qty</th>
//                 <th style={styles.th}>Supplier</th>
//                 <th style={styles.th}>SKU</th>
//                 <th style={styles.th}>Image</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product, index) => (
//                 <tr key={product._id} style={styles.row}>
//                   <td style={styles.td}>{index + 1}</td>
//                   <td style={styles.td}>{product.name}</td>
//                   <td style={styles.td}>{product.category}</td>
//                   <td style={styles.td}>{product.color}</td>
//                   <td style={styles.td}>{product.size}</td>
//                   <td style={styles.td}>₹{product.price}</td>
//                   <td style={styles.td}>₹{product.costing_price}</td>
//                  <td style={styles.td}>{product.gst}%</td> 
//                   <td style={styles.td}>{product.Qty}</td>
//                   <td style={styles.td}>{product.Supplier_name}</td>
//                   <td style={styles.td}>{product.sku}</td>

//                   <td style={styles.td}>
//                     {product.img && (
//                       <img
//                         src={product.img}
//                         alt={product.name}
//                         style={{
//                           width: "50px",
//                           height: "50px",
//                           objectFit: "cover",
//                           borderRadius: "6px",
//                         }}
//                       />
//                     )}
//                   </td>

//                   <td style={styles.td}>
//                     <button onClick={() => onEdit(product)} style={styles.editBtn}>
//                       Edit
//                     </button>
//                     <button onClick={() => onDelete(product._id)} style={styles.delBtn}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div style={styles.grid}>
//           {products.map((product, index) => (
//             <div key={product._id} style={styles.card}>
//               <h3>
//                 <b>#{index + 1} — {product.name}</b>
//               </h3>

//               <p><b>Category:</b> {product.category}</p>
//               <p><b>Color:</b> {product.color}</p>
//               <p><b>Size:</b> {product.size}</p>
//               <p><b>Price:</b> ₹{product.price}</p>
//               <p><b>Costing Price + GST:</b> ₹{product.costing_price}</p>
              
//               <p><b>Qty:</b> {product.Qty}</p>
//               <p><b>Supplier:</b> {product.Supplier_name}</p>
//               <p><b>SKU:</b> {product.sku}</p>

//               {product.img && (
//                 <img
//                   src={product.img}
//                   alt={product.name}
//                   style={{ maxWidth: "120px", borderRadius: "8px" }}
//                 />
//               )}

//               <button onClick={() => onEdit(product)} style={styles.editBtn}>Edit</button>
//               <button onClick={() => onDelete(product._id)} style={styles.delBtn}>Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   toggleBtn: {
//     padding: "10px 20px",
//     background: "#1976D2",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginBottom: "15px",
//   },

//   // ⭐ Responsive + No Horizontal Scroll
//   tableWrapper: {
//     maxHeight: "480px",
//     overflowY: "auto",
//     overflowX: "auto",
//     border: "1px solid #d0d0d0",
//     borderRadius: "10px",
//     padding: "10px",
//     background: "#fff",
//   },

//   // ⭐ Compact Table
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     tableLayout: "fixed",
//   },

//   th: {
//     padding: "10px",
//     background: "#f7f7f7",
//     textAlign: "left",
//     fontWeight: "600",
//     borderBottom: "2px solid #ddd",
//     fontSize: "13px",
//     whiteSpace: "nowrap",
//     position: "sticky",
//     top: 0,
//     zIndex: 1,
//   },

//   td: {
//     padding: "8px 10px",
//     background: "#fff",
//     borderBottom: "1px solid #eee",
//     fontSize: "13px",
//     wordWrap: "break-word",
//   },

//   row: {
//     background: "#fff",
//   },

//   // ⭐ Compact Buttons
//   editBtn: {
//     marginRight: "6px",
//     padding: "5px 10px",
//     fontSize: "12px",
//     background: "#4CAF50",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },

//   delBtn: {
//     padding: "5px 10px",
//     fontSize: "12px",
//     background: "#E53935",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },

//   // ⭐ Responsive Grid
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "15px",
//   },

//   card: {
//     padding: "15px",
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     background: "#fafafa",
//   },
// };

// export default ProductList;















































// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Navigation ke liye

// function ProductList({ products }) {
//   const [view, setView] = useState("table");
//   const navigate = useNavigate();

//   // Detail Page par jaane ka function
//   const handleView = (id) => {
//     navigate(`/product/${id}`);
//   };

//   return (
//     <div style={{ padding: "10px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2>📦 Products ({products.length})</h2>
//         <button
//           style={styles.toggleBtn}
//           onClick={() => setView(view === "table" ? "box" : "table")}
//         >
//           {view === "table" ? "Show Grid View" : "Show Table View"}
//         </button>
//       </div>

//       {view === "table" ? (
//         <div style={styles.tableWrapper}>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th style={styles.th}>S.No.</th>
//                 <th style={styles.th}>Image</th>
//                 <th style={styles.th}>Name</th>
//                 <th style={styles.th}>SKU</th>
//                 <th style={styles.th}>Category</th>
//                 <th style={styles.th}>Price</th>
//                 <th style={styles.th}>Qty</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product, index) => (
//                 <tr key={product._id} style={styles.row}>
//                   <td style={styles.td}>{index + 1}</td>
                  
//                   {/* Image Column */}
//                   <td style={styles.td}>
//                     {product.img ? (
//                       <img
//                         src={product.img}
//                         alt={product.name}
//                         style={{ width: "40px", height: "40px", borderRadius: "4px", objectFit: "cover" }}
//                       />
//                     ) : "-"}
//                   </td>

//                   {/* Name Clickable */}
//                   <td style={styles.td}>
//                     <b 
//                       style={{ color: "#1976D2", cursor: "pointer" }} 
//                       onClick={() => handleView(product._id)}
//                     >
//                       {product.name}
//                     </b>
//                   </td>

//                   <td style={styles.td}>{product.sku}</td>
//                   <td style={styles.td}>{product.category}</td>
//                   <td style={styles.td}>₹{product.price}</td>
                  
//                   {/* Qty with Color Logic */}
//                   <td style={styles.td}>
//                     <span style={{ 
//                         padding: "2px 6px", 
//                         borderRadius: "4px",
//                         background: product.Qty < 5 ? "#ffebee" : "#e8f5e9",
//                         color: product.Qty < 5 ? "red" : "green",
//                         fontWeight: "bold"
//                     }}>
//                       {product.Qty}
//                     </span>
//                   </td>

//                   <td style={styles.td}>
//                     <button onClick={() => handleView(product._id)} style={styles.viewBtn}>View</button>
//                     {/* <button onClick={() => onEdit(product)} style={styles.editBtn}>Edit</button>
//                     <button onClick={() => onDelete(product._id)} style={styles.delBtn}>Del</button> */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         // GRID VIEW (Simple Cards)
//         <div style={styles.grid}>
//           {products.map((product) => (
//             <div key={product._id} style={styles.card} onClick={() => handleView(product._id)}>
//               {product.img && (
//                 <img src={product.img} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
//               )}
//               <h4 style={{ margin: "10px 0 5px 0" }}>{product.name}</h4>
//               <p style={{ margin: 0, color: "#666" }}>SKU: {product.sku}</p>
//               <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
//                 <b>₹{product.price}</b>
//                 <span style={{ color: product.Qty < 5 ? "red" : "green" }}>Qty: {product.Qty}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   toggleBtn: { padding: "8px 15px", background: "#1976D2", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" },
//   tableWrapper: { maxHeight: "75vh", overflow: "auto", border: "1px solid #d0d0d0", borderRadius: "8px", background: "#fff" },
//   table: { width: "100%", borderCollapse: "collapse" },
//   th: { padding: "12px 10px", background: "#f1f3f4", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #ddd", position: "sticky", top: 0 },
//   td: { padding: "10px", borderBottom: "1px solid #eee", fontSize: "14px" },
//   row: { background: "#fff" },
//   viewBtn: { marginRight: "5px", padding: "5px 10px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
//   editBtn: { marginRight: "5px", padding: "5px 10px", background: "#FF9800", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
//   delBtn: { padding: "5px 10px", background: "#E53935", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
//   grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" },
//   card: { padding: "10px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", cursor: "pointer", transition: "0.2s" },
// };

// export default ProductList;






























import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductList({ products }) {
  const [view, setView] = useState("table");
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div style={{ padding: "0 10px" }}> {/* Side padding rakhi, top/bottom hata di */}
      
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", marginTop: "10px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", color: "#333" }}>📦 Products ({products.length})</h3>
        <button
          style={styles.toggleBtn}
          onClick={() => setView(view === "table" ? "box" : "table")}
        >
          {view === "table" ? "Show Grid" : "Show Table"}
        </button>
      </div>

      {view === "table" ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>S no.</th>
                <th style={styles.th}>Img</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>SKU</th>
                <th style={styles.th}>Cat.</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} style={styles.row}>
                  <td style={styles.td}>{index + 1}</td>
                  
                  {/* Image Choti kar di (32px) */}
                  <td style={styles.td}>
                    {product.img ? (
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover", display: "block" }}
                      />
                    ) : "-"}
                  </td>

                  <td style={styles.td}>
                    <b 
                      style={{ color: "#1976D2", cursor: "pointer", fontSize: "13px" }} 
                      onClick={() => handleView(product._id)}
                    >
                      {product.name}
                    </b>
                  </td>

                  <td style={{...styles.td, fontSize: "12px", color: "#555"}}>{product.sku}</td>
                  <td style={styles.td}>{product.category}</td>
                  <td style={styles.td}>₹{product.price}</td>
                  
                  <td style={styles.td}>
                    <span style={{ 
                        padding: "1px 6px", 
                        borderRadius: "3px",
                        fontSize: "11px", // Font chota kiya badge ka
                        background: product.Qty < 5 ? "#ffebee" : "#e8f5e9",
                        color: product.Qty < 5 ? "red" : "green",
                        fontWeight: "bold",
                        border: product.Qty < 5 ? "1px solid #ffcdd2" : "1px solid #c8e6c9"
                    }}>
                      {product.Qty}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button onClick={() => handleView(product._id)} style={styles.viewBtn}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // GRID VIEW COMPACT
        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product._id} style={styles.card} onClick={() => handleView(product._id)}>
              {product.img && (
                <img src={product.img} alt={product.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }} />
              )}
              <h5 style={{ margin: "8px 0 4px 0", fontSize: "14px" }}>{product.name}</h5>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <b>₹{product.price}</b>
                <span style={{ color: product.Qty < 5 ? "red" : "green" }}>Qty: {product.Qty}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ✨ COMPACT STYLES
const styles = {
  toggleBtn: { padding: "5px 10px", background: "#1976D2", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  
  tableWrapper: { maxHeight: "80vh", overflow: "auto", border: "1px solid #e0e0e0", borderRadius: "6px", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
  
  table: { width: "100%", borderCollapse: "collapse" },
  
  // 🔹 HEADER STYLE (Height Kam Ki)
  th: { 
    padding: "8px 10px", // Padding kam ki (pehle 12px thi)
    background: "#f8f9fa", 
    textAlign: "left", 
    fontWeight: "700", 
    fontSize: "12px", // Font chota kiya
    color: "#555",
    textTransform: "uppercase",
    borderBottom: "1px solid #ccc", 
    position: "sticky", 
    top: 0,
    zIndex: 2
  },
  
  // 🔹 ROW STYLE (Height Kam Ki)
  td: { 
    padding: "6px 10px", // Padding kam ki (pehle 10px thi)
    borderBottom: "1px solid #eee", 
    fontSize: "13px", // Text size adjust kiya
    color: "#333",
    verticalAlign: "middle" // Content beech me rahega
  },
  
  row: { background: "#fff", transition: "0.1s" },
  
  viewBtn: { padding: "4px 8px", background: "#2196F3", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer", fontSize: "11px" },
  
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "15px" },
  card: { padding: "8px", border: "1px solid #eee", borderRadius: "6px", background: "#fff", cursor: "pointer", transition: "0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
};

export default ProductList;