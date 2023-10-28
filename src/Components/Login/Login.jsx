import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../Context/UserTokenContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setUserToken } = useContext(UserTokenContext);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/;

  const submitLogin = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });

    if (data.message === "success") {
      setLoading(false);
      localStorage.setItem("freshcartUserToken", data.token);
      setUserToken(data.token);
      navigate("/home");
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("invaild email  please enter a vaild email")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must have upper & lower case letter, special character, number and min length is 8"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger"> {error} </div> : null}
        <h3 className="mb-3">Login Now </h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mt-2 mb-3"
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password :</label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mt-2 mb-3"
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          {loading ? (
            <button className="btn bg-main border-0 text-white" disabled type="button">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <>
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white me-3"
              >
                Login
              </button>
              <Link to={"/register"}>Register now</Link>
            </>
          )}
        </form>
      </div>
    </>
  );
}
