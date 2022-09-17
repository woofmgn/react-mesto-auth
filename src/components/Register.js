import { Link } from "react-router-dom";

function Register({ email, setEmail, password, setPassword, onRegister }) {
  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    onRegister();
  };

  return (
    <>
      <section className="auth auth_type_signup">
        <h3 className="auth__title">Регистрация</h3>
        <form
          className="auth-form auth-form__registration"
          onSubmit={handleRegisterSubmit}
        >
          <input
            className="auth-form__input auth-form__input_type_email popup__form-item"
            type="email"
            placeholder="Email"
            onChange={handleChangeEmail}
            value={email || ""}
          />
          <input
            className="auth-form__input auth-form__input_type_password popup__form-item"
            type="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            value={password || ""}
          />
          <button className="auth-form__submit">Зарегистрироваться</button>
        </form>
        <p className="auth__subtitle">
          Уже зарегистрированы?
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </section>
    </>
  );
}

export default Register;
