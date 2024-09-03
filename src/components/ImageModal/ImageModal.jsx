import Modal from "react-modal";
import css from "./ImageModal.module.css";
export default function ImageModal({ isOpen, onRequestClose, image }) {
  console.log(image);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img
        src={image.urls.regular}
        alt={image.description}
        className={css.img}
      />
    </Modal>
  );
}
