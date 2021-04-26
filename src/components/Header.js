import logo from '../images/header-logo.svg';
import React, {useState} from "react";
import {Link, Route, Switch, useRouteMatch} from 'react-router-dom';

function Header({email, onSignOut}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const isMain = useRouteMatch({path: "/", exact: true});

  const handleSignOut = function () {
    onSignOut();
  }

  return (
    <header className={`header page__section
         ${isMenuOpen ? "header_menu-open" : ""}
         ${isMain ? "header_page-main" : ""}`}
    >
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
              <button
                className='header__burger'
                type='button'
                aria-label='меню'
                onClick={toggleMenu}
              ></button>
              <div className="header__wrapper">
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
