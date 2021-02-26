import logo from '../images/header-logo.svg';
import React from "react";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Mesto Russia лого" className="header__logo"/>
    </header>
  )
}

export default Header;
