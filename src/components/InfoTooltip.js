function InfoTooltip({ image, infoMessage, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_auth ${isOpen ? "popup_opened" : ""}`}>
      <div
        className="popup__container popup__container_type_auth"
        style={{ backgroundImage: `url(${image})` }}
      >
        <button
          className="popup__close-window"
          type="button"
          onClick={onClose}
        />
        <h3 className="popup__title popup__title_type_auth">{infoMessage}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
