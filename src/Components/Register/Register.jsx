import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const phoneRegex = /^01[0125][0-9]{8}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/;
  // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const submitRegister = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });

    if (data.message === "success") {
      setLoading(false);
      navigate("/login");
    }
  };

  //! native validation
  // const validate = (values) => {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "name miniumum lenght is 3 char";
  //   } else if (values.name.length > 10) {
  //     errors.name = "name maxiumum lenght is 10 char";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "Phone is required";
  //   } else if (!phoneRegex.test(values.phone)) {
  //     errors.phone = "invaild phone number please enter a vaild number";
  //   }

  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (!emailRegex.test(values.email)) {
  //     errors.email = "invaild email  please enter a vaild email";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (!passwordRegex.test(values.password)) {
  //     errors.password = `Password must have  upper & lower case letter, special character, number and min length is 8`;
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = "rePassword is required";
  //   } else if (values.rePassword !== values.password) {
  //     errors.rePassword = "Not Matched";
  //   }

  //   return errors;
  // };

  //! Yup validation
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name miniumum lenght is 3 char")
      .max(10, "name maxiumum lenght is 10 char")
      .required("name is required"),
    email: Yup.string()
      .email("invaild email  please enter a vaild email")
      .required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegex, "invaild phone number please enter a vaild number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must have upper & lower case letter, special character, number and min length is 8"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Not Matched")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    // validate,
    onSubmit: submitRegister,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="w-75 mx-auto py-5">
        {error ? <div className="alert alert-danger"> {error} </div> : null}
        <h3 className="mb-3">Register Now </h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">name :</label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mt-2 mb-3"
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}

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

          <label htmlFor="phone">phone :</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mt-2 mb-3"
            type="tel"
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
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

          <label htmlFor="rePassword">rePassword :</label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control mt-2 mb-3"
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}
          {loading ? (
            <button className="btn bg-main border-0 text-white" disabled type="button">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white "
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
