import React, { useState, useEffect } from "react";
import "./reg&login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Route, Routes, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { login } from "../../redux/slices/auth";
import { clearMessage } from "../../redux/slices/message";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    phone: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    setLoading(true);

    dispatch(login(formValue))
      .unwrap()
      .then(() => {
        // alert("login successfull");
        toast.success("Successfully login");
        // history("/mod");
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/mod" />} />
      </Routes>
    );
  }

  return (
    <>
      <div className="app-wrapper ">
        <div className="login-wrapper ">
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <div className="form-wrapper cardBody">
            <h3 className="heading">Login</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <div className="form-group mb-3">
                  <Field
                    name="phone"
                    type="number"
                    placeholder="Phone *"
                    className="form-control"
                    autocomplete="off"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group mb-3">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password *"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <p className="heading">
                  Do not have an account??
                  <Link to="/register">Go to register</Link>
                </p>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
