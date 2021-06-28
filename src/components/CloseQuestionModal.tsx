import Modal from 'react-modal';

type CloseQuestionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  questionId: string;
  handleDeleteQuestion: (questionId: string) => Promise<void>
}

export function CloseQuestionModal({ isOpen, onRequestClose, handleDeleteQuestion, questionId }: CloseQuestionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
    <button onClick={() => handleDeleteQuestion(questionId)}>Confirmar</button>
    <button onClick={onRequestClose}>Cancelar</button>
  </Modal>
  )
}