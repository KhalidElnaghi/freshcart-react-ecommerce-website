import React, { useContext } from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
// import { useDispatch, useSelector } from "react-redux";
// import { decrease, increase } from "../../Redux/CounterSlice";

export default function Home() {
  let { getLoggedUserCart, setCartItemCount } = useContext(CartContext);
  // let { counter } = useSelector((state) => state.counter);
  // let dispatch = useDispatch();

  const getCart = async () => {
    let { data } = await getLoggedUserCart();
    setCartItemCount(data.numOfCartItems);
  };
  getCart();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* <h1>{counter}</h1>
      <button
        onClick={() => {
          dispatch(increase());
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(decrease());
        }}
      >
        - 
      </button>*/}
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts getCart={getCart} />
    </>
  );
}


