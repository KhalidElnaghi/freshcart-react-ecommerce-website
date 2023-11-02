import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Brands() {
  const getBrands = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  };

  let { data, isLoading } = useQuery("Brands", getBrands);

  console.log(data?.data.data);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {isLoading ? (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1" />
          <div className="sk-cube sk-cube2" />
          <div className="sk-cube sk-cube3" />
          <div className="sk-cube sk-cube4" />
          <div className="sk-cube sk-cube5" />
          <div className="sk-cube sk-cube6" />
          <div className="sk-cube sk-cube7" />
          <div className="sk-cube sk-cube8" />
          <div className="sk-cube sk-cube9" />
        </div>
      ) : (
        <div className="row">
          {data?.data.data.map((brand) => {
            return (
              <div key={brand._id} className="col-md-3 col-sm-6 my-4">
                <div className="product cursor-pointer py-3 px-2">
                  <img className="w-100" src={brand.image} alt={brand.slug} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
