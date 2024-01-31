import home from "../assets/img/home.png";
import logo from "../assets/img/logo.png";
import reg from "../assets/img/registration.png";
import profile from "../assets/img/profile.png";
import cart from "../assets/img/cart.png";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
    console.log(accessToken)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  }

  return (
    <div className="header">
        <div className="logo" id="logo">
            <img src={logo} alt="logo" className="img" />
            <span className={"nav-label"}>Kartelles</span>
        </div>
        <div className="nav-links">
            <Link to={"/"} className={"nav-item"}>
                <img src={home} alt="Home" className="img" />
                <span className="nav-label">Home</span>
            </Link>
            {isLoggedIn ? (
                    <>

                        <Link to={"/profile"} className={"nav-item"}>
                            <img src={profile} alt={"profile"} className={"img"} />
                            <span className="nav-label">profile</span>
                        </Link>

                        <Link to={"/cart"} className={"nav-item"}>
                            <img src={cart} alt={"cart"} className={"img"} />
                            <span className="nav-label">Cart</span>
                        </Link>

                        <button className={"nav-item"} onClick={handleLogout} >
                            <img src={reg} alt={"logout"} className={"img"} />
                            <span className="nav-label">logout</span>
                        </button>
                    </>
                ) : (
                    <Link to={"/Login"} className={"nav-item"}>
                        <img src={reg} alt={"login"} className={"img"} />
                        <span className="nav-label">login</span>
                    </Link>
                )}
        </div>
    </div>
  );
}

export default Header;
