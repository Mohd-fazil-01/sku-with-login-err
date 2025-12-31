// // import React from "react";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ Navigate import kiya
// // import Home from "./pages/Home";
// // import Graphs from "./pages/Graphs";
// // import AddProduct from "./pages/AddProduct";
// // import CreateUser from "./pages/CreateUser";
// // import Login from "./pages/Login";

// // // ---------------- PrivateRoute ----------------
// // const PrivateRoute = ({ children }) => {
// //   const token = localStorage.getItem("token"); // JWT token check
// //   return token ? children : <Navigate to="/login" />; // agar token nahi, login pe redirect
// // };

// // // ---------------- App Component ----------------
// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* PUBLIC ROUTE */}
// //         <Route path="/login" element={<Login />} />

// //         {/* PROTECTED ROUTES */}
// //         <Route
// //           path="/"
// //           element={
// //             <PrivateRoute>
// //               <Home />
// //             </PrivateRoute>
// //           }
// //         />

// //         <Route
// //           path="/add-product"
// //           element={
// //             <PrivateRoute>
// //               <AddProduct />
// //             </PrivateRoute>
// //           }
// //         />

// //         <Route
// //           path="/create-user"
// //           element={
// //             <PrivateRoute>
// //               <CreateUser />
// //             </PrivateRoute>
// //           }
// //         />

// //         <Route
// //           path="/graphs"
// //           element={
// //             <PrivateRoute>
// //               <Graphs />
// //             </PrivateRoute>
// //           }
// //         />

// //         {/* 404 fallback */}
// //         <Route path="*" element={<Navigate to="/" />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;




// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import Dashboard from "./pages/Dashboard";
// // import ProtectedRoute from "./components/ProtectedRoute";

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/signup" element={<Signup />} />
// //         <Route
// //           path="/dashboard"
// //           element={
// //             <ProtectedRoute>
// //               <Dashboard />
// //             </ProtectedRoute>
// //           }
// //         />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }



// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Home";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }








// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Home";
// import AddProduct from "./pages/AddProduct";
// import CreateUser from "./pages/CreateUser";
// import Graphs from "./pages/Graphs";
// import BarcodeGenPage from "./pages/BarcodeGenPage";
// import ProductDetails from "./pages/ProductDetails";
// import { Toaster } from 'react-hot-toast';
// import UserManagement from "./pages/UserManagement";


// export default function App() {
//   return (
//     <BrowserRouter>
//       {/* Isko sabse upar laga de */}
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         toastOptions={{
//           style: {
//             fontSize: '14px',
//             fontWeight: 'bold',
//             borderRadius: '8px',
//             background: '#333',
//             color: '#fff',
//           },
//         }}
//       />
//       <Routes>
//         {/* ----- PUBLIC ROUTES ----- */}
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* ----- PROTECTED ROUTES (Using Cookie Auth) ----- */}

//         {/* Home/Dashboard Page */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         {/* Product Management */}
//         <Route
//           path="/add-product"
//           element={
//             <ProtectedRoute>
//               <AddProduct />
//             </ProtectedRoute>
//           }
//         />

//         {/* User Management */}
//         <Route
//           path="/create-user"
//           element={
//             <ProtectedRoute>
//               <CreateUser />
//             </ProtectedRoute>
//           }
//         />

//         {/* Analytics/Graphs */}
//         <Route
//           path="/graphs"
//           element={
//             <ProtectedRoute>
//               <Graphs />
//             </ProtectedRoute>
//           }
//         />
//         {/* 👇 BARCODEGENPAGE ROUTE */}
//         <Route
//           path="/generate-barcode/:sku"
//           element={
//             <ProtectedRoute>
//               <BarcodeGenPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute>
//               <ProductDetails />
//             </ProtectedRoute>
//           }
//         />

//         // ... Routes ke andar add karo
//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute>
//               <UserManagement />
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 Fallback: Agar galat URL ho toh Login ya Dashboard par bhej do */}
//         <Route path="*" element={<Navigate to="/" />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }




























import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import CreateUser from "./pages/CreateUser";
import Graphs from "./pages/Graphs";
import BarcodeGenPage from "./pages/BarcodeGenPage";
import ProductDetails from "./pages/ProductDetails";
import UserManagement from "./pages/UserManagement";

// Component
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Routes>
        {/* ----- PUBLIC ROUTES ----- */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ----- PROTECTED ROUTES ----- */}

        {/* 1. SABKE LIYE (Bas login hona chahiye) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        {/* 2. ADMIN & SUPERUSER ONLY (Product Management) */}
        <Route
          path="/add-product"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generate-barcode/:sku"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <BarcodeGenPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/graphs"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser","user"]}>
              <Graphs />
            </ProtectedRoute>
          }
        />

        {/* 3. SIRF ADMIN ONLY (User Management) */}
        {/* Naya user banana ya delete karna sirf 'admin' karega */}
        <Route
          path="/create-user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}