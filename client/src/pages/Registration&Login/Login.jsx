import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Route, Routes } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
        alert("login successfull");
        history("/");
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      <div
        className="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <h3 className="register-heading">Login</h3>
        <div className="row register-form">
          <div className="col-md-8 offset-1">
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
                    placeholder="Your Phone *"
                    className="form-control"
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
                <input type="submit" className="btnRegister" value="Login" />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
