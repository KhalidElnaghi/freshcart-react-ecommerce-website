import React, { useContext } from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";

export default function Home() {
  let { getLoggedUserCart, setCartItemCount } = useContext(CartContext);

  const getCart = async () => {
    let { data } = await getLoggedUserCart();
    setCartItemCount(data.numOfCartItems);
    console.log(data);
  };
  getCart();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
}
