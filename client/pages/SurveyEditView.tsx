import React, { useEffect, useState } from "react"
import HeaderEdit from '../components/HeaderEdit';
import QuestionsView from './QuestionsView'
import ResponsesView from './ResponsesView'

const SurveyEditView = (props) => {
  const [active, setActive] = useState('questions')
  const questionsTab = 'questions'
  const responsesTab = 'responses'

  // useEffect(() => {

  // })

  const handleTabs = (tab: string) => {
    setActive(tab)
  }

  return (
    <>
      <HeaderEdit />
      <nav className="bg-white">
        <ul className="flex justify-center pt-4 pb-1 border-b">
          <li className="mr-6">
            <a
              className="text-indigo-700 hover:text-indigo-800"
              onClick={e => handleTabs('questions')}
              href="#questions">
                Questions
            </a>
          </li>
          <li className="mr-6">
            <a
              className="text-indigo-700 hover:text-indigo-800"
              onClick={e => handleTabs('responses')}
              href="#responses">
              Responses
            </a>
          </li>
        </ul>
      </nav>
      { active === questionsTab
        ?
        <QuestionsView {...props}/>
        :
        <ResponsesView {...props}/>
      }
    </>
  )
}

export default SurveyEditView
