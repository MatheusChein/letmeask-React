import { ReactNode } from 'react'
import '../styles/question.scss'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string
  },
  children: ReactNode;
  isAnswered?: boolean
  isHighlited?: boolean
}

export function Question({ content, author, children, isAnswered = false, isHighlited = false}: QuestionProps) {
  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlited && !isAnswered ? 'highlighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}