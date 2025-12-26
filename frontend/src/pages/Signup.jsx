// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await api.post("/auth/signup", form);
//     navigate("/dashboard");
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <h2>Signup</h2>
//       <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} />
//       <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} />
//       <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />
//       <button>Signup</button>
//     </form>
//   );
// }




import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={submit}>Signup</button>
    </div>
  );
}
