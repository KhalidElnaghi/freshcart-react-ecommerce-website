import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  const getCategories = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  };

  let { data } = useQuery("categorySlider", getCategories);

  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 7,
    speed: 500,
  };

  return ( 
    <>
      {data?.data.data ? (
        <Slider {...settings}>
          {data?.data.data.map((category) => {
            return (
              <div key={category._id} className="mt-3">
                <img height={200} src={category.image} className="w-100" alt="" />
              </div>
            );
          })}
        </Slider>
      ) : null}
    </>
  );
}
