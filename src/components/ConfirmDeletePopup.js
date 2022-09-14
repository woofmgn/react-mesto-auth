import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({
  isOpen,
  onClose,
  selectedCard,
  setSelectedCard,
  handleCardDeleteConfirm,
  buttonLoading,
}) {
  const handleDeleteClick = (evt) => {
    evt.preventDefault();
    handleCardDeleteConfirm(selectedCard);
    setSelectedCard({});
  };

  return (
    <PopupWithForm
      title={"Вы уверены?"}
      name={"delete"}
      buttonText={"Удалить"}
      buttonTextLoader={"Удаление"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteClick}
      buttonLoading={buttonLoading}
    />
  );
}

export default ConfirmDeletePopup;
