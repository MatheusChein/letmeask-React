import Modal from 'react-modal';

import { Button } from './Button';

import deleteImg from '../assets/images/delete.svg'

import '../styles/modal.scss'

type EndRoomModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  handleEndRoom: () => Promise<void>
}


export function EndRoomModal({ isOpen, onRequestClose, handleEndRoom }: EndRoomModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal'
    >
      <img src={deleteImg} alt="" />
      <h1>Encerrar sala</h1>
      <p>Tem certeza que você deseja encerrar esta sala?</p>
      <div>
        <Button className='button confirm' onClick={() => handleEndRoom()}>Sim, encerrar</Button>
        <Button className='button cancel' onClick={onRequestClose}>Cancelar</Button>
      </div>
  </Modal>
  )
}