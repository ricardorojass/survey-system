import React, { useState, useEffect } from 'react'
import { Question } from '../types'

interface Props {
  question?: Question,
  onUpdateQuestion: any
}

const QuestionResponse = ({ question, onUpdateQuestion }: Props) => {
  console.log('Q comp', question);
  
  return (
    <section key={question.id} className="bg-white shadow-lg mt-10">
      <div className="px-6 pt-4">
        {/*body*/}
        <p>{question.title}</p>
        {/* todo: create option component */}
        { question.options.map(option =>
          <div
            key={option.id}
            className="mb-3 flex items-center">
              <label className="flex-grow">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  name="option"
                  value={option.description}
                  checked={option.selected === option.description}
                  onChange={e => onUpdateQuestion(e.target.value, question.id, option.id)}/>
                <span>{option.description}</span>
              </label>
          </div>
        )}
        {/*end body*/}
        {/*Footer*/}

        {/*end Footer*/}
      </div>
    </section>  
  )

}

export default QuestionResponse
