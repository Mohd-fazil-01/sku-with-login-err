// import api from "../api/axios";

// export default function Dashboard() {
//   const logout = async () => {
//     await api.post("/auth/logout");
//     window.location.href = "/login";
//   };

//   return (
//     <>
//       <h1>Dashboard (Protected)</h1>
//       <button onClick={logout}>Logout</button>
//     </>
//   );
// }



import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/user/current")
      .then((res) => setUser(res.data))
      .catch(() => alert("Not logged in"));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <p>Welcome {user.email}</p>}
    </div>
  );
}
