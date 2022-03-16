import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { register } from "../../redux/slices/auth";
import { clearMessage } from "../../redux/slices/message";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationSchema } from "../../validation/LoginAndReg";

const Registration = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
    role: "",
  };

  const handleRegister = (formValue, { resetForm }) => {
    setSuccessful(false);
    dispatch(register(formValue))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        toast.success("Successfully registered!");
        resetForm();
        dispatch(clearMessage());
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div
        className="tab-pane fade show"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <h3 className="register-heading">Registration</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div className="row register-form">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Field
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name *"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group mb-3">
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email *"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <Field
                    name="phone"
                    type="number"
                    className="form-control"
                    placeholder="Phone *"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password *"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password *"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <Field
                    className="form-control"
                    component="select"
                    id="type"
                    name="type"
                  >
                    <option className="hidden" selected>
                      Please select your Type
                    </option>
                    <option value="normal_user">Normal User</option>
                    <option value="manager">Manager</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div>
                  <label className="me-2">
                    <b>Sub Manager: </b>
                  </label>
                  <label className="me-2">
                    <Field type="radio" name="role" value="sub_manager" />
                    Yes
                  </label>
                  <label>
                    <Field type="radio" name="role" value="" />
                    No
                  </label>
                </div>

                <input type="submit" className="btnRegister" value="Register" />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Registration;
