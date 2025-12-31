// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import api from "../api/axios";

// export default function ProtectedRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [isAuth, setIsAuth] = useState(false);

//  useEffect(() => {
//   api.get("/users/current") // baseURL me /api hai toh ye sahi hai
//     .then((res) => {
//       setIsAuth(true);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.error("Auth check failed:", err.response?.status);
//       setIsAuth(false);
//       setLoading(false);
//     });
// }, []);

//   if (loading) return <h3>Checking auth...</h3>;
//   if (!isAuth) return <Navigate to="/" />;

//   return children;
// }


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

// 1. 'allowedRoles' prop receive karo
export default function ProtectedRoute({ children, allowedRoles }) {
  const [loading, setLoading] = useState(true);
  
  // 2. isAuth (true/false) ki jagah pura 'user' object store karenge
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/users/current")
      .then((res) => {
        // Backend se user data mila (isme userType hona chahiye)
        setUser(res.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth check failed:", err.response?.status);
        setUser(null); // Login nahi hai
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Checking auth...</h3>;

  // 3. Agar User Login hi nahi hai -> Login page par bhejo
  if (!user) return <Navigate to="/" replace />;

  // 4. --- MAIN MAGIC (Role Check) ---
  // Agar is route ke liye kuch khaas roles chahiye (jaise ['admin'])
  // Aur current user ka role us list mein nahi hai
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
     // Toh usko Dashboard par wapis bhej do
     return <Navigate to="/dashboard" replace />;
  }

  // 5. Sab sahi hai, page dikhao
  return children;
}