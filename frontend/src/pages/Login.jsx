// import { useState } from "react";
// import api from "../api";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       window.location.href = "/";
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h2>Login</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br /><br />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;







// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await api.post("/auth/login", form);
//     navigate("/dashboard");
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <h2>Login</h2>
//       <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} />
//       <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />
//       <button>Login</button>
//     </form>
//   );
// }




import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      await api.post("/auth/signin", form);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={login}>Login</button>

      <p onClick={() => navigate("/forgot-password")}>
        Forgot Password?
      </p>

      <p onClick={() => navigate("/signup")}>
        Create new account
      </p>
    </div>
  );
}
