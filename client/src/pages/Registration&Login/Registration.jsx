import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { register } from "../../redux/slices/auth";
import { clearMessage } from "../../redux/slices/message";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { validationSchema } from "../../validation/LoginAndReg";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { message } = useSelector((state) => state.message);

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
    setLoading(true);
    dispatch(register(formValue))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.success("Successfully registered!");
        resetForm();
        history("/login");
        dispatch(clearMessage());
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <>
      <div className="app-wrapper">
        <div className="login-wrapper">
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <div className="form-wrapper cardBody">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <Form>
                <div className="row ">
                  <h3 className="heading">Registration</h3>
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
                          Type
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
                  </div>
                  <div className="text-center text-white mb-3">
                    <label className=" me-2">
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
                  <p className="heading">
                    Do you have an account??
                    <Link to="/login">Go to Login</Link>
                  </p>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Register</span>
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
