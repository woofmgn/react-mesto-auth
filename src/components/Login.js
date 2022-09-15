function Login() {
  return (
    <>
      <section className="auth auth_type_signup">
        <h3 className="auth__title">Вход</h3>
        <form className="auth-form auth-form__login">
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
          <button className="auth-form__submit">Войти</button>
        </form>
      </section>
    </>
  );
}

export default Login;
