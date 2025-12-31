// // src/components/SkuUpdate.jsx
// import React, { useState } from "react";
// import axios from "axios";

// export default function SkuUpdate({ onUpdated }) {
//   const [sku, setSku] = useState("");
//   const [skuProduct, setSkuProduct] = useState(null);
//   const [addQty, setAddQty] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchBySku = async () => {
//     setError("");
//     setSkuProduct(null);

//     const trimmed = sku.trim();
//     if (!trimmed) {
//       setError("Please enter SKU");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:7000/api/products/sku/${encodeURIComponent(trimmed)}`);
//       setSkuProduct(res.data);
//     } catch (err) {
//       // show helpful message
//       if (err.response?.status === 404) setError("SKU not found");
//       else setError("Fetch failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddQty = async () => {
//     setError("");
//     if (!skuProduct) {
//       setError("Fetch a product first");
//       return;
//     }
//     if (!addQty || Number(addQty) <= 0) {
//       setError("Enter a valid quantity (> 0)");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.put(`http://localhost:7000/api/products/update-qty-sku`, {
//         sku: skuProduct.sku,
//         addedQty: Number(addQty),
//       });

//       // update shown product & notify parent to refresh list
//       setSkuProduct(res.data);
//       setAddQty("");
//       if (onUpdated) onUpdated(); // parent refresh
//     } catch (err) {
//       setError(err.response?.data?.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reset = () => {
//     setSku("");
//     setSkuProduct(null);
//     setAddQty("");
//     setError("");
//   };

//   return (
//     <div style={{
//       margin: "20px 0",
//       padding: "16px",
//       border: "1px solid #1976D2",
//       borderRadius: 10,
//       maxWidth: 420
//     }}>
//       <h3 style={{ marginTop: 0 }}>Update Product Qty by SKU</h3>

//       <input
//         placeholder="Enter SKU (e.g. CT-DC-BL-1-32-0010)"
//         value={sku}
//         onChange={(e) => setSku(e.target.value)}
//         style={{ padding: 8, width: "100%", marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
//       />

//       <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
//         <button type="button" onClick={fetchBySku} style={btnStyle} disabled={loading}>
//           {loading ? "Fetching..." : "Fetch Product"}
//         </button>
//         <button type="button" onClick={reset} style={{ ...btnStyle, backgroundColor: "#E53935" }} disabled={loading}>
//           Add New
//         </button>
//       </div>

//       {error && <p style={{ color: "red", marginTop: 6 }}>{error}</p>}

//       {skuProduct && (
//         <div style={{ marginTop: 10, borderTop: "1px dashed #ddd", paddingTop: 10 }}>
//           <p><b>Name:</b> {skuProduct.name}</p>
//           <p><b>Category:</b> {skuProduct.category}</p>
//           <p><b>color:</b> {skuProduct.color}</p>
//            <p><b>size:</b> {skuProduct.size}</p>
//           <p><b>SKU:</b> {skuProduct.sku}</p>
        
          
          
          
//           <p><b>Current Qty:</b> {skuProduct.Qty}</p>

//           <input
//             type="number"
//             placeholder="Add quantity"
//             value={addQty}
//             onChange={(e) => setAddQty(e.target.value)}
//             style={{ padding: 8, width: "100%", marginBottom: 8, borderRadius: 6, border: "1px solid #ccc" }}
//             min="0"
//           />
//           <div style={{ display: "flex", gap: 8 }}>
//             <button type="button" onClick={handleAddQty} style={btnStyle} disabled={loading}>
//               {loading ? "Updating..." : "Add Qty"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const btnStyle = {
//   padding: "8px 12px",
//   backgroundColor: "#1976D2",
//   color: "#fff",
//   border: "none",
//   borderRadius: 6,
//   cursor: "pointer",
// };






// src/components/SkuUpdate.jsx

















// import React, { useState } from "react";
// // import axios from "axios";
// import api from "../api/axios";

// export default function SkuUpdate({ onUpdated }) {
//   const [showForm, setShowForm] = useState(false); // ⭐ NEW STATE

//   const [sku, setSku] = useState("");
//   const [skuProduct, setSkuProduct] = useState(null);
//   const [qtyValue, setQtyValue] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // FETCH PRODUCT
//   const fetchBySku = async () => {
//     setError("");
//     setSkuProduct(null);

//     if (!sku.trim()) {
//       setError("Please enter SKU");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.get(
//         `http://localhost:7000/api/products/sku/${encodeURIComponent(sku.trim())}`
//       );
//       setSkuProduct(res.data);
//     } catch (err) {
//       if (err.response?.status === 404) setError("SKU not found");
//       else setError("Fetch failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ADD QTY
//   const handleAddQty = async () => {
//     setError("");
//     if (!validateQty()) return;

//     try {
//       setLoading(true);
//       const res = await api.put(
//         "http://localhost:7000/api/products/update-qty-sku",
//         { sku: skuProduct.sku, addedQty: Number(qtyValue) }
//       );

//       setSkuProduct(res.data);
//       setQtyValue("");
//       onUpdated && onUpdated();
//     } catch (err) {
//       setError("Add qty failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // REMOVE QTY
//   const handleRemoveQty = async () => {
//     setError("");
//     if (!validateQty()) return;

//     if (Number(qtyValue) > skuProduct.Qty) {
//       setError("Removing Qty cannot be greater than current stock");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.put(
//         "http://localhost:7000/api/products/update-qty-sku",
//         { sku: skuProduct.sku, removeQty: Number(qtyValue) }
//       );

//       setSkuProduct(res.data);
//       setQtyValue("");
//       onUpdated && onUpdated();
//     } catch (err) {
//       setError("Remove qty failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validateQty = () => {
//     if (!skuProduct) {
//       setError("Fetch a product first");
//       return false;
//     }
//     if (!qtyValue || Number(qtyValue) <= 0) {
//       setError("Enter a valid quantity (> 0)");
//       return false;
//     }
//     return true;
//   };

//   const reset = () => {
//     setSku("");
//     setSkuProduct(null);
//     setQtyValue("");
//     setError("");
//   };

//   return (
//     <div style={{ marginBottom: 20 }}>
//       {/* ⭐ SHOW/HIDE BUTTON */}
//       <button
//         onClick={() => setShowForm(!showForm)}
//         style={{
//           padding: "10px 16px",
//           backgroundColor: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           borderRadius: 8,
//           cursor: "pointer",
//           marginBottom: 10,
//         }}
//       >
//         {showForm ? "Hide Update Form" : "Update Qty by SKU"}
//       </button>

//       {/* ⭐ IF showForm = TRUE → FORM SHOW, ELSE HIDE */}
//       {showForm && (
//         <div
//           style={{
//             padding: "16px",
//             border: "1px solid #1976D2",
//             borderRadius: 10,
//             maxWidth: 420,
//           }}
//         >
//           <h3 style={{ marginTop: 0 }}>Update Product Qty by SKU</h3>

//           <input
//             placeholder="Enter SKU (e.g. CT-DC-BL-1-32-0010)"
//             value={sku}
//             onChange={(e) => setSku(e.target.value)}
//             style={{
//               padding: 8,
//               width: "100%",
//               marginBottom: 10,
//               borderRadius: 6,
//               border: "1px solid #ccc",
//             }}
//           />

//           <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
//             <button onClick={fetchBySku} style={btnStyle} disabled={loading}>
//               {loading ? "Fetching..." : "Fetch Product"}
//             </button>
//             <button
//               onClick={reset}
//               style={{ ...btnStyle, backgroundColor: "#E53935" }}
//               disabled={loading}
//             >
//               Add New
//             </button>
//           </div>

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           {skuProduct && (
//             <div
//               style={{
//                 marginTop: 10,
//                 borderTop: "1px dashed #ccc",
//                 paddingTop: 10,
//               }}
//             >
//               <p>
//                 <b>Name:</b> {skuProduct.name}
//               </p>
//               <p>
//                 <b>Category:</b> {skuProduct.category}
//               </p>
//               <p>
//                 <b>Color:</b> {skuProduct.color}
//               </p>
//               <p>
//                 <b>Size:</b> {skuProduct.size}
//               </p>
//               <p>
//                 <b>SKU:</b> {skuProduct.sku}
//               </p>
//               <p>
//                 <b>Current Qty:</b> {skuProduct.Qty}
//               </p>

//               <input
//                 type="number"
//                 placeholder="Enter Qty"
//                 value={qtyValue}
//                 onChange={(e) => setQtyValue(e.target.value)}
//                 style={{
//                   padding: 8,
//                   width: "100%",
//                   marginBottom: 10,
//                   borderRadius: 6,
//                   border: "1px solid #ccc",
//                 }}
//               />

//               <div style={{ display: "flex", gap: 8 }}>
//                 <button onClick={handleAddQty} style={btnStyle} disabled={loading}>
//                   + Add Qty
//                 </button>

//                 <button
//                   onClick={handleRemoveQty}
//                   style={{ ...btnStyle, backgroundColor: "#D84315" }}
//                   disabled={loading}
//                 >
//                   - Remove Qty
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// const btnStyle = {
//   padding: "8px 12px",
//   backgroundColor: "#1976D2",
//   color: "#fff",
//   border: "none",
//   borderRadius: 6,
//   cursor: "pointer",
// };
























import React, { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function SkuUpdate({ onUpdated, prefillProduct }) {
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState("");
  const [action, setAction] = useState("add"); 
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const targetSku = prefillProduct ? prefillProduct.sku : sku;

    if (!targetSku) return toast.error("SKU is missing");
    if (!qty || Number(qty) <= 0) return toast.error("Enter valid quantity");

    setLoading(true);

    try {
      const payload = { sku: targetSku };
      if (action === "add") payload.addedQty = Number(qty);
      else payload.removeQty = Number(qty);

      await api.put("/products/update-qty-sku", payload);
      toast.success(`Stock ${action === "add" ? "Added" : "Removed"} Successfully!`);
      
      setQty("");
      if (!prefillProduct) setSku("");
      if (onUpdated) onUpdated();

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      
      {/* HEADER */}
      {prefillProduct ? (
        <div style={styles.header}>
           <span style={{color: "#666", fontSize: "12px"}}>Update Stock:</span>
           <h5 style={{margin: "2px 0", color: "#1976D2", fontSize: "14px"}}>{prefillProduct.name}</h5>
           <span style={{fontSize: "12px", color: "#333"}}>
             Current: <b>{prefillProduct.Qty}</b>
           </span>
        </div>
      ) : (
        <input
          type="text"
          placeholder="Enter SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          style={styles.input}
        />
      )}

      {/* COMPACT FORM */}
      <form onSubmit={handleUpdate} style={styles.form}>
        
        <div style={styles.row}>
          {/* Action Select */}
          <select 
            value={action} 
            onChange={(e) => setAction(e.target.value)}
            style={styles.select}
          >
            <option value="add">➕ Add</option>
            <option value="remove">➖ Remove</option>
          </select>

          {/* Quantity Input */}
          <input
            type="number"
            placeholder="Qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={styles.inputQty}
            min="1"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} 
          style={action === 'add' ? styles.addBtn : styles.removeBtn}
        >
          {loading ? "..." : (action === 'add' ? "Update" : "Update")}
        </button>

      </form>
    </div>
  );
}

// ✨ UPDATED COMPACT STYLES
const styles = {
  card: {
    padding: "5px", // Kam kiya
    backgroundColor: "#fff",
    borderRadius: "8px",
    fontFamily: "'Segoe UI', sans-serif",
    border: "1px solid #e0e0e0",
    maxWidth: "100%", // Parent container ke hisaab se fit hoga
  },
  header: {
    marginBottom: "10px",
    paddingBottom: "8px",
    borderBottom: "1px dashed #e0e0e0"
  },
  
  // 🔹 Sleek Inputs
  input: {
    width: "100%", 
    padding: "8px", // 10px se 8px kiya
    marginBottom: "8px", 
    borderRadius: "4px", 
    border: "1px solid #ccc", 
    fontSize: "13px", // Font chota kiya
    outline: "none"
  },
  
  form: { display: "flex", flexDirection: "column", gap: "8px" },
  row: { display: "flex", gap: "8px" },
  
  select: {
    flex: "1", 
    padding: "6px 8px", // Padding kam ki
    borderRadius: "4px", 
    border: "1px solid #ccc", 
    backgroundColor: "#f9f9f9", 
    cursor: "pointer",
    fontSize: "13px",
    outline: "none"
  },
  
  inputQty: {
    flex: "0.4", // Width thodi kam ki
    padding: "6px 8px", // Padding kam ki
    borderRadius: "4px", 
    border: "1px solid #ccc", 
    textAlign: "center",
    fontSize: "13px",
    outline: "none"
  },
  
  // 🔹 Buttons Chote kiye
  addBtn: {
    padding: "8px", // 12px se 8px kiya
    borderRadius: "4px", 
    border: "none", 
    backgroundColor: "#2e7d32", 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: "13px",
    cursor: "pointer", 
    width: "100%"
  },
  removeBtn: {
    padding: "8px",
    borderRadius: "4px", 
    border: "none", 
    backgroundColor: "#c62828", 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: "13px",
    cursor: "pointer", 
    width: "100%"
  }
};