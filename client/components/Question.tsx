import React, { useState, useEffect } from 'react'
import { Question } from '../types'

interface Props {
  question?: Question,
  onUpdateQuestion: any,
  onDeleteQuestion: any,
  onUpdateOption: any,
  onAddOption: any,
  onDeleteOption: any,
}

const QuestionComponent = ({ question, onUpdateQuestion, onDeleteQuestion, onUpdateOption, onAddOption, onDeleteOption }: Props) => {
  console.log('Q comp', question);
  
  return (
    <section className="bg-white shadow-lg mt-10">
      <div className="px-6 pt-4">
        {/*body*/}
        <div className="form-group">
          <textarea
            rows={1}
            className="text-3xl border-t-0 border-l-0 border-r-0 border-b-1"
            name="title"
            value={question.title}
            onChange={e => onUpdateQuestion(question.id, e.target.name, e.target.value) }>
          </textarea>
        </div>
        {/* todo: create option component */}
        { question.options.map(option =>
          <div
            key={option.id}
            className="mb-3 flex items-center">
              <label className="flex-grow">
                <input
                  className="mr-2 leading-tight"
                  type="radio"
                  disabled
                  name="option"
                  value={option.description}/>
                <input
                  className="text-sm border-t-0 border-l-0 border-r-0 border-b-0 w-10/12"
                  type="text"
                  name="description"
                  value={option.description}
                  onChange={e => onUpdateOption(question.id, option.id, e.target.name, e.target.value)}/>
              </label>
              <div>
                <span onClick={e => onDeleteOption(question.id, option.id)}>X</span>
              </div>
          </div>
        )}
        <div className="mb-3">
          <label>
            <input
              className="mr-2 leading-tight"
              type="radio"
              disabled
              name="option"/>
            <span className="ml-2" onClick={e => onAddOption(question.id, question.options.length)}>Add option</span>
          </label>
        </div>
        {/*body*/}
        {/*footer*/}
        <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300">
          {/* <button
            className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={ this.closeModal }
          >
            Duplicate
          </button> */}
          <button
            className="text-red-500 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            onClick={e => onDeleteQuestion(question.id)}
            style={{ transition: "all .15s ease" }}
          >
            Delete
          </button>
        </div>
        {/*footer*/}
      </div>
    </section>
  )

}

export default QuestionComponent
