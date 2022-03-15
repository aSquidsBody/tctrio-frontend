import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CURRENT_USER, LOGOUT_URL, UPDATE_USER } from "../../config";
import { setLogin } from "../../utils/auth";
import TextInput from "./common/TextInput";
import sharedStyles from "./styles/Manage.module.css";

function ManageUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [errText, setErrText] = useState("");
  const [successText, setSuccessText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get<{
        currentUser: { username: string; email: string };
      }>(CURRENT_USER, { withCredentials: true });
      const { username, email } = res.data.currentUser;
      setUsername(username);
      setEmail(email);
      setUpdateUsername(username);
      setUpdateEmail(email);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateProfile() {
    if (username === updateUsername && email === updateEmail) {
      setErrText("");
      setSuccessText("");
      return;
    }

    try {
      const res = await axios.put<{
        updatedUser: { username: string; email: string };
      }>(
        UPDATE_USER,
        {
          username: updateUsername,
          email: updateEmail,
        },
        { withCredentials: true }
      );

      const updatedUser = res.data.updatedUser;
      setUsername(updatedUser.username);
      setEmail(updatedUser.email);
      setErrText("");
      setSuccessText("Profile Updated");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach(({ field }: { field: string }) => {
          if (field === "username" || field === "email") {
            setErrText("Username/Email cannot be empty");
            setSuccessText("");
          }
        });
      }
    }
  }

  async function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      await updateProfile();
    } else {
      setErrText("");
      setSuccessText("");
    }
  }

  async function logout() {
    try {
      await axios.post(LOGOUT_URL, {
        withCredentials: true,
      });
      setLogin(0);
      navigate("/login");
    } catch (e: any) {
      console.log(e.message);
    }
    return;
  }

  return (
    <div className={sharedStyles.component}>
      <div className={sharedStyles.padding}>
        <div className={sharedStyles.item}>
          <div style={{ width: "200px" }}>
            <TextInput
              name="Username"
              value={updateUsername}
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setUpdateUsername(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={sharedStyles.item}>
          <div style={{ width: "200px" }}>
            <TextInput
              name="Email"
              value={updateEmail}
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setUpdateEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={sharedStyles.item}>
          <button className={sharedStyles.btn} onClick={updateProfile}>
            Update profile
          </button>
          {errText ? (
            <p
              style={{
                color: "darkred",
                fontStyle: "italic",
              }}
            >
              {errText}
            </p>
          ) : successText ? (
            <p
              style={{
                color: "#66ffff",
                fontStyle: "italic",
              }}
            >
              {successText}
            </p>
          ) : null}
          <div
            style={{
              margin: "40px 0px",
            }}
          >
            <button className={sharedStyles.btn} onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
