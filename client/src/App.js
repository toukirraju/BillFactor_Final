import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.css";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ModeratorDashboard from "./pages/moderator/ModeratorDashboard";
import AuthVerify from "./common/AuthVerify";
import { logout } from "./redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import ApartmentDetails from "./pages/moderator/Apartments/ApartmentDetails";
import RenterDetails from "./pages/moderator/Renter/RenterDetails";
import TransactionDetails from "./pages/moderator/Transactions/TransactionDetails";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "react-circular-progressbar/dist/styles.css";
import Login from "./pages/Registration&Login/Login";
import Registration from "./pages/Registration&Login/Registration";
import SideMenu from "./components/navigationBar/SideMenu";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <NavigationBar />
        {isLoggedIn ? (
          user.type === "manager" ? (
            user.role === undefined || user.role === "" ? (
              <>
                <SideMenu />
              </>
            ) : null
          ) : null
        ) : null}

        <div
          className={
            isLoggedIn
              ? user.type === "manager"
                ? user.role === undefined || user.role === ""
                  ? "area"
                  : "area2"
                : null
              : null
          }
        >
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {user.type === "manager" ? (
                  user.role === undefined || user.role === "" ? (
                    <>
                      <Route path="/mod" element={<ModeratorDashboard />} />
                      <Route path="/apartment" element={<ApartmentDetails />} />
                      <Route path="/renter" element={<RenterDetails />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/transaction"
                        element={<TransactionDetails />}
                      />
                      <Route
                        path="*"
                        // element={
                        //   <main style={{ padding: "1rem" }}>
                        //     <p>There's nothing here!</p>
                        //   </main>
                        // }
                        element={<Navigate to="/mod" replace />}
                      />
                    </>
                  ) : (
                    <>
                      <Route path="/mod" element={<ModeratorDashboard />} />
                      <Route
                        path="*"
                        // element={
                        //   <main style={{ padding: "1rem" }}>
                        //     <p>There's nothing here!</p>
                        //   </main>
                        // }
                        element={<Navigate to="/mod" replace />}
                      />
                    </>
                  )
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route
                  path="*"
                  // element={
                  //   <main style={{ padding: "1rem" }}>
                  //     <p>There's nothing here!</p>
                  //   </main>
                  // }
                  element={<Navigate to="/" replace />}
                />
              </>
            )}
          </Routes>
        </div>
        <AuthVerify logOut={logOut} />
      </BrowserRouter>
    </>
  );
}

export default App;
