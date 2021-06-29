import { useEffect, useState, Fragment } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question as QuestionComponent} from '../components/Question'
import { CloseQuestionModal } from '../components/CloseQuestionModal'
import { EndRoomModal } from '../components/EndRoomModal'

import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { useTheme } from '../hooks/useTheme'

import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'
import darkLogoImg from '../assets/images/dark-logo.svg'

import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>()
  const roomId = params.id;

  const [questionIdModalOpen, setQuestionIdModalOpen] = useState<string | undefined>()
  const [isEndRoomModalOpen, setIsEndRoomModalOpen] = useState(false)

  const { questions, roomTitle } = useRoom(roomId)

  const history = useHistory()
  
  const { user } = useAuth()

  const { theme, toggleTheme } = useTheme()


  // useEffect(() => {
  //   if (!user) {
  //     history.push('/')
  //   }
  // }, [user, history])


  function handleToggleRoomVision() {
    history.push(`/rooms/${roomId}`)
  }

  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date()
    });

    handleCloseEndRoomModal()

    history.push('/')
  }

  function handleCloseEndRoomModal() {
    setIsEndRoomModalOpen(false)
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighlited: true
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();

    handleCloseQuestionModal()
  }

  function handleCloseQuestionModal() {
    setQuestionIdModalOpen(undefined)
  }


  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
          <Link to="/">
          <img src={theme === 'dark' ? darkLogoImg : logoImg} alt="letmeask" />
          </Link>
          <div className='buttons'>
            <RoomCode code={roomId}/>
            <Button 
              isOutlined
              onClick={handleToggleRoomVision}
            >
              Visão do usuário 
            </Button>
            <Button 
              isOutlined
              onClick={() => setIsEndRoomModalOpen(true)}
            >
              Encerrar sala
            </Button>

            <EndRoomModal 
              isOpen={isEndRoomModalOpen}
              handleEndRoom={handleEndRoom}
              onRequestClose={handleCloseEndRoomModal}

            />

            <Button onClick={toggleTheme}>Switch Theme</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1 className={theme}>Sala {roomTitle}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list question-list-admin">
          {questions.map(question => (
            <Fragment key={question.id}>
              <QuestionComponent 
              content={question.content} 
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlited={question.isHighlited}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type='button'
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="marcar pergunta como respondida" />
                  </button>

                  <button
                    type='button'
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="dar destaque à pergunta" />
                  </button>
                </>
              )}

              <button
                type='button'
                onClick={() => setQuestionIdModalOpen(question.id)}
              >
                <img src={deleteImg} alt="remover pergunta" />
              </button>
            </QuestionComponent>
            <CloseQuestionModal 
              isOpen={questionIdModalOpen === question.id}
              onRequestClose={handleCloseQuestionModal}
              questionId={question.id}
              handleDeleteQuestion={() => handleDeleteQuestion(question.id)}
            />
            </Fragment>
          ))}
        </div>
      </main>

      
    </div>
  )
}