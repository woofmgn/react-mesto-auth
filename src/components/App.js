import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Main from "./Main";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "./Register";

import regComplete from "../images/loginAccept.svg";
import LogInFailed from "../images/loginFailed.svg";

function App() {
  let navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopup, setDeleteCardPopup] = useState(false);
  const [isAuthPopup, setAuthPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [tooltipImage, setTooltipImage] = useState("");

  const dataPreload = () => {
    setLoading(true);

    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isLogged) {
      dataPreload();
    }
  }, [isLogged]);

  useEffect(() => {
    if (isLogged) {
      api
        .getUserProfile()
        .then((userProfile) => setCurrentUser(userProfile))
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLogged]);

  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleSetLoginStatus = () => {
    setIsLogged(!isLogged);
  };

  const handleAuthPopup = () => {
    setAuthPopup(!isAuthPopup);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(!isImagePopupOpen);
  };

  // получаем стейт удаляемой карточки
  const handleSelectDeleteCardClick = (card) => {
    setSelectedCard(card);
    setDeleteCardPopup(!isDeleteCardPopup);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setDeleteCardPopup(false);
    setAuthPopup(false);
    setInfoMessage("");
    setSelectedCard({});
  };

  const handleRegisterUser = () => {
    auth
      .register(email, password)
      .then((res) => {
        return res;
      })
      .then(() => {
        navigate("/sign-in");
        setInfoMessage("Вы успешно зарегистрировались!");
        setTooltipImage(regComplete);
        handleAuthPopup();
      })
      .catch((err) => {
        setInfoMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setTooltipImage(LogInFailed);
        handleAuthPopup();
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setEmail("");
        setPassword("");
      });
  };

  const handleAuthorizeUser = () => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      })
      .then(() => {
        handleSetLoginStatus();
        navigate("/");
      })
      .catch((err) => {
        setInfoMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setTooltipImage(LogInFailed);
        handleAuthPopup();
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setPassword("");
      });
  };

  const handleCheckToken = () => {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      auth
        .checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          handleSetLoginStatus();
          navigate("/");
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  };

  const handleUserLogOut = () => {
    if (isLogged) {
      localStorage.removeItem("token");
      handleSetLoginStatus();
      navigate("/sign-in");
    }
  };

  const handleUpdateUser = (userInfo) => {
    setButtonLoading(true);
    api
      .setUserProfile(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setButtonLoading(false));
  };

  const handleUpdateAvatar = (avatarInfo) => {
    setButtonLoading(true);
    api
      .setUserAvatar(avatarInfo)
      .then((newAvatarInfo) => {
        setCurrentUser(newAvatarInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setButtonLoading(false));
  };

  const handleAddPlaceSubmit = (cardTitle, cardLink) => {
    setButtonLoading(true);
    api
      .addNewCard(cardTitle, cardLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setButtonLoading(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const handleCardDelete = (card) => {
    setButtonLoading(true);
    const isOwner = card.owner._id === currentUser._id;

    api
      .delCard(card._id, isOwner)
      .then(() => {
        setCards((state) => state.filter((c) => card._id !== c._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setButtonLoading(false));
  };

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header email={email} onLogOutUser={handleUserLogOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLogged={isLogged}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleSelectDeleteCardClick}
                    cards={cards}
                    loading={loading}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  onRegister={handleRegisterUser}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  onLogin={handleAuthorizeUser}
                />
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonLoading={buttonLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonLoading={buttonLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonLoading={buttonLoading}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
          <ConfirmDeletePopup
            isOpen={isDeleteCardPopup}
            onClose={closeAllPopups}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            handleCardDeleteConfirm={handleCardDelete}
            buttonLoading={buttonLoading}
          />
          <InfoTooltip
            infoMessage={infoMessage}
            image={tooltipImage}
            isOpen={isAuthPopup}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
