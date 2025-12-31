// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BarcodeGenPage = () => {
//   const { sku } = useParams(); // URL se SKU nikalenge
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const generateBarcode = async () => {
//       try {
//         // Backend API call to generate and save barcode
//         const res = await axios.post(
//           `http://localhost:7000/api/products/generate-barcode/${sku}`,
//           {},
//           { withCredentials: true }
//         );
//         setProduct(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to generate barcode.");
//         setLoading(false);
//       }
//     };

//     if (sku) {
//       generateBarcode();
//     }
//   }, [sku]);

//   if (loading) return <h2>Generating Barcode... ⏳</h2>;
//   if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h1>Product Created Successfully! ✅</h1>

//       <div style={{ margin: "30px auto", border: "1px solid #ccc", padding: "20px", maxWidth: "400px", borderRadius: "10px" }}>
//         <h3>{product?.name}</h3>
//         <p><strong>SKU:</strong> {product?.sku}</p>

//         {/* BARCODE IMAGE */}
//         {product?.barcodeImg && (
//           <div>
//             <img
//               src={product.barcodeImg}
//               alt="Barcode"
//               style={{ width: "100%", maxWidth: "300px", height: "auto" }}
//             />
//             <br />
//             <a
//               href={product.barcodeImg}
//               download
//               target="_blank"
//               rel="noreferrer"
//               style={{ display: "inline-block", marginTop: "10px", color: "blue", textDecoration: "underline" }}
//             >
//               Download / Print Barcode
//             </a>
//           </div>
//         )}
//       </div>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "15px",
//           marginTop: "20px"
//         }}
//       >
//         <button
//           onClick={() => navigate("/dashboard")}
//           style={{
//             padding: "10px 20px",
//             background: "#1976D2",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer"
//           }}
//         >
//           Go to Dashboard
//         </button>

//         <button
//           onClick={() => navigate("/add-product")}
//           style={{
//             padding: "10px 20px",
//             background: "#19d251ff",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer"
//           }}
//         >
//           Add new Product
//         </button>
//       </div>


//     </div>
//   );
// };

// export default BarcodeGenPage;

























import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header"; // ✅ Header Import
import toast from "react-hot-toast";

const BarcodeGenPage = () => {
  const { sku } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateBarcode = async () => {
      try {
        const res = await axios.post(
          `http://localhost:7000/api/products/generate-barcode/${sku}`,
          {},
          { withCredentials: true }
        );
        setProduct(res.data);
        setLoading(false);
        toast.success("Barcode Generated!");
      } catch (err) {
        console.error(err);
        setError("Failed to generate barcode.");
        setLoading(false);
      }
    };

    if (sku) {
      generateBarcode();
    }
  }, [sku]);

  // --- DOWNLOAD HELPER ---
  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "barcode.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      toast.error("Failed to download image");
    }
  };

  if (loading) return (
    <div style={styles.container}>
        <Header />
        <div style={styles.centerBox}>
            <h2 style={{color: "#64748b"}}>Generating Barcode... ⏳</h2>
        </div>
    </div>
  );

  if (error) return (
    <div style={styles.container}>
        <Header />
        <div style={styles.centerBox}>
            <h2 style={{ color: "#ef4444" }}>{error}</h2>
            <button onClick={() => navigate("/dashboard")} style={styles.secondaryBtn}>Go Home</button>
        </div>
    </div>
  );

  return (
    <div style={styles.container}>
      
      {/* ✅ HEADER ADDED */}
      <Header />

      <div style={styles.mainContent}>
        
        <div style={styles.card}>
            {/* Success Icon/Title */}
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
                <div style={{fontSize: '50px', marginBottom: '10px'}}>✅</div>
                <h1 style={styles.title}>Product Created Successfully!</h1>
                <p style={styles.subtitle}>The product has been added to inventory.</p>
            </div>

            {/* Product Details Box */}
            <div style={styles.detailsBox}>
                <h3 style={styles.productName}>{product?.name}</h3>
                <span style={styles.skuBadge}>SKU: {product?.sku}</span>

                {/* BARCODE IMAGE */}
                {product?.barcodeImg && (
                    <div style={{marginTop: '20px', textAlign: 'center'}}>
                        <img
                            src={product.barcodeImg}
                            alt="Barcode"
                            style={styles.barcodeImg}
                        />
                        
                        <button 
                            onClick={() => downloadImage(product.barcodeImg, `${product.sku}-barcode.jpg`)}
                            style={styles.downloadBtn}
                        >
                            📥 Download / Print Barcode
                        </button>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div style={styles.buttonGroup}>
                <button
                    onClick={() => navigate("/dashboard")}
                    style={styles.primaryBtn}
                >
                    Go to Dashboard
                </button>

                <button
                    onClick={() => navigate("/add-product")}
                    style={styles.secondaryBtn}
                >
                    ➕ Add Another Product
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

// ✨ STYLES
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Vertically center the card
    flex: 1,
    padding: "20px",
  },
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  
  // Card Style
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    border: "1px solid #e2e8f0",
  },
  
  title: { margin: "0", color: "#166534", fontSize: "24px", fontWeight: "700" },
  subtitle: { margin: "5px 0 0 0", color: "#64748b", fontSize: "14px" },

  detailsBox: {
    backgroundColor: "#f8fafc",
    padding: "20px",
    borderRadius: "12px",
    border: "1px dashed #cbd5e1",
    margin: "25px 0",
  },
  productName: { margin: "0 0 5px 0", fontSize: "18px", color: "#1e293b", fontWeight: "700" },
  skuBadge: { 
    fontSize: "13px", color: "#475569", backgroundColor: "#e2e8f0", 
    padding: "3px 8px", borderRadius: "4px", fontWeight: "600" 
  },
  barcodeImg: { width: "100%", maxWidth: "250px", height: "auto", display: "block", margin: "0 auto" },
  
  downloadBtn: {
    marginTop: "15px",
    background: "transparent",
    color: "#2563eb",
    border: "1px solid #2563eb",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "0.2s"
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  primaryBtn: {
    padding: "12px 20px",
    background: "#1e293b", // Dark Blue/Grey
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    flex: 1,
    minWidth: "140px"
  },
  secondaryBtn: {
    padding: "12px 20px",
    background: "#16a34a", // Green
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    flex: 1,
    minWidth: "140px"
  }
};

export default BarcodeGenPage;