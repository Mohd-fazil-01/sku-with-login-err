// import React, { useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function PieChartFilter({ data }) {
//   const [filterBy, setFilterBy] = useState("category");

//   // 🔹 Grouping function
//   const groupData = (key) => {
//     const result = {};
//     data.forEach((item) => {
//       if (!result[item[key]]) result[item[key]] = 0;
//       result[item[key]] += item.Qty;
//     });
//     return result;
//   };

//   const finalData = groupData(filterBy);

//   return (
//     <div style={{ width: "400px" }}>
//       <h3>Pie Chart — {filterBy.toUpperCase()}</h3>

//       {/* 🔹 Dropdown */}
//       <select
//         value={filterBy}
//         onChange={(e) => setFilterBy(e.target.value)}
//         style={{ marginBottom: "10px", padding: "5px" }}
//       >
//         <option value="category">Category</option>
//         <option value="color">Color</option>
//         <option value="size">Size</option>
//         <option value="supplier">Supplier</option>
//       </select>

//       <Pie
//         data={{
//           labels: Object.keys(finalData),
//           datasets: [
//             {
//               data: Object.values(finalData),
//               backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726", "#ab47bc", "#ef5350"],
//             },
//           ],
//         }}
//       />
//     </div>
//   );
// }



























import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartFilter({ data }) {
  const [filterBy, setFilterBy] = useState("category");

  // 🔹 Grouping function
  const groupData = (key) => {
    // ✅ FIX: Agar key 'supplier' hai to database wala naam 'Supplier_name' use karein
    const actualKey = key === "supplier" ? "Supplier_name" : key;

    const result = {};
    
    data.forEach((item) => {
      // Data extract karo (Fallback "Unknown" agar data na ho)
      const value = item[actualKey] || "Unknown"; 

      if (!result[value]) result[value] = 0;
      result[value] += item.Qty;
    });
    
    return result;
  };

  const finalData = groupData(filterBy);

  // Colors array thoda bada kar diya taaki zyada items hone par color repeat na ho
  const colors = [
    "#42a5f5", "#66bb6a", "#ffa726", "#ab47bc", "#ef5350", 
    "#26c6da", "#d4e157", "#ff7043", "#8d6e63", "#78909c"
  ];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Distribution by {filterBy.charAt(0).toUpperCase() + filterBy.slice(1)}</h3>
        
        {/* 🔹 Dropdown */}
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          style={styles.select}
        >
          <option value="category">Category</option>
          <option value="color">Color</option>
          <option value="size">Size</option>
          <option value="supplier">Supplier</option> 
        </select>
      </div>

      <div style={styles.chartWrapper}>
        {Object.keys(finalData).length > 0 ? (
          <Pie
            data={{
              labels: Object.keys(finalData),
              datasets: [
                {
                  data: Object.values(finalData),
                  backgroundColor: colors,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } }
              }
            }}
          />
        ) : (
          <p style={{ textAlign: "center", color: "#888", marginTop: "50px" }}>No Data Available</p>
        )}
      </div>
    </div>
  );
}

// ✨ Professional CSS for Chart Card
const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
    height: "%", // Fit parent
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "10px"
  },
  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#334155",
    textTransform: "capitalize"
  },
  select: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "13px",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#f8fafc",
    color: "#475569",
    fontWeight: "600"
  },
  chartWrapper: {
    flex: 1,
    minHeight: "250px", // Chart dikhne ke liye height
    position: "relative"
  }
};