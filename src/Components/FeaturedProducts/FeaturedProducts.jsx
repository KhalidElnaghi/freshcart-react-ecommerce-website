import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function FeaturedProducts({ getCart }) {
  let { addToCart } = useContext(CartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("Product Successfully Added");
      getCart();
    }
  }

  const getFeaturedProducts = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };

  let { data, isLoading } = useQuery("featuredProducts", getFeaturedProducts);

  return (
    <>
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
          {data?.data.data.map((product) => {
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
