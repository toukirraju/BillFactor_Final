import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { update } from "../../../redux/slices/apartmentSlice";

function UpdateModal(props) {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    _id: props.data._id,
    apartNo: props.data.apartNo,
    roomNo: props.data.roomNo,
    rent: props.data.rent,
    gasbill: props.data.gasbill,
    waterbill: props.data.waterbill,
    c_service: props.data.c_service,
    f_bill: props.data.f_bill,
  });
  //   const { name, _id } = useSelector((state) => state.auth.user);

  const Close = () => {
    props.onHide(false);
    // setTimeout(function () {
    //   props.onHide(false);
    // }, 5000);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(update(updatedData))
      .unwrap()
      .then(() => {
        toast.success("Successfully Created");
        // window.location.reload();
      })
      .catch(() => {
        toast.error("Something want wrong");
      });
    props.onHide(false);
    // const arr = Array.from({ length: data.numOfFloors }, (_, index) => [
    //   {
    //     floor: index + 1,
    //     apartNo: `A${index + 1}`,
    //     roomNo: `R${index + 1}`,
    //     rent: 0,
    //     gasbill: 0,
    //     waterbill: 0,
    //     c_service: 0,
    //     adminId: 0,
    //   },
    // ]);
    // console.log(arr);

    // reset();
    // toast.success("Successfully Created");
  };

  useEffect(() => {
    setTimeout(function () {
      //   setisLoading(false);
      setUpdatedData({
        _id: props.data._id,
        apartNo: props.data.apartNo,
        roomNo: props.data.roomNo,
        rent: props.data.rent,
        gasbill: props.data.gasbill,
        waterbill: props.data.waterbill,
        c_service: props.data.c_service,
        f_bill: props.data.f_bill,
      });
    }, 1000);
    // apatrments.apatrments.floors.map((item) => {
    //   if (item._id === props.data._id) {
    //     setForUpdates({
    //       _id: item._id,
    //       apartNo: item.apartNo,
    //       roomNo: item.roomNo,
    //       rent: item.rent,
    //       gasbill: item.gasbill,
    //       waterbill: item.waterbill,
    //       c_service: item.c_service,
    //     });
    //   }
    // });
  }, [props]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Update</Modal.Title>
        </Modal.Header>
        {!isLoading ? (
          <>
            <Modal.Body>
              <div>
                <section className="">
                  <div>
                    <ToastContainer closeButton={Close} />
                  </div>

                  <div className="mx-5 ">
                    <div className="row ">
                      <div className="col-md-12">
                        <form onSubmit={onSubmit}>
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              name="apartNo"
                              autoComplete="off"
                              value={updatedData.apartNo}
                              onChange={changeHandler}
                              required
                              placeholder="Apartment Id"
                            />
                            <label for="floatingInput">Apartment Id</label>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              name="roomNo"
                              autoComplete="off"
                              value={updatedData.roomNo}
                              onChange={changeHandler}
                              required
                              placeholder="RoomNo"
                            />
                            <label for="floatingInput">RoomNo</label>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              name="rent"
                              autoComplete="off"
                              value={updatedData.rent}
                              onChange={changeHandler}
                              required
                              placeholder="Enter your rent"
                            />
                            <label for="floatingInput">Rent</label>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              name="gasbill"
                              autoComplete="off"
                              value={updatedData.gasbill}
                              onChange={changeHandler}
                              required
                              placeholder="Enter gasbill"
                            />
                            <label for="floatingInput">Gasbill</label>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              name="waterbill"
                              autoComplete="off"
                              value={updatedData.waterbill}
                              onChange={changeHandler}
                              required
                              placeholder="Enter your waterbill"
                            />
                            <label for="floatingInput">Waterbill</label>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              name="f_bill"
                              autoComplete="off"
                              value={updatedData.f_bill}
                              onChange={changeHandler}
                              required
                              placeholder="Enter f_bill"
                            />
                            <label for="floatingInput">f_bill</label>
                          </div>

                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              name="c_service"
                              autoComplete="off"
                              value={updatedData.c_service}
                              onChange={changeHandler}
                              required
                              placeholder="Enter c_service"
                            />
                            <label for="floatingInput">c_service</label>
                          </div>

                          <button className="btn btn-primary">Submit</button>
                          <button
                            className="btn btn-danger"
                            onClick={() => Close()}
                          >
                            close
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Modal.Body>
          </>
        ) : (
          <>
            <h3>Loading....</h3>
          </>
        )}

        {/* 
        <Modal.Footer>
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Create
          </button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default UpdateModal;
