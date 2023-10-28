import React from "react";
import Slider from "react-slick";

import img1 from "../../assets/images/blog-img-1.jpeg";
import img2 from "../../assets/images/blog-img-2.jpeg";

import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8 p-0">
          <Slider {...settings}>
            <img height={400} className="w-100" src={slide1} alt="" />
            <img height={400} className="w-100" src={slide2} alt="" />
            <img height={400} className="w-100" src={slide3} alt="" />
          </Slider>
        </div>
        <div className="col-md-4 abs p-0">
          <img height={200} className="w-100" src={img1} alt="" />
          <img height={200} className="w-100" src={img2} alt="" />
        </div>
      </div>
    </>
  );
}
