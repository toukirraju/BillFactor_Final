import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  return <div>Home page</div>;
};

export default Home;
