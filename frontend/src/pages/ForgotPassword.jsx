import { useState } from "react";
import api from "../api/axios";

export default function ForgotPassword() {
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const sendCode = async () => {
    setStage(2);
    await api.post("/password/forgot", { email });
    
   
  };

  const verifyCode = async () => {
    await api.post("/password/verify", { email, code });
    setStage(3);
  };

  const resetPassword = async () => {
    await api.post("/password/reset", { email, password });
    alert("Password reset successful");
  };

  return (
    <div>
      {stage === 1 && (
        <>
          <h2>Enter Email</h2>
          <input onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendCode}>Send Code</button>
        </>
      )}

      {stage === 2 && (
        <>
          <h2>Enter Code</h2>
          <input onChange={(e) => setCode(e.target.value)} />
          <button onClick={verifyCode}>Verify</button>
        </>
      )}

      {stage === 3 && (
        <>
          <h2>Reset Password</h2>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Reset</button>
        </>
      )}
    </div>
  );
}
