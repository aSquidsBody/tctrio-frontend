import React, { Component } from "react";
import { Redirect } from "react-router";
import { loggedIn, setLogin } from "../../utils/auth";

class AuthWrapper extends Component<{ children: JSX.Element }, {}> {
  state = {
    authorized: true,
  };

  checkAuth = () => {
    this.setState({
      authorized: loggedIn(),
    });
  };

  componentDidMount() {
    this.setState({ authorized: loggedIn() });
  }

  render() {
    return this.state.authorized ? (
      <>{this.props.children}</>
    ) : (
      <Redirect to="/login" />
    );
  }
}

function AuthRoute({ children }: { children: JSX.Element }) {
  return <AuthWrapper children={children} />;
}

export default AuthRoute;

export async function authRequest(func: () => Promise<any>) {
  try {
    const res = await func();
    return res;
  } catch (err: any) {
    if (
      err.response?.data?.errors?.length > 0 &&
      err.response.data.errors[0].message === "Not Authorized"
    ) {
      setLogin(false);
      return undefined;
    } else {
      throw err;
    }
  }
}
