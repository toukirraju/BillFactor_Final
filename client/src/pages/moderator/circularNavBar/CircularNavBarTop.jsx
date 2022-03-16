import React from "react";
import "./circularNavTop.css";
import PopUpModal from "../../../components/popUpModal/PopUpModal";
import CreateModal from "../Apartments/CreateModal";
import RenterCreateModal from "../Renter/RenterCreateModal";
import AssignApartment from "../AssignRenterToApartment/AssignApartment";
import UnassignApartment from "../AssignRenterToApartment/UnassignApartment";
import SelectPayableRenter from "../Transactions/SelectPayableRenter";
import SelectRenter from "../SelectRenter";
import SearchSub_man from "../search/SearchSub_man";

const CircularNavBarTop = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [createModalShow, setCreateModalShow] = React.useState(false);
  const [renterCreateModalShow, setRenterCreateModalShow] =
    React.useState(false);
  const [assignApartment, setAssignApartment] = React.useState(false);
  const [unassignApartment, setUnassignApartment] = React.useState(false);
  const [payableRenter, setPayableRenter] = React.useState(false);
  const [updateModalShow, setUpdateModalShow] = React.useState(false);

  const [findRenter, setFindRenter] = React.useState(false);

  const [searchSub_Man, setSearchSub_Man] = React.useState(false);

  // const createModal = () => {
  //   setModalShow(true);
  //   setCreateModalShow(true);
  // };

  const updateModal = () => {
    setModalShow(true);
    setUpdateModalShow(true);
  };

  const hideModal = () => {
    setModalShow(false);
    setCreateModalShow(false);
    setUpdateModalShow(false);
  };
  return (
    <>
      <div className="col-md-3 text-center">
        {/* <PopUpModal
          show={modalShow}
          // createmodal={createModalShow}
          updatemodal={updateModalShow}
          onHide={hideModal}
        /> */}

        <CreateModal
          show={createModalShow}
          onHide={() => setCreateModalShow(false)}
        />
        <RenterCreateModal
          show={renterCreateModalShow}
          onHide={() => setRenterCreateModalShow(false)}
        />

        <AssignApartment
          show={assignApartment}
          onHide={() => setAssignApartment(false)}
        />

        <UnassignApartment
          show={unassignApartment}
          onHide={() => setUnassignApartment(false)}
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
      </div>
      <section className="menu menu--circle">
        <input type="checkbox" id="menu__active" />
        <label for="menu__active" className="menu__active">
          <div className="menu__toggle">
            <div className="icon">
              <div className="hamburger"></div>
            </div>
          </div>
          <input type="radio" name="arrow--up" id="degree--up-0" />
          <input type="radio" name="arrow--up" id="degree--up-1" />
          <input type="radio" name="arrow--up" id="degree--up-2" />
          <div className="menu__listings">
            <ul className="circle">
              {/* <li>
                <div className="placeholder">
                  <div className="upside">
                    <div href="https://codepen.io/logrithumn" className="button">
                      <i className="fa fa-user"></i>
                    </div>
                  </div>
                </div>
              </li> */}
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a
                      href={() => false}
                      className="button"
                      type="submit"
                      onClick={() => setCreateModalShow(true)}
                    >
                      <i className="fas fa-plus-square"></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i
                        className="fas fa-user-plus"
                        onClick={() => setRenterCreateModalShow(true)}
                      ></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <div>&nbsp</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i className="fas fa-edit"></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i className="fa fa-trash"></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i
                        className="fas fa-search"
                        onClick={() => setSearchSub_Man(true)}
                      ></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i
                        className="fas fa-file-search"
                        onClick={() => setFindRenter(true)}
                      ></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i
                        className="fas fa-cash-register"
                        onClick={() => setPayableRenter(true)}
                      ></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i
                        className="fas fa-inbox-out"
                        onClick={() => setUnassignApartment(true)}
                      ></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i
                        className="fas fa-inbox-in"
                        onClick={() => setAssignApartment(true)}
                      ></i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="menu__arrow menu__arrow--top">
            <ul>
              <li>
                <label for="degree--up-0">
                  <div className="arrow"></div>
                </label>
                <label for="degree--up-1">
                  <div className="arrow"></div>
                </label>
                <label for="degree--up-2">
                  <div className="arrow"></div>
                </label>
              </li>
            </ul>
          </div>
        </label>
      </section>
    </>
  );
};

export default CircularNavBarTop;
