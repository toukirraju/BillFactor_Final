import React from "react";
import { Link } from "react-router-dom";
import ApartmentCreateModal from "../Apartments/ApartmentCreateModal";
import RenterCreateModal from "../Renters/RenterCreateModal";
import SearchSub_man from "../search/SearchSub_man";
import SelectRenter from "../Renters/SelectRenter";
import SelectPayableRenter from "../../pages/moderator/Transactions/SelectPayableRenter";

const SideMenu = () => {
  const [createRenter, setCreateRenter] = React.useState(false);

  const [createApartment, setCreateApartment] = React.useState(false);

  const [searchSub_Man, setSearchSub_Man] = React.useState(false);

  const [findRenter, setFindRenter] = React.useState(false);

  const [payableRenter, setPayableRenter] = React.useState(false);
  return (
    <>
      <ApartmentCreateModal
        show={createApartment}
        onHide={() => setCreateApartment(false)}
      />
      <RenterCreateModal
        show={createRenter}
        onHide={() => setCreateRenter(false)}
      />

      <SelectPayableRenter
        show={payableRenter}
        onHide={() => setPayableRenter(false)}
      />

      <SelectRenter show={findRenter} onHide={() => setFindRenter(false)} />

      <SearchSub_man
        show={searchSub_Man}
        onHide={() => setSearchSub_Man(false)}
      />
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/mod">
              <i className="fas fa-home fa-2x" title="home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/apartment">
              <i className="fas fa-door-open fa-2x"></i>
              <span className="nav-text">Apartments</span>
            </Link>
            <ul className="dropdown">
              <li>
                <a href={() => false}>
                  <i className="fas fa-car-building fa-2x"></i>
                  <span
                    className="nav-text"
                    onClick={() => setCreateApartment(true)}
                  >
                    Create Apartment
                  </span>
                </a>
              </li>
            </ul>
          </li>
          <li className="has-subnav">
            <Link to="/renter">
              <i className="fas fa-users fa-2x"></i>
              <span className="nav-text">Renters</span>
            </Link>
            <ul className="dropdown">
              <li className="has-subnav">
                <a href={() => false}>
                  <i className="fas fa-user-plus fa-2x"></i>
                  <span
                    className="nav-text"
                    onClick={() => setCreateRenter(true)}
                  >
                    Create Renter
                  </span>
                </a>
              </li>
              <li>
                <a href={() => false}>
                  <i className="fas fa-users fa-2x"></i>
                  <span
                    className="nav-text"
                    onClick={() => setFindRenter(true)}
                  >
                    Find Renters
                  </span>
                </a>
              </li>
            </ul>
          </li>
          <li className="has-subnav">
            <Link to="/transaction">
              <i className="fas fa-file-invoice-dollar fa-2x"></i>
              <span className="nav-text">Transactions</span>
            </Link>
            <ul className="dropdown">
              <li>
                <a href={() => false} onClick={() => setPayableRenter(true)}>
                  <i className="fas fa-cash-register fa-2x"></i>
                  <span className="nav-text">Make Bill</span>
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href={() => false} onClick={() => setSearchSub_Man(true)}>
              <i className="fas fa-search fa-2x"></i>
              <span className="nav-text">Find Sub-Manager</span>
            </a>
          </li>
        </ul>

        <ul className="logout">
          <li>
            <a href="#">
              <i className="fas fa-power-off fa-2x"></i>
              <span className="nav-text">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideMenu;
