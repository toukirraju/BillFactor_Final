import React from "react";
import "./moderatorPage.css";
// import { useDispatch, useSelector } from "react-redux";
// import { allApartments } from "../../redux/slices/moderator";
import CircularNavBarTop from "./circularNavBar/CircularNavBarTop";
import CircularNavBarBottom from "./circularNavBar/CircularNavBarBottom";
// import { clearMessage } from "../../redux/slices/message";

const ModeratorPage = () => {
  // const dispatch = useDispatch();

  // const { isAdded } = useSelector((state) => state.moderator);
  // const { message } = useSelector((state) => state.message);

  // useEffect(() => {
  //   dispatch(allApartments());
  // }, [isAdded, dispatch]);

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  return (
    <>
      <div className="moderatorWraper">
        <CircularNavBarTop />
        {/* {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )} */}
        <CircularNavBarBottom />
      </div>
    </>
  );
};

export default ModeratorPage;
