import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import RegAndLogin from "./pages/Registration&Login/RegAndLogin";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ModeratorPage from "./pages/moderator/ModeratorPage";
import AuthVerify from "./common/AuthVerify";
import { logout } from "./redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import ApartmentDetails from "./pages/moderator/Apartments/ApartmentDetails";
import RenterDetails from "./pages/moderator/Renter/RenterDetails";
import TransactionDetails from "./pages/moderator/Transactions/TransactionDetails";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  // console.log(user.type);
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<RegAndLogin />} />
              <Route path="/profile" element={<Profile />} />
              {user.type === "manager" ? (
                <>
                  <Route path="/mod" element={<ModeratorPage />} />
                  <Route path="/apartment" element={<ApartmentDetails />} />
                  <Route path="/renter" element={<RenterDetails />} />
                  <Route path="/transaction" element={<TransactionDetails />} />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<RegAndLogin />} />
            </>
          )}
        </Routes>
        <AuthVerify logOut={logOut} />
      </BrowserRouter>
    </>
  );
}

export default App;
