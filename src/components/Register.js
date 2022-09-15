function Register() {
  return (
    <>
      <section className="auth auth_type_signup">
        <h3 className="auth__title">Регистрация</h3>
        <form className="auth-form auth-form__registration">
          <input
            className="auth-form__input auth-form__input_type_email popup__form-item"
            type="email"
            placeholder="Email"
          />
          <input
            className="auth-form__input auth-form__input_type_password popup__form-item"
            type="password"
            placeholder="Пароль"
          />
          <button className="auth-form__submit">Зарегистрироваться</button>
        </form>
        <a className="auth__link" src="#">
          Уже зарегистрированы? Войти
        </a>
      </section>
    </>
  );
}

export default Register;
