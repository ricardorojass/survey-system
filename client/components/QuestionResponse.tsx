import React, { useState, useEffect } from 'react'
import { Question } from '../types'

interface Props {
  question?: Question,
  onUpdateQuestion: any,
  selectedOption: any
}

const QuestionResponse = ({ question, onUpdateQuestion, selectedOption }: Props) => {
  console.log('Q comp', question);
  
  return (
    <section className="bg-white shadow-lg mt-10">
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
                  name={`option-${option.id}`}
                  checked={ option.id === selectedOption }
                  onChange={e => onUpdateQuestion(question.id, option.id)}/>
                <span>{option.description}</span>
              </label>
          </div>
        )}
        {/*end body*/}
      </div>
    </section>  
  )

}

export default QuestionResponse
