import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-main-light py-5">
        <div className="container">
          <h3>Get the Fresh Cart App</h3>
          <p className="font-sm opacity-75">
            We Will send you a link, ioen it on your phone to download the app
          </p>
          <div className="row g-3">
            <div className="col-lg-9">
              <input
                type="text"
                name=""
                placeholder="Email..."
                className="form-control"
              />
            </div>
            <div className="col-sm">
              <button className="btn bg-main text-white px-sm-5">Share App Link</button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
