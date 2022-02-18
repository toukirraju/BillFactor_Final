import React from "react";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthVerify = (props) => {
  const location = useLocation();

  React.useEffect(() => {}, [location]);

  const user = JSON.parse(localStorage.getItem("auth_token"));
  if (user) {
    const decodedJwt = jwtDecode(user.token);

    if (decodedJwt.exp * 1000 < Date.now()) {
      props.logOut();
    }
  }

  return <div></div>;
};

export default AuthVerify;
