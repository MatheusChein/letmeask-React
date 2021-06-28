import { useEffect, useState, Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question as QuestionComponent} from '../components/Question'
import { CloseQuestionModal } from '../components/CloseQuestionModal'

import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'
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

  const { questions, roomTitle } = useRoom(roomId)

  const history = useHistory()
  
  // const { user } = useAuth()

  // useEffect(() => {
  //   if (!user) {
  //     history.push('/')
  //   }
  // }, [user, history])

  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/')
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
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId}/>
            <Button 
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {roomTitle}</h1>
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