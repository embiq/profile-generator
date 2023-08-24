import React, { useState } from "react";
import { ButtonWithModalProps } from "./ButtonWithModalProps";
import styles from "./ButtonWithModal.module.scss";
import Modal from "react-modal";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ButtonWithModal: React.FC<ButtonWithModalProps> = ({ disabled = false, title = "", buttonText, modalQuestion, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button className="btn" type="button" onClick={openModal} disabled={disabled} title={title}>
        {buttonText}
      </button>
      <Modal isOpen={isModalOpen} style={modalStyles} onRequestClose={closeModal} shouldCloseOnOverlayClick>
        <p>{modalQuestion}</p>
        <div className={styles.modalButtons}>
          <button
            className="btn"
            type="button"
            onClick={() => {
              onClick();
              closeModal();
            }}
          >
            Yes
          </button>
          <button className="btn" type="button" onClick={closeModal}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
};
