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
      <div className="wrapper">
        <div
          class="card text-dark bg-light m-3 cardBody"
          // style={{ width: "50%" }}
        >
          <div class="card-header">Personal Info</div>
          <div class="card-body">
            <h5 class="card-title text-uppercase">{user.name}</h5>
            <p class="card-text">Type: {user.type}</p>
            <p class="card-text">id: {user._id}</p>
          </div>
        </div>
        {isPending ? (
          <>
            <h5>loading...</h5>
          </>
        ) : (
          <>
            <h5 className="text-center cardBody">Role Info</h5>
            <div className="d-flex flex-wrap cardBody">
              {roled_sub_manager.map((item, idx) => (
                <>
                  {/* <div className="text-center" key={idx}>
                  <h6>Sub_manNo :{idx + 1}</h6>
                  <p>Sub_manager id :{item._id}</p>
                  <p>Sub_manager role :{item.role}</p>
                  <p>Sub_manager name :{item.name}</p>
                </div> */}
                  <div
                    class="card text-dark bg-light m-3 "
                    style={{ maxWidth: "18rem" }}
                  >
                    <div class="card-header">{item.name}</div>
                    <div class="card-body">
                      <h5 class="card-title text-uppercase">
                        Role: {item.role}
                      </h5>
                      <p class="card-text">Serial No :{idx + 1}</p>
                      <p class="card-text">id: {item._id}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
