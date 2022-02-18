import React from "react";
import "./circularNav.css";
import PopUpModal from "../popUpModal/PopUpModal";

const CircularNavBar = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalCreateShow, setCreateModalShow] = React.useState(false);
  const [updateModalShow, setUpdateModalShow] = React.useState(false);

  const createModal = () => {
    setModalShow(true);
    setCreateModalShow(true);
  };

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
        <PopUpModal
          show={modalShow}
          createmodal={modalCreateShow}
          updatemodal={updateModalShow}
          onHide={hideModal}
        />

        {/* <Button variant="primary mb-1" onClick={() => setModalShow(true)}>
          create
        </Button> */}
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
                      onClick={createModal}
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
                      <i className="fa fa-cog"></i>
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
                      <i className="fas fa-edit" onClick={updateModal}></i>
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
                      <i className="fas fa-minus-circle"></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i className="fa fa-calendar"></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i className="fa fa-cloud"></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i className="fa fa-wifi"></i>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="placeholder">
                  <div className="upside">
                    <a href={() => false} className="button">
                      <i className="fas fa-sms"></i>
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

export default CircularNavBar;
