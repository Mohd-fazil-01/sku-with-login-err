// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ProductForm({ onSubmit, initialData, onCancel }) {
//   const [sizeValue, setSizeValue] = useState("");
//   const [sizeUnit, setSizeUnit] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Die-cast",
//     color: "Black",
//     size: "",
//     img: "",
//     price: "",
//     costing_price: "",
//     Supplier_name: "",
//     Qty: 0,
//   });

//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Prefill when editing product
//   useEffect(() => {
//     if (initialData) {
//       setFormData({ ...initialData });

//       // Split size like "30 cm"
//       const parts = (initialData.size || "").split(" ");
//       if (parts.length === 2) {
//         setSizeValue(parts[0]);
//         setSizeUnit(parts[1]);
//       }
//       setPreview(initialData.img || "");
//     }
//   }, [initialData]);

//   // Reset size when category changes
//   useEffect(() => {
//     setFormData((prev) => ({ ...prev, size: "" }));
//     setSizeValue("");
//     setSizeUnit("");
//   }, [formData.category]);

//   // Normal fields update
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Image select + instant upload to Cloudinary
//   const handleImageSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     // Show instant preview
//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);

//     try {
//       const imgData = new FormData();
//       imgData.append("image", file);


//       const res = await axios.post(
//         "http://localhost:7000/api/products/upload",
//         imgData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true, // 👈 MOST IMPORTANT
//         }
//       );


//       if (!res.data.url) throw new Error("Upload failed");

//       setFormData((p) => ({ ...p, img: res.data.url }));
//     } catch (err) {
//       console.error("Upload Error:", err);
//       alert("Image upload failed");
//     }

//     setUploading(false);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.img) {
//       return alert("Please upload an image before submitting.");
//     }

//     let finalSize = "";

//     // DIE-CAST / REMOTE CONTROL / SCOOTER
//     if (
//       formData.category === "Die-cast" ||
//       formData.category === "Remote Control" ||
//       formData.category === "Scooter"
//     ) {
//       if (!formData.size) {
//         return alert("Please select a size.");
//       }
//       finalSize = formData.size;
//     }

//     // SOFT TOY / BOARD GAME
//     if (formData.category === "Soft Toy" || formData.category === "Board Game") {
//       if (!sizeValue || !sizeUnit) {
//         return alert("Please enter size value AND select a unit.");
//       }
//       finalSize = `${sizeValue} ${sizeUnit}`;
//     }

//     const finalData = {
//       ...formData,
//       size: finalSize,
//       price: Number(formData.price),
//       costing_price: Number(formData.costing_price),
//       gst: Number(formData.gst),
//       Qty: Number(formData.Qty),
//     };

//     onSubmit(finalData);
//   };




//   useEffect(() => {
//     if (formData.category === "Soft Toy" || formData.category === "Board Game") {
//       if (sizeValue && sizeUnit) {
//         setFormData((prev) => ({
//           ...prev,
//           size: `${sizeValue} ${sizeUnit}`,
//         }));
//       } else {
//         setFormData((prev) => ({ ...prev, size: "" }));
//       }
//     }
//   }, [sizeValue, sizeUnit, formData.category]);

//   const inputStyle = {
//     height: "35px",
//     padding: "8px 10px",
//     marginBottom: "15px",
//     width: "100%",
//     maxWidth: "400px",
//     border: "1.5px solid #ccc",
//     borderRadius: "8px",
//   };

//   const labelStyle = { fontWeight: "600", marginBottom: "5px", display: "block" };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>

//       <label style={labelStyle}>Product Name:</label>
//       <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />

//       <label style={labelStyle}>Description:</label>
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         style={{ ...inputStyle, height: "80px" }}
//       />

//       <label style={labelStyle}>Category:</label>
//       <select
//         name="category"
//         value={formData.category}
//         onChange={handleChange}
//         style={inputStyle}
//       >
//         <option value="Die-cast">Die-cast</option>
//         <option value="Remote Control">Remote Control</option>
//         <option value="Soft Toy">Soft Toy</option>
//         <option value="Board Game">Board Game</option>
//         <option value="Scooter">Scooter</option>
//       </select>

//       {/* Size Logic */}
//       <label style={labelStyle}>Size:</label>

//       {(formData.category === "Die-cast" || formData.category === "Remote Control") && (
//         <select name="size" value={formData.size} onChange={handleChange} style={inputStyle}>
//           <option value="1:12">1:12</option>
//           <option value="1:19">1:19</option>
//           <option value="1:20">1:20</option>
//           <option value="1:24">1:24</option>
//           <option value="1:32">1:32</option>
//         </select>
//       )}

//       {formData.category === "Scooter" && (
//         <select name="size" value={formData.size} onChange={handleChange} style={inputStyle}>
//           <option value="S">S</option>
//           <option value="M">M</option>
//           <option value="L">L</option>
//           <option value="XL">XL</option>
//         </select>
//       )}

//       {(formData.category === "Soft Toy" || formData.category === "Board Game") && (
//         <div style={{ display: "flex", gap: "10px" }}>
//           <input
//             type="number"
//             placeholder="Enter size"
//             value={sizeValue}
//             onChange={(e) => setSizeValue(e.target.value)}
//             style={{ ...inputStyle, width: "60%" }}
//           />
//           <select
//             value={sizeUnit}
//             onChange={(e) => setSizeUnit(e.target.value)}
//             style={{ ...inputStyle, width: "40%" }}
//           >
//             <option value="">Unit</option>
//             <option value="cm">cm</option>
//             <option value="inch">inch</option>
//           </select>
//         </div>
//       )}

//       <label style={labelStyle}>Product Image:</label>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageSelect}
//         style={inputStyle}
//         disabled={uploading}
//       />
//       {preview && (
//         <img
//           src={preview}
//           width="140"
//           style={{ borderRadius: "6px", marginTop: "10px" }}
//         />
//       )}
//       {uploading && <p style={{ color: "orange" }}>Uploading...</p>}

//       <label style={labelStyle}>Price:</label>
//       <input
//         name="price"
//         type="number"
//         value={formData.price}
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />
//       <label style={labelStyle}>Cost Price (CP):</label>
//       <input
//         name="costing_price"
//         type="number"
//         value={formData.costing_price}
//         onChange={handleChange}
//         required
//         style={inputStyle}
//       />
//       <label style={labelStyle}>GST:</label>
//       <select
//         name="gst"
//         value={formData.gst || ""}
//         onChange={handleChange}
//         style={{ ...inputStyle, width: "100%" }}
//         required
//       >
//         <option value="">GST %</option>
//         <option value="0">0%</option>
//         <option value="5">5%</option>
//         <option value="12">12%</option>
//         <option value="18">18%</option>
//         <option value="28">28%</option>
//       </select>


//       <label style={labelStyle}>Supplier Name:</label>
//       <input
//         name="Supplier_name"
//         value={formData.Supplier_name}
//         onChange={handleChange}
//         style={inputStyle}
//         required
//       />

//       <label style={labelStyle}>Quantity (Qty):</label>
//       <input
//         name="Qty"
//         type="number"
//         min="0"
//         value={formData.Qty}
//         onChange={handleChange}
//         style={inputStyle}
//         required
//       />

//       <div style={{ marginTop: "20px" }}>
//         <button
//           type="submit"
//           disabled={submitting}
//           style={{
//             padding: "10px 20px",
//             background: submitting ? "gray" : "#1976D2",
//             color: "#fff",
//             borderRadius: "8px",
//           }}
//         >
//           {submitting
//             ? "Submitting..."
//             : initialData
//               ? "Update Product"
//               : "Add Product & Generate SKU"}
//         </button>

//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             style={{
//               padding: "10px 20px",
//               background: "#E53935",
//               color: "#fff",
//               borderRadius: "8px",
//               marginLeft: 10,
//             }}
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }

// export default ProductForm;








// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ProductForm({ onSubmit, initialData, onCancel }) {
//   const [sizeValue, setSizeValue] = useState("");
//   const [sizeUnit, setSizeUnit] = useState("");
//   const [preview, setPreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Die-cast",
//     color: "Black",
//     size: "",
//     img: "",
//     price: "",
//     costing_price: "",
//     Supplier_name: "",
//     gst: "",
//     Qty: 0,
//   });

//   // Prefill Data (Edit Mode)
//   useEffect(() => {
//     if (initialData) {
//       setFormData({ ...initialData });
//       const parts = (initialData.size || "").split(" ");
//       if (parts.length === 2) {
//         setSizeValue(parts[0]);
//         setSizeUnit(parts[1]);
//       }
//       setPreview(initialData.img || "");
//     }
//   }, [initialData]);

//   // Reset Size on Category Change
//   useEffect(() => {
//     setFormData((prev) => ({ ...prev, size: "" }));
//     setSizeValue("");
//     setSizeUnit("");
//   }, [formData.category]);

//   // Handle Input Changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Image Upload Logic
//   const handleImageSelect = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);

//     try {
//       const imgData = new FormData();
//       imgData.append("image", file);

//       const res = await axios.post(
//         "http://localhost:7000/api/products/upload",
//         imgData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (!res.data.url) throw new Error("Upload failed");
//       setFormData((p) => ({ ...p, img: res.data.url }));
//     } catch (err) {
//       console.error("Upload Error:", err);
//       alert("Image upload failed");
//     }
//     setUploading(false);
//   };

//   // Submit Logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.img) return alert("Please upload an image before submitting.");

//     let finalSize = "";
//     if (["Die-cast", "Remote Control", "Scooter"].includes(formData.category)) {
//       if (!formData.size) return alert("Please select a size.");
//       finalSize = formData.size;
//     }
//     if (["Soft Toy", "Board Game"].includes(formData.category)) {
//       if (!sizeValue || !sizeUnit) return alert("Enter size value AND unit.");
//       finalSize = `${sizeValue} ${sizeUnit}`;
//     }

//     setSubmitting(true);
//     const finalData = {
//       ...formData,
//       size: finalSize,
//       price: Number(formData.price),
//       costing_price: Number(formData.costing_price),
//       gst: Number(formData.gst),
//       Qty: Number(formData.Qty),
//     };

//     await onSubmit(finalData);
//     setSubmitting(false);
//   };

//   // Update Size for Manual Inputs
//   useEffect(() => {
//     if (["Soft Toy", "Board Game"].includes(formData.category)) {
//       if (sizeValue && sizeUnit) {
//         setFormData((prev) => ({ ...prev, size: `${sizeValue} ${sizeUnit}` }));
//       }
//     }
//   }, [sizeValue, sizeUnit, formData.category]);

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* --- Section 1: Basic Info --- */}
//       <h3 style={styles.sectionTitle}>Basic Information</h3>
//       <div style={styles.gridContainer}>
//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Product Name</label>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             style={styles.input}
//             placeholder="e.g. Red Ferrari Die-cast"
//             required
//           />
//         </div>

//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             style={{ ...styles.input, height: "100px", resize: "vertical" }}
//             placeholder="Product details..."
//           />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Category</label>
//           <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
//             <option value="Die-cast">Die-cast</option>
//             <option value="Remote Control">Remote Control</option>
//             <option value="Soft Toy">Soft Toy</option>
//             <option value="Board Game">Board Game</option>
//             <option value="Scooter">Scooter</option>
//           </select>
//         </div>

//         {/* Dynamic Size Section */}
//         <div style={styles.gridItem}>
//           <label style={styles.label}>Size / Scale</label>
//           {(formData.category === "Die-cast" || formData.category === "Remote Control") && (
//             <select name="size" value={formData.size} onChange={handleChange} style={styles.input}>
//               <option value="">Select Scale</option>
//               <option value="1:12">1:12</option>
//               <option value="1:19">1:19</option>
//               <option value="1:20">1:20</option>
//               <option value="1:24">1:24</option>
//               <option value="1:32">1:32</option>
//             </select>
//           )}

//           {formData.category === "Scooter" && (
//             <select name="size" value={formData.size} onChange={handleChange} style={styles.input}>
//                <option value="">Select Size</option>
//               <option value="S">S</option>
//               <option value="M">M</option>
//               <option value="L">L</option>
//               <option value="XL">XL</option>
//             </select>
//           )}

//           {["Soft Toy", "Board Game"].includes(formData.category) && (
//             <div style={{ display: "flex", gap: "10px" }}>
//               <input
//                 type="number"
//                 placeholder="Value"
//                 value={sizeValue}
//                 onChange={(e) => setSizeValue(e.target.value)}
//                 style={{ ...styles.input, flex: 2 }}
//               />
//               <select
//                 value={sizeUnit}
//                 onChange={(e) => setSizeUnit(e.target.value)}
//                 style={{ ...styles.input, flex: 1 }}
//               >
//                 <option value="">Unit</option>
//                 <option value="cm">cm</option>
//                 <option value="inch">inch</option>
//               </select>
//             </div>
//           )}
//         </div>
//       </div>

//       <hr style={styles.divider} />

//       {/* --- Section 2: Image Upload --- */}
//       <h3 style={styles.sectionTitle}>Product Image</h3>
//       <div style={styles.imageUploadBox}>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageSelect}
//           style={styles.fileInput}
//           disabled={uploading}
//         />
//         {preview ? (
//           <div style={{ textAlign: "center" }}>
//             <img src={preview} alt="Preview" style={styles.previewImage} />
//             <p style={{ fontSize: "12px", color: "#2563eb", marginTop: "5px" }}>
//               {uploading ? "Uploading..." : "Click to change image"}
//             </p>
//           </div>
//         ) : (
//           <div style={{ padding: "20px", color: "#6b7280" }}>
//             <p>📂 Click to upload product image</p>
//           </div>
//         )}
//       </div>

//       <hr style={styles.divider} />

//       {/* --- Section 3: Pricing & Inventory --- */}
//       <h3 style={styles.sectionTitle}>Pricing & Inventory</h3>
//       <div style={styles.gridContainer}>
//         <div style={styles.gridItem}>
//           <label style={styles.label}>Selling Price (₹)</label>
//           <input
//             name="price"
//             type="number"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Cost Price (₹)</label>
//           <input
//             name="costing_price"
//             type="number"
//             value={formData.costing_price}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>GST (%)</label>
//           <select name="gst" value={formData.gst} onChange={handleChange} style={styles.input} required>
//             <option value="">Select GST</option>
//             <option value="0">0%</option>
//             <option value="5">5%</option>
//             <option value="12">12%</option>
//             <option value="18">18%</option>
//             <option value="28">28%</option>
//           </select>
//         </div>

//         <div style={styles.gridItem}>
//           <label style={styles.label}>Quantity</label>
//           <input
//             name="Qty"
//             type="number"
//             min="0"
//             value={formData.Qty}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//         </div>

//         <div style={styles.gridItemFull}>
//           <label style={styles.label}>Supplier Name</label>
//           <input
//             name="Supplier_name"
//             value={formData.Supplier_name}
//             onChange={handleChange}
//             style={styles.input}
//             required
//           />
//         </div>
//       </div>

//       {/* --- Actions --- */}
//       <div style={styles.actionButtons}>
//         <button type="submit" disabled={submitting} style={styles.submitBtn}>
//           {submitting ? "Processing..." : initialData ? "Update Product" : "Save Product"}
//         </button>
//         {onCancel && (
//           <button type="button" onClick={onCancel} style={styles.cancelBtn}>
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }

// // Professional CSS Styles
// const styles = {
//   sectionTitle: { fontSize: "18px", fontWeight: "600", color: "#374151", marginBottom: "15px" },
//   divider: { border: "0", borderTop: "1px solid #e5e7eb", margin: "25px 0" },
  
//   // Grid System for Form
//   gridContainer: { display: "flex", flexWrap: "wrap", gap: "20px" },
//   gridItem: { flex: "1 1 45%", minWidth: "250px" }, // Two columns
//   gridItemFull: { flex: "1 1 100%" }, // Full width

//   label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" },
//   input: {
//     width: "100%",
//     padding: "10px 12px",
//     fontSize: "15px",
//     borderRadius: "6px",
//     border: "1px solid #d1d5db",
//     outline: "none",
//     boxSizing: "border-box",
//     transition: "border-color 0.2s",
//   },
  
//   // Image Upload Box
//   imageUploadBox: {
//     border: "2px dashed #d1d5db",
//     borderRadius: "8px",
//     padding: "20px",
//     textAlign: "center",
//     position: "relative",
//     cursor: "pointer",
//     backgroundColor: "#f9fafb",
//   },
//   fileInput: {
//     position: "absolute",
//     top: 0, left: 0,
//     width: "100%", height: "100%",
//     opacity: 0,
//     cursor: "pointer",
//   },
//   previewImage: { maxWidth: "150px", maxHeight: "150px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },

//   // Buttons
//   actionButtons: { display: "flex", gap: "15px", marginTop: "30px", justifyContent: "flex-end" },
//   submitBtn: {
//     padding: "12px 24px",
//     backgroundColor: "#1976D2",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
//   cancelBtn: {
//     padding: "12px 24px",
//     backgroundColor: "#fff",
//     color: "#d32f2f",
//     border: "1px solid #d32f2f",
//     borderRadius: "6px",
//     fontSize: "15px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
// };

// export default ProductForm;






















import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductForm({ onSubmit, initialData, onCancel }) {
  const [sizeValue, setSizeValue] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Die-cast",
    color: "Black", // Default value
    size: "",
    img: "",
    price: "",
    costing_price: "",
    Supplier_name: "",
    gst: "",
    Qty: 0,
  });

  // Backend SKU generator ke hisab se colors list
  const colorOptions = [
  "Black", "White", "Red", "Blue", "Green", 
  "Yellow", "Orange", "Brown", "Grey", "Pink",
  "Purple", "Silver", "Gold", "Beige", "Maroon",
  "Navy", "Teal", "Cream", "Violet", "Multicolor"
];

  // Prefill Data (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
      const parts = (initialData.size || "").split(" ");
      if (parts.length === 2) {
        setSizeValue(parts[0]);
        setSizeUnit(parts[1]);
      }
      setPreview(initialData.img || "");
    }
  }, [initialData]);

  // Reset Size on Category Change
  useEffect(() => {
    setFormData((prev) => ({ ...prev, size: "" }));
    setSizeValue("");
    setSizeUnit("");
  }, [formData.category]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Image Upload Logic
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const imgData = new FormData();
      imgData.append("image", file);

      const res = await axios.post(
        "http://localhost:7000/api/products/upload",
        imgData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (!res.data.url) throw new Error("Upload failed");
      setFormData((p) => ({ ...p, img: res.data.url }));
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Image upload failed");
    }
    setUploading(false);
  };

  // Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.img) return alert("Please upload an image before submitting.");

    let finalSize = "";
    if (["Die-cast", "Remote Control", "Scooter"].includes(formData.category)) {
      if (!formData.size) return alert("Please select a size.");
      finalSize = formData.size;
    }
    if (["Soft Toy", "Board Game"].includes(formData.category)) {
      if (!sizeValue || !sizeUnit) return alert("Enter size value AND unit.");
      finalSize = `${sizeValue} ${sizeUnit}`;
    }

    setSubmitting(true);
    const finalData = {
      ...formData,
      size: finalSize,
      price: Number(formData.price),
      costing_price: Number(formData.costing_price),
      gst: Number(formData.gst),
      Qty: Number(formData.Qty),
    };

    await onSubmit(finalData);
    setSubmitting(false);
  };

  // Update Size for Manual Inputs
  useEffect(() => {
    if (["Soft Toy", "Board Game"].includes(formData.category)) {
      if (sizeValue && sizeUnit) {
        setFormData((prev) => ({ ...prev, size: `${sizeValue} ${sizeUnit}` }));
      }
    }
  }, [sizeValue, sizeUnit, formData.category]);

  return (
    <form onSubmit={handleSubmit}>
      {/* --- Section 1: Basic Info --- */}
      <h3 style={styles.sectionTitle}>Basic Information</h3>
      <div style={styles.gridContainer}>
        <div style={styles.gridItemFull}>
          <label style={styles.label}>Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="e.g. Red Ferrari Die-cast"
            required
          />
        </div>

        <div style={styles.gridItemFull}>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ ...styles.input, height: "100px", resize: "vertical" }}
            placeholder="Product details..."
          />
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} style={styles.input}>
            <option value="Die-cast">Die-cast</option>
            <option value="Remote Control">Remote Control</option>
            <option value="Soft Toy">Soft Toy</option>
            <option value="Board Game">Board Game</option>
            <option value="Scooter">Scooter</option>
          </select>
        </div>

        {/* ✅ NEW: Color Dropdown Added Here */}
        <div style={styles.gridItem}>
          <label style={styles.label}>Color</label>
          <select 
            name="color" 
            value={formData.color} 
            onChange={handleChange} 
            style={styles.input}
          >
            {colorOptions.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Size Section */}
        <div style={styles.gridItem}>
          <label style={styles.label}>Size / Scale</label>
          {(formData.category === "Die-cast" || formData.category === "Remote Control") && (
            <select name="size" value={formData.size} onChange={handleChange} style={styles.input}>
              <option value="">Select Scale</option>
              <option value="1:12">1:12</option>
              <option value="1:19">1:19</option>
              <option value="1:20">1:20</option>
              <option value="1:24">1:24</option>
              <option value="1:32">1:32</option>
            </select>
          )}

          {formData.category === "Scooter" && (
            <select name="size" value={formData.size} onChange={handleChange} style={styles.input}>
               <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          )}

          {["Soft Toy", "Board Game"].includes(formData.category) && (
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="number"
                placeholder="Value"
                value={sizeValue}
                onChange={(e) => setSizeValue(e.target.value)}
                style={{ ...styles.input, flex: 2 }}
              />
              <select
                value={sizeUnit}
                onChange={(e) => setSizeUnit(e.target.value)}
                style={{ ...styles.input, flex: 1 }}
              >
                <option value="">Unit</option>
                <option value="cm">cm</option>
                <option value="inch">inch</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* --- Section 2: Image Upload --- */}
      <h3 style={styles.sectionTitle}>Product Image</h3>
      <div style={styles.imageUploadBox}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={styles.fileInput}
          disabled={uploading}
        />
        {preview ? (
          <div style={{ textAlign: "center" }}>
            <img src={preview} alt="Preview" style={styles.previewImage} />
            <p style={{ fontSize: "12px", color: "#2563eb", marginTop: "5px" }}>
              {uploading ? "Uploading..." : "Click to change image"}
            </p>
          </div>
        ) : (
          <div style={{ padding: "20px", color: "#6b7280" }}>
            <p>📂 Click to upload product image</p>
          </div>
        )}
      </div>

      <hr style={styles.divider} />

      {/* --- Section 3: Pricing & Inventory --- */}
      <h3 style={styles.sectionTitle}>Pricing & Inventory</h3>
      <div style={styles.gridContainer}>
        <div style={styles.gridItem}>
          <label style={styles.label}>Selling Price (₹)</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>Cost Price (₹)</label>
          <input
            name="costing_price"
            type="number"
            value={formData.costing_price}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>GST (%)</label>
          <select name="gst" value={formData.gst} onChange={handleChange} style={styles.input} required>
            <option value="">Select GST</option>
            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </div>

        <div style={styles.gridItem}>
          <label style={styles.label}>Quantity</label>
          <input
            name="Qty"
            type="number"
            min="0"
            value={formData.Qty}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.gridItemFull}>
          <label style={styles.label}>Supplier Name</label>
          <input
            name="Supplier_name"
            value={formData.Supplier_name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
      </div>

      {/* --- Actions --- */}
      <div style={styles.actionButtons}>
        <button type="submit" disabled={submitting} style={styles.submitBtn}>
          {submitting ? "Processing..." : initialData ? "Update Product" : "Save Product"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// Professional CSS Styles
const styles = {
  sectionTitle: { fontSize: "18px", fontWeight: "600", color: "#374151", marginBottom: "15px" },
  divider: { border: "0", borderTop: "1px solid #e5e7eb", margin: "25px 0" },
  
  // Grid System for Form
  gridContainer: { display: "flex", flexWrap: "wrap", gap: "20px" },
  gridItem: { flex: "1 1 45%", minWidth: "250px" }, // Two columns
  gridItemFull: { flex: "1 1 100%" }, // Full width

  label: { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  
  // Image Upload Box
  imageUploadBox: {
    border: "2px dashed #d1d5db",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    position: "relative",
    cursor: "pointer",
    backgroundColor: "#f9fafb",
  },
  fileInput: {
    position: "absolute",
    top: 0, left: 0,
    width: "100%", height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  previewImage: { maxWidth: "150px", maxHeight: "150px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },

  // Buttons
  actionButtons: { display: "flex", gap: "15px", marginTop: "30px", justifyContent: "flex-end" },
  submitBtn: {
    padding: "12px 24px",
    backgroundColor: "#1976D2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "12px 24px",
    backgroundColor: "#fff",
    color: "#d32f2f",
    border: "1px solid #d32f2f",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default ProductForm;