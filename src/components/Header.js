import { Link, useLocation } from "react-router-dom";
import logo from "../images/header-logo.svg";

function Header({ email, isLogged, onLogOutUser }) {
  let location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__wrapper">
        <p className="header__user-email">
          {location.pathname === "/" ? email : ""}
        </p>
        {isLogged ? (
          <Link
            className="header__button"
            to="/sign-in"
            onClick={() => onLogOutUser()}
          >
            Выйти
          </Link>
        ) : location.pathname === "/sign-up" ? (
          <Link className="header__button" to="/sign-in">
            Войти
          </Link>
        ) : (
          <Link className="header__button" to="/sign-up">
            Регистрация
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
