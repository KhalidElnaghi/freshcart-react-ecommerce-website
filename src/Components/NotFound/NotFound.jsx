import React from "react";
import errorImg from "../../assets/images/error.svg";
import { Helmet } from "react-helmet";


export default function NotFound() {
  return (
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>NotFound</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center">
        <img src={errorImg} alt="" className="w-75" />
      </div>
    </>
  );
}
