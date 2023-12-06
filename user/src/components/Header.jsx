//img imports
import home from "../assets/img/home.png";
import logo from "../assets/img/logo.png";
// import reg from "../assets/img/registration.png";
// import profile from "../assets/img/profile.png";
// import cart from "../assets/img/cart.png";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {

    useEffect(() => {
        fetch('http://192.168.1.103:5000/')
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Произошла ошибка:', error));
    }, [])

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
            </div>
        </div>
    );
}

export default Header;