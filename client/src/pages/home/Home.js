import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/Billfactor3.png";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // ModeratorService.getApartments()
    //   .then((date) => {
    //     console.log(date);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // dispatch(allApartments(_id));
    // .then((date) => {
    //   console.log(date);
    // })
    // .catch(() => {
    //   // toast.error("Something want wrong");
    // });
  }, []);

  // const auth = useSelector((state) => state.moderator);

  // console.log(`auth`, auth);
  return (
    <div className="wrapper">
      <div className="cardBody">
        <div className="text-center">
          <img src={logo} alt="logo" height={200} />
        </div>
        <h5 className=" mt-5 heading">BillFactor</h5>
        <p className="heading text-uppercase">
          It can make your life more easier{" "}
        </p>
      </div>
    </div>
  );
};

export default Home;
