// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ Navigate import kiya
// import Home from "./pages/Home";
// import Graphs from "./pages/Graphs";
// import AddProduct from "./pages/AddProduct";
// import CreateUser from "./pages/CreateUser";
// import Login from "./pages/Login";

// // ---------------- PrivateRoute ----------------
// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token"); // JWT token check
//   return token ? children : <Navigate to="/login" />; // agar token nahi, login pe redirect
// };

// // ---------------- App Component ----------------
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* PUBLIC ROUTE */}
//         <Route path="/login" element={<Login />} />

//         {/* PROTECTED ROUTES */}
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/add-product"
//           element={
//             <PrivateRoute>
//               <AddProduct />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/create-user"
//           element={
//             <PrivateRoute>
//               <CreateUser />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/graphs"
//           element={
//             <PrivateRoute>
//               <Graphs />
//             </PrivateRoute>
//           }
//         />

//         {/* 404 fallback */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
