function InfoTooltip({ isOpen, onClose }) {
  return (
    <div className={`popup popup_type_auth ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_auth">
        <button
          className="popup__close-window"
          type="button"
          onClick={onClose}
        />
        <h3 className="popup__title popup__title_type_auth">
          Что-то пошло не так! Попробуйте ещё раз.
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
