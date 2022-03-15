import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { loggedIn } from "../../utils/auth";

var checkLoginHandler = function (nav: NavigateFunction) {
  var handler = async function () {
    const logged = await loggedIn();
    if (!logged) {
      nav("/login");
    }
  };
  return handler;
};

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    var checkLogin = checkLoginHandler(navigate);
    checkLogin();
  });

  useEffect(() => {
    var checkLogin = checkLoginHandler(navigate);
    document.addEventListener("mousedown", checkLogin, true);
    document.addEventListener("keypress", checkLogin, true);

    return () => {
      document.removeEventListener("mousedown", checkLogin, true);
      document.removeEventListener("keypress", checkLogin, true);
    };
  });

  return props.children;
}

export default PrivateRoute;
