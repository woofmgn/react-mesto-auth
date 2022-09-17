function PopupWithForm({
  name,
  title,
  buttonText,
  buttonTextLoader,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonLoading,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="popup__close-window"
          type="button"
          onClick={onClose}
        />
        <form
          className="popup__form popup__form_type_profile form"
          name={name}
          onSubmit={onSubmit}
        >
          <fieldset className="popup__input-container">
            {children}
            <button
              className={`popup__form-button ${
                buttonLoading ? "popup__form-button_inactive" : ""
              }`}
              type="submit"
            >
              {buttonLoading ? `${buttonTextLoader}` : `${buttonText}`}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
