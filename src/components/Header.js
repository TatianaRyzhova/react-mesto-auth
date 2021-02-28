import logo from '../images/header-logo.svg';
import React from "react";
import {Route, Switch, Link} from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Mesto Russia лого" className="header__logo"/>
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="menu">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="menu">Регистрация</Link>
        </Route>
      </Switch>

    </header>
  )
}

export default Header;
