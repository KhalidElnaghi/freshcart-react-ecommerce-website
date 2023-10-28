import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getLoggedUserCart, deleteCartItem, clearAllCart, updateProductQuantity } =
    useContext(CartContext);
  let [cartDetails, setCartDetails] = useState("");
  let cartItems = document.querySelector(".cart-items");

  const getCart = async () => {
    let { data } = await getLoggedUserCart();

    setCartDetails(data);
  };

  const deleteItem = async (productId) => {
    let data = await deleteCartItem(productId);
    setCartDetails(data);
  };

  const updateCount = async (productId, count) => {
    let { data } = await updateProductQuantity(productId, count);
    setCartDetails(data);
  };

  const clearCart = async () => {
    await clearAllCart();
    setCartDetails(null);
  };

  useEffect(() => {
    getCart();
  }, []);

  if (cartDetails) cartItems.textContent = cartDetails?.numOfCartItems;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {cartDetails ? (
        <div className="w-75 mx-auto px-3 pt-3 bg-main-light">
          <h2>Shopping Cart</h2>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="h6 text-main fw-bolder">
                Cart Items : {cartDetails.numOfCartItems}
              </h4>
              <h4 className="h6 text-main fw-bolder">
                Total Cart Price : {cartDetails.data.totalCartPrice} EGP
              </h4>
            </div>
            <div>
              <button onClick={clearCart} className="btn btn-danger">
                Clear Cart
              </button>
            </div>
          </div>

          {cartDetails.data.products.map((product) => {
            return (
              <div key={product.product.id} className="row border-bottom py-2 ">
                <div className="col-md-2">
                  <Link to={`/productdetails/${product.product._id}`}>
                    <img className="w-100" src={product.product.imageCover} alt="" />
                  </Link>
                </div>
                <div className="col-md-10 pt-5">
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="h6">
                        <Link to={`/productdetails/${product.product._id}`}>
                          {product.product.title.split(" ").slice(0, 3).join(" ")}
                        </Link>
                      </h3>
                      <h6 className="text-main">Price : {product.price} EGP</h6>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          updateCount(product.product._id, product.count + 1);
                        }}
                        className="btn bg-main py-0 px-2"
                      >
                        +
                      </button>
                      <span className="mx-2 product-count">{product.count}</span>
                      <button
                        onClick={() => {
                          updateCount(product.product._id, product.count - 1);
                        }}
                        className="btn btn-outline-danger py-0 px-2"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      deleteItem(product.product._id);
                    }}
                    className="btn  font-sm p-0"
                  >
                    <i className="fas fa-trash-can text-danger"></i> Remove Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <section className="d-flex justify-content-center align-items-center vh-100">
          <div className="h2">Empty Cart</div>
        </section>
      )}
    </>
  );
}
