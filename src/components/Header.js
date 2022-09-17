import { Link, Route, Routes, useLocation } from "react-router-dom";
import logo from "../images/header-logo.svg";

function Header({ email, onLogOutUser }) {
  let location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__wrapper">
        <p className="header__user-email">
          {location.pathname === "/" ? email : ""}
        </p>
        <Routes>
          <Route
            path="sign-up"
            element={
              <Link className="header__button" to="/sign-in">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link
                className="header__button"
                to="/sign-in"
                onClick={() => onLogOutUser()}
              >
                Выйти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__button" to="/sign-up">
                Регистрация
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
