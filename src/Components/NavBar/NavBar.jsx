import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { UserTokenContext } from "../../Context/UserTokenContext";

export default function NavBar() {
  let { userToken, setUserToken } = useContext(UserTokenContext);
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("freshcartUserToken");
    setUserToken(null);
    navigate("./login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
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
                  <NavLink className="nav-link" to="/categories">
                    Categories
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/brands">
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <li className="nav-item d-flex gap-3 align-items-center me-2">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-linkedin"></i>
                <i className="fab fa-github"></i>
                <i className="fab fa-twitter"></i>
              </li> */}
              {userToken ? (
                <>
                  <li className="nav-item ">
                    <NavLink className="nav-link cart-icon position-relative" to="/cart">
                      <i className="fa-solid fa-cart-shopping fa-xl text-main" />
                      <div className="cart-items">0</div>
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
