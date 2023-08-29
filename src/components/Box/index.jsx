import Modal from "react-modal";
import "./styles.css"


export function Box({ modalIsOpen, handleDeletedDish, handleCloseModal }) {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        overlayClassName="modal-overlay"
        className="modal-content"
        contentLabel="Caixa de confirmação para remover prato"
      >
        <h2>Deseja realmente remover o prato?</h2>
        <div>
          <button onClick={handleDeletedDish} >Sim</button>
          <button onClick={handleCloseModal} >Não</button>
        </div>
      </Modal>
    </>
  )
}