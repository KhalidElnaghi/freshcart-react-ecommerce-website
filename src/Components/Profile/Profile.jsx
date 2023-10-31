import React from "react";
import { Helmet } from "react-helmet";

export default function Profile() {
  let userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="w-75 mx-auto py-5">
        <h2 className="mb-3">Profile </h2>
        <h4>Name : {userData.name}</h4>
        <h4>Email : {userData.email}</h4>
        <h4>Role : {userData.role}</h4>
      </div>
    </>
  );
}
