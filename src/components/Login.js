import { useNavigate } from "react-router-dom";

function Login({
  email,
  setEmail,
  password,
  setPassword,
  onChangeLoginStatus,
}) {
  let navigate = useNavigate();

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const authorize = () => {
    return fetch("https://auth.nomoreparties.co/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return res;
      })
      .then(() => {
        onChangeLoginStatus();
        navigate("/");
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {
        setEmail("");
        setPassword("");
      });
  };

  const handleAuthorizeSubmit = (evt) => {
    evt.preventDefault();
    authorize();
  };

  return (
    <>
      <section className="auth auth_type_signup">
        <h3 className="auth__title">Вход</h3>
        <form
          className="auth-form auth-form__login"
          onSubmit={handleAuthorizeSubmit}
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
          <button className="auth-form__submit">Войти</button>
        </form>
      </section>
    </>
  );
}

export default Login;
