import React from 'react'
import { AnswerFromUser } from '../types'

interface Props {
  answer: AnswerFromUser
}

const AnswerComponent = ({ answer }: Props) => {

  return (
    <div className="bg-white border-cards mt-4">
      <div className="px-6 py-4">
        <p>{answer.questionTitle}</p>
        <small>{answer.numResponses}</small>
      </div>
    </div>
  )

}

export default AnswerComponent
