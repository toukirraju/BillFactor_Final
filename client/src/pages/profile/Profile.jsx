import React, { useEffect } from "react";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import { getRoledSub_Man } from "../../redux/slices/roleSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isPending, roled_sub_manager } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRoledSub_Man());
  }, [dispatch]);

  return (
    <>
      <h5 className="text-center">Role Info</h5>

      {isPending ? (
        <>
          <h5>loading...</h5>
        </>
      ) : (
        <>
          {roled_sub_manager.map((item, idx) => (
            <>
              <div className="text-center" key={idx}>
                <h6>Sub_manNo :{idx + 1}</h6>
                <p>Sub_manager id :{item._id}</p>
                <p>Sub_manager role :{item.role}</p>
                <p>Sub_manager name :{item.name}</p>
              </div>
            </>
          ))}
        </>
      )}
      <div className="wrapper">
        {/* <div className="SubManager">sub manager</div>
        <div className="profile">
          <div className="overlay">
            <div className="about d-flex flex-column">
              <h4>{user.name}</h4> <span>{user.type}</span>
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
        </div> */}
      </div>
    </>
  );
};

export default Profile;
