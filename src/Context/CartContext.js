import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = { token: localStorage.getItem("freshcartUserToken") };

  const addToCart = async (productId) => {
    return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      { headers }
    );
  };

  const getLoggedUserCart = async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    });
  };

  const deleteCartItem = async (productId) => {
    return await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers,
      }
    );
  };

  const clearAllCart = async () => {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
      headers,
    });
  };

  const updateProductQuantity = async (productId, count) => {
    return await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers }
    );
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        deleteCartItem,
        clearAllCart,
        updateProductQuantity,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
