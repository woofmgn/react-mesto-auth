import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Loader from "./Loader";

function Main({
  cards,
  loading,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  handleCardLike,
  handleCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="content">
          <section className="profile">
            <div className="profile__avatar-button" onClick={onEditAvatar}>
              <img
                className="profile__image"
                src={currentUser.avatar}
                alt="Фото профиля"
              />
            </div>
            <div className="profile__info">
              <div className="profile__user">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={onEditProfile}
                />
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              className="profile__add-button"
              type="button"
              onClick={onAddPlace}
            />
          </section>
          <section className="elements">
            <ul className="element">
              {cards.map((card) => {
                return (
                  <Card
                    card={card}
                    key={card._id}
                    onCardClick={onCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                );
              })}
            </ul>
          </section>
        </main>
      )}
    </>
  );
}

export default Main;
