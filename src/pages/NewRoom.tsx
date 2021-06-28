import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'

import { database } from '../services/firebase'

import { useTheme } from '../hooks/useTheme'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import darkLogoImg from '../assets/images/dark-logo.svg'

import '../styles/auth.scss'

export function NewRoom() {
  const [newRoom, setNewRoom] = useState('')
  const history = useHistory()
  const { user } = useAuth()

  const { theme, toggleTheme } = useTheme()


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
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
          <img src={theme === 'dark' ? darkLogoImg : logoImg} alt="letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder='Nome da sala'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
           />
           <Button type="submit">
             Criar sala
           </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}