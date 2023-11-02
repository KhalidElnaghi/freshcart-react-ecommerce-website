import React, { useContext } from "react";
import Style from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import profileimg from "../../assets/images/profile.svg";
import { CartContext } from "../../Context/CartContext";

export default function NavBar() {
  let { userToken, setUserToken, setUserData } = useContext(UserContext);
  let { cartItemCount } = useContext(CartContext);
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("freshcartUserToken");
    localStorage.removeItem("userData");
    setUserToken(null);
    setUserData(null);
    navigate("./login");
  };

  return (
    <>
      <nav
        className={`${Style.navbar} navbar navbar-expand-lg bg-body-tertiary fixed-top`}
      >
        <div className="container">
          <NavLink className="navbar-brand" to="home">
            <img src={logo} alt="fresh cart logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/brands">
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              {userToken ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link cart-icon position-relative" to="/cart">
                      <i className="fa-solid fa-cart-shopping fa-xl text-main" />
                      <div className="cart-items">{cartItemCount}</div>
                    </NavLink>
                  </li>
                  <li className={`nav-item bg-dark ${Style.profile_icon}`}>
                    <NavLink className="nav-link" to="/profile">
                      <img className="w-100" src={profileimg} alt="" />
                    </NavLink>
                  </li>
                  <li onClick={logOut} className="nav-item cursor-pointer">
                    <span className="nav-link">Logout</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
