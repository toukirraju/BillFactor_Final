import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";

import { useForm } from "react-hook-form";
import {
  assignRole,
  getSub_Man,
  removeRole,
} from "../../redux/slices/roleSlice";

function SearchSub_man(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const { sub_manager, isPending } = useSelector((state) => state.role);
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showManDetail, setShowManDetail] = React.useState(false);
  const [manData, setManData] = React.useState({});

  const handleClose = () => setShow(false);

  const [search, setSearch] = React.useState({
    _id: "",
  });

  const changeHandler = (event) => {
    setSearch({
      [event.target.name]: event.target.value,
    });
    setShowManDetail(false);
    setError(false);
  };
  const handleShow = () => {
    setLoading(true);
    dispatch(getSub_Man(search._id))
      .unwrap()
      .then((result) => {
        setLoading(false);
        setManData(result);
        setShowManDetail(true);
        setError(false);
      })
      .catch((err) => setError(true));
    setSearch({ _id: "" });
    // setShow(true)
  };
  // console.log(manData);
  // if (Object.keys(manData).length !== 0) {
  //   return (
  //     <>
  //       <div>heloo</div>
  //     </>
  //   );
  // }
  // console.log(user);
  const onSubmit = (e) => {
    // console.log({ role: e.role });
    // let renter = JSON.parse(e.role);
    const assignData = {
      role: e.role,
      homeId: user._id,
      homeOwner: user.name,
    };
    setLoading(true);
    dispatch(assignRole({ _id: manData._id, assignData }))
      .unwrap()
      .then((result) => {
        // setRenterDetails(result);
        setLoading(false);
        setShow(false);
        setManData({});
      })
      .catch((err) => setLoading(false));
    // .finally(() => showProfileModal());
    // props.onHide(true);
  };

  const handleRemove = () => {
    dispatch(removeRole(manData._id));
    setManData({});
  };
  useEffect(() => {
    setManData({});
  }, [props]);

  const homeId = !manData.homeId;
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="input-group rounded">
          {/* Search Bar Start */}
          <input
            type="search"
            className="form-control rounded"
            name="_id"
            placeholder="Manager ID"
            value={search._id}
            onChange={changeHandler}
            aria-label="Search"
            aria-describedby="search-addon"
            onFocus={(e) => (e.target.value = "")}
          />
          <span
            className="input-group-text border-0"
            id="search-addon"
            onClick={handleShow}
            type="submit"
          >
            <i className="fas fa-search"></i>
          </span>
          {/* Search Bar End */}
        </div>

        {isPending ? (
          <>
            <div>Loading...</div>
          </>
        ) : error ? (
          <>
            <div>No data found</div>
          </>
        ) : null}

        {showManDetail ? (
          Object.keys(manData).length !== 0 ? (
            <>
              <div class="card text-dark bg-light mb-3">
                <div class="card-body d-flex flex-wrap justify-content-around">
                  <p class="card-text">Name: {manData.name}</p>
                  <p class="card-text">Id: {manData._id}</p>
                  <p class="card-text">Type: {manData.type}</p>
                  <p class="card-text">Role: {manData.role}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShow(true)}
                    disabled={!homeId}
                  >
                    Assign
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove()}
                    disabled={manData.homeId !== user._id}
                  >
                    Remove Role
                  </button>
                </div>
              </div>
            </>
          ) : null
        ) : null}

        <Modal
          show={show}
          onHide={handleClose}
          animation={true}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Assign Role</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-secondary bg-gradient">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floatingSelect"
                  name="role"
                  {...register("role", { required: true })}
                >
                  <option selected value="">
                    Select Role
                  </option>

                  <option selected value="sub_manager">
                    Sub Manager
                  </option>

                  {/* {data.renters.map((option, index) => (
                            <option key={index} value={JSON.stringify(option)}>
                              &#128100; {option.renterName} &#x27AA; &#x27AA;
                              &#128222; {option.phone}
                            </option>
                          ))} */}
                </select>
                <label for="floatingSelect">Role</label>
                {errors.role && (
                  <span className="text-danger d-block">
                    This field is required
                  </span>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </Modal.Footer>
        </Modal>
      </Modal>
    </>
  );
}

export default SearchSub_man;
