import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';

import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { useEffect } from 'react';

const schema = Yup.object().shape({
  roomCode: Yup.string().required('Campo obrigatório')
})

export function Home() {
  const history = useHistory();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema)
  })
  
  const { signInWithGoogle, user } = useAuth()
  
  const { theme, toggleTheme } = useTheme()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    
    history.push('/rooms/new')
  }

  async function handleJoinRoom(data: any) {
    const { roomCode } = data

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist');
      return
    }

    if (roomRef.val().endedAt) {
      alert('Room already ended');
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id='page-auth' className={theme}>
      <aside>
        <img src={illustrationImg} alt="Ilustração" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <header>
          <Button onClick={toggleTheme}>Switch Theme</Button>
        </header>
        <div className='main-content'>
          <img src={logoImg} alt="letmeask" />
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleSubmit(handleJoinRoom)}>
            <input 
              type="text"
              placeholder='Digite o código da sala'
              {...register('roomCode')}
           />
           <Button type="submit">
             Entrar na sala
           </Button>
          </form>
        </div>
      </main>
    </div>
  )
}