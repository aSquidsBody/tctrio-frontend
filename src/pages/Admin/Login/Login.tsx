import React, { Component } from "react";
import { Redirect } from "react-router";
import Body from "../../Body";
import { loggedIn, setLogin } from "../../../utils/auth";

import logo from "../../../assets/logo_black.png";
import styles from "./styles/Login.module.css";
import axios from "axios";
import { LOGIN_URL } from "../../../config";
import classNames from "classnames";

class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
    errMsg: "",
    redirect: false,
  };

  componentDidMount() {
    if (loggedIn() && !this.state.redirect) this.setState({ redirect: true });
  }

  login = async () => {
    try {
      const res = await axios.post(
        LOGIN_URL,
        {
          ...this.state.credentials,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.username === this.state.credentials.username) {
        setLogin(true);
        this.setState({ redirect: true });
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        this.setState({ errMsg: err.response.data.errors[0].message });
      }
    }
  };

  handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await this.login();
    }
  };

  render() {
    return (
      <Body page="">
        <div className={styles.component}>
          {this.state.redirect ? <Redirect push to="/admin" /> : null}
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
                        className={classNames(
                          styles.username,
                          styles.loginInput
                        )}
                        value={this.state.credentials.username}
                        onKeyPress={this.handleKeyPress}
                        onChange={(e) => {
                          const credentials = this.state.credentials;
                          credentials.username = e.target.value;
                          this.setState({ credentials });
                        }}
                      />
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className={classNames(
                          styles.password,
                          styles.loginInput
                        )}
                        value={this.state.credentials.password}
                        onKeyPress={this.handleKeyPress}
                        onChange={(e) => {
                          const credentials = this.state.credentials;
                          credentials.password = e.target.value;
                          this.setState({ credentials });
                        }}
                      />
                      {this.state.errMsg ? (
                        <p className={styles.error}>{this.state.errMsg}</p>
                      ) : null}
                      <button className={styles.button} onClick={this.login}>
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Body>
    );
  }
}

export default Login;
