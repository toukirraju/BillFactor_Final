import React from "react";
import "./circularNavBottom.css";
import { Link } from "react-router-dom";

const CircularNavBarBottom = () => {
  return (
    <>
      <div id="menu">
        <input type="checkbox" id="menu-toggle" />
        <ul>
          <li data-tooltip="Home">
            <Link to="/mod">
              <i className="fas fa-home" title="home"></i>
            </Link>
          </li>
          <li data-tooltip="Apartment">
            <Link to="/apartment">
              <i className="fas fa-door-open"></i>
            </Link>
          </li>
          <li data-tooltip="Renters">
            <Link to="/renter">
              <i className="fas fa-users"></i>
            </Link>
          </li>
          <li data-tooltip="Transactions">
            <Link to="/transaction">
              <i className="fas fa-file-invoice-dollar"></i>
            </Link>
          </li>
          <li>
            <Link to="/mod">
              <i className="fas fa-question"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CircularNavBarBottom;
