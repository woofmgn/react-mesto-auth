import { Link } from "react-router-dom";
import logo from "../images/header-logo.svg";

function Header({ email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__wrapper">
        <p className="header__user-email">{email}</p>
        <Link className="header__button" to="/sign-in">
          Войти
        </Link>
      </div>
    </header>
  );
}

export default Header;
