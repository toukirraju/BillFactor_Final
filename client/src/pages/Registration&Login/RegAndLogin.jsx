import "./reg&login.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { clearMessage } from "../../redux/slices/message";
import Registration from "./Registration";
import Login from "./Login";

const RegAndLogin = () => {
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  return (
    <div className="snippet-body">
      <div className="container-fluid register">
        <div className="row reverse">
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}

          <div className="col-md-4 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h3>Welcome</h3>
            <p>You are 30 seconds away from earning your own money!</p>
            <div className="navButton">
              <ul
                className="nav nav-tabs nav-justified"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Register
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-8 register-right">
            <div className="tab-content" id="myTabContent">
              {/* Login */}
              <Login />

              {/* registration */}

              <Registration />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegAndLogin;
