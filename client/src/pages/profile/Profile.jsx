import React from "react";
import "./profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
  // const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="wrapper">
        <div className="profile">
          <div className="overlay">
            <div className="about d-flex flex-column">
              {/* <h4>{user.name}</h4> <span>{user.type}</span> */}
            </div>
            <ul className="social-icons">
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
