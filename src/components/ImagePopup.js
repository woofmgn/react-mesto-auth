function ImagePopup({card, isOpen, onClose}) {
  return (
  <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
    <figure className="popup__container popup__container_type_image">
      <button className="popup__close-window popup__close-window_type_image" type="button" onClick={onClose}></button>
      <img className="popup__image-item" src={card.link} alt={card.name} />
      <figcaption className="popup__title-image">{card.name}</figcaption>
    </figure>
  </div>
  )
}

export default ImagePopup;