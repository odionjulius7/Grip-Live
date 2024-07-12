import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

import "../assets/error.css";

// Yup validation setting, yup doc
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid") // formik.errors
    .required("Email is Required"), //formik.touched
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Formik state, check doc
  const formik = useFormik({
    // initial form state
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema, // to validate the yup setup schema
    onSubmit: (values) => {
      // pass the value of the data got from formik to the login action
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;
  const token = user?.data?.token;

  // reload page because of token error
  useEffect(() => {
    if (token) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [token]);

  return (
    <div
      className="py-5"
      style={{ background: "#1c1b1b52", minHeight: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        className="my-5 bg-white rounded-3 mx-auto p-4"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <div className="error text-center">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "blue" }}
            type="submit"
          >
            {isLoading ? "signing you in" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
