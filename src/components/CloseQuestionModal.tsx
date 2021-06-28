import Modal from 'react-modal';

import { Button } from './Button';

import deleteImg from '../assets/images/delete.svg'

import '../styles/modal.scss'

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
      overlayClassName='react-modal-overlay'
      className='react-modal'
    >
      <img src={deleteImg} alt="" />
      <h1>Excluir pergunta</h1>
      <p>Tem certeza que você deseja excluir esta pergunta?</p>
      <div>
        <Button className='button confirm' onClick={() => handleDeleteQuestion(questionId)}>Sim, excluir</Button>
        <Button className='button cancel' onClick={onRequestClose}>Cancelar</Button>
      </div>
  </Modal>
  )
}