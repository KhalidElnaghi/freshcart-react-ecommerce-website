import React, { useContext, useEffect, useState } from "react";
// import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/ProductSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function Products() {
  let { products } = useSelector((state) => state.products);
  let dispatch = useDispatch();
  let { addToCart, getLoggedUserCart, setCartItemCount } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  const getCart = async () => {
    let { data } = await getLoggedUserCart();
    setCartItemCount(data.numOfCartItems);
  };

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("Product Successfully Added");
      getCart();
    }
  }

  useEffect(() => {
    dispatch(getProducts());
    setIsLoading(false);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      {/* <FeaturedProducts /> */}
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
          {products?.map((product) => {
            return (
              <div key={product._id} className="col-md-3 col-sm-6 my-4">
                <div className="product cursor-pointer py-3 px-2">
                  <Link to={`/productdetails/${product._id}`}>
                    <img className="w-100" src={product.imageCover} alt={product.title} />
                    <span className="text-main font-sm fw-bolder">
                      {product.category.name}
                    </span>
                    <h3 className="h5">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between mt-3 font-sm">
                      <p>{product.price} EGP</p>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      addProduct(product._id);
                    }}
                    className="btn bg-main text-white w-100 btn-sm mt-2"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
