import logo from '../images/header-logo.svg';
import React from "react";
import {Link, Route, Switch} from 'react-router-dom';

function Header({email, onSignOut}) {
  const handleSignOut = function () {
    onSignOut();
  }

  return (
    <header className="header">
      <img src={logo} alt="Mesto Russia лого" className="header__logo"/>
      <nav>
        <ul className="header__navigation">
          <Switch>
            <Route path="/sign-up">
              <li>
                <Link to="/sign-in" className="header__link">Войти</Link>
              </li>
            </Route>
            <Route path="/sign-in">
              <li>
                <Link to="/sign-up" className="header__link">Регистрация</Link>
              </li>
            </Route>
            <Route path="/">
              <div className="header__container">
                <li>
                  <p className="header__email">{email}</p>
                </li>
                <li>
                  <Link to="/sign-in" className="header__link" onClick={handleSignOut}>Выйти</Link>
                </li>
              </div>
            </Route>
          </Switch>
        </ul>
      </nav>

    </header>
  )
}

export default Header;
