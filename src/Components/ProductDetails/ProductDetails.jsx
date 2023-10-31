import axios from "axios";
// import  { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { id } = useParams();
  let { addToCart } = useContext(CartContext);
  // let [productDetails, setProductDetails] = useState([]);

  const getProduct = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };
  let { data } = useQuery("productDetails", getProduct, {
    cacheTime: 500,
    // refetchOnMount: true,
    // staleTime: 500,
    // refetchInterval:1000,
  });
  // const getProduct = async () => {
  //   let { data } = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/products/${id}`
  //   );
  //   setProductDetails(data.data);
  // };
  // useEffect(() => {
  //   getProduct();
  // }, []);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("Product Successfully Added");
    }
  }

  var settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.data.data.title}</title>
      </Helmet>
      {data?.data.data ? (
        <div className="row align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>
              {data?.data.data.images.map((img, index) => {
                return (
                  <img
                    key={index}
                    className="w-100"
                    src={img}
                    alt={data?.data.data.title}
                  />
                );
              })}
            </Slider>
          </div>
          <div className="col-md-8 ps-4">
            <h2>{data?.data.data.title}</h2>
            <p className="mb-4">{data?.data.data.description}</p>
            <h6 className="text-main">{data?.data.data.category.name}</h6>
            <h6>Price : {data?.data.data.price} EGP</h6>
            <span>
              <i className="fas fa-star rating-color"></i>{" "}
              {data?.data.data.ratingsAverage}
            </span>
            <button
              onClick={() => {
                addProduct(data.data.data._id);
               
              }}
              className="btn bg-main text-white w-100 btn-sm mt-2"
            >
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
