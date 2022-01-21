import axios from "axios";
import React, { Component } from "react";
import { CURRENT_USER, LOGOUT_URL, UPDATE_USER } from "../../config";
import { authRequest } from "../../pages/Admin/AuthRoute";
import TextInput from "./common/TextInput";
import sharedStyles from "./styles/Manage.module.css";

class ManageUser extends Component<{ setAuth: (auth: boolean) => void }, {}> {
  state = {
    username: "",
    email: "",
    updateUsername: "",
    updateEmail: "",
    errText: "",
    successText: "",
  };
  fetchData = async () => {
    try {
      const res = await axios.get<{
        currentUser: { username: string; email: string };
      }>(CURRENT_USER, { withCredentials: true });
      const { username, email } = res.data.currentUser;
      this.setState({
        username,
        email,
        updateUsername: username,
        updateEmail: email,
      });
    } catch (err) {}
  };

  async componentDidMount() {
    await this.fetchData();
  }

  updateProfile = async () => {
    if (
      this.state.username === this.state.updateUsername &&
      this.state.email === this.state.updateEmail
    ) {
      this.setState({ errText: "", successText: "" });
      return;
    }

    try {
      const res = await authRequest(() =>
        axios.put<{
          updatedUser: { username: string; email: string };
        }>(
          UPDATE_USER,
          {
            username: this.state.updateUsername,
            email: this.state.updateEmail,
          },
          { withCredentials: true }
        )
      );
      if (!res) {
        this.props.setAuth(false);
        return;
      }
      const updatedUser = res.data.updatedUser;

      this.setState({
        username: updatedUser.username,
        email: updatedUser.email,
        errText: "",
        successText: "Profile Updated",
      });
    } catch (err: any) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach(({ field }: { field: string }) => {
          if (field === "username" || field === "email") {
            this.setState({
              errText: "Username/Email cannot be empty",
              successText: "",
            });
          }
        });
      }
    }
  };

  handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await this.updateProfile();
    } else {
      this.setState({ errText: "", successText: "" });
    }
  };

  logout = async () => {
    try {
      const res = await axios.post(LOGOUT_URL, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (e: any) {
      console.log(e.message);
    }

    return this.props.setAuth(false);
  };

  render() {
    return (
      <div className={sharedStyles.component}>
        <div className={sharedStyles.padding}>
          <div className={sharedStyles.item}>
            <div style={{ width: "200px" }}>
              <TextInput
                name="Username"
                value={this.state.updateUsername}
                onKeyPress={this.handleKeyPress}
                onChange={(e) => {
                  this.setState({ updateUsername: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={sharedStyles.item}>
            <div style={{ width: "200px" }}>
              <TextInput
                name="Email"
                value={this.state.updateEmail}
                onKeyPress={this.handleKeyPress}
                onChange={(e) => {
                  this.setState({ updateEmail: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={sharedStyles.item}>
            <button className={sharedStyles.btn} onClick={this.updateProfile}>
              Update profile
            </button>
            {this.state.errText ? (
              <p
                style={{
                  color: "darkred",
                  fontStyle: "italic",
                }}
              >
                {this.state.errText}
              </p>
            ) : this.state.successText ? (
              <p
                style={{
                  color: "#66ffff",
                  fontStyle: "italic",
                }}
              >
                {this.state.successText}
              </p>
            ) : null}
            <div
              style={{
                margin: "40px 0px",
              }}
            >
              <button className={sharedStyles.btn} onClick={this.logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageUser;
