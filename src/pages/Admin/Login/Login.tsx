import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_black.png";
import { fetchLogin, loggedIn } from "../../../utils/auth";
import styles from "./styles/Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  async function loggedInEffect() {
    if (await loggedIn()) {
      navigate("/admin");
    }
  }

  useEffect(() => {
    loggedInEffect();
  });

  async function login() {
    const res = await fetchLogin(username, password);
    if (res.errMsg === "") {
      navigate("/admin");
    } else {
      setErrMsg(res.errMsg);
    }
  }

  async function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      await login();
    }
  }

  return (
    <div className={styles.component}>
      <div className={styles.centerCol}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.centerCol}>
              <div className={styles.yLevel}>
                <div className={styles.graphic}>
                  <div className={styles.logo}>
                    <img src={logo} alt="Logo" />
                  </div>
                  <div className={styles.blackLine} />
                  <div className={styles.description}>
                    <p>Admin page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.centerCol}>
              <div className={styles.yLevel}>
                <div className={styles.box}>
                  <div className={styles.personnel}>
                    <p>Authorized </p>
                    <p>personnel only</p>
                  </div>
                  <div className={styles.greyLine}></div>
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className={classNames(styles.username, styles.loginInput)}
                    value={username}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className={classNames(styles.password, styles.loginInput)}
                    value={password}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {errMsg ? <p className={styles.error}>{errMsg}</p> : null}
                  <button className={styles.button} onClick={login}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
