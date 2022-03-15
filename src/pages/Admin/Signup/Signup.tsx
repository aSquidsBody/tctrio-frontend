import axios from "axios";
import React, { useState } from "react";
import { SIGNUP_URL } from "../../../config";

interface SignupProps {
  style?: React.CSSProperties;
}

function Signup(props: SignupProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [statusText, setStatusText] = useState("");

  async function onClick() {
    try {
      if (password !== confirm) {
        setStatusText("Passwords do not agree");
        setPassword("");
        setConfirm("");
        return;
      }

      await axios.post(SIGNUP_URL, { username, password, email });
      setStatusText("Success");
      setUsername("");
      setPassword("");
      setConfirm("");
      setEmail("");
    } catch (err: any) {
      const err2 = err.response.data as { errors: { message: string }[] };
      setPassword("");
      setConfirm("");
      console.log(err);
      setStatusText(err2.errors[0].message);
    }
  }

  return (
    <div style={props.style}>
      <div>
        <p>Username</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <p>Confirm Password</p>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      <div>
        <input
          type="button"
          value="Submit"
          onClick={() => onClick()}
          style={{
            margin: "5px 0px",
          }}
        />
      </div>
      <div>
        <p>{statusText}</p>
      </div>
    </div>
  );
}

export default Signup;
