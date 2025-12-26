// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function ProtectedRoute({ children }) {
//   const [auth, setAuth] = useState(null);

//   useEffect(() => {
//     api.get("/auth/check")
//       .then(() => setAuth(true))
//       .catch(() => setAuth(false));
//   }, []);

//   if (auth === null) return <p>Loading...</p>;

//   return auth ? children : <Navigate to="/login" />;
// }



import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    api
      .get("/users/current")
      .then(() => {
        setIsAuth(true);
        setLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Checking auth...</h3>;
  if (!isAuth) return <Navigate to="/" />;

  return children;
}
