import React, { useEffect, useState } from "react"
import HeaderEdit from '../components/HeaderEdit';
import QuestionsView from './QuestionsView'
import ResponsesView from './ResponsesView'
import { RouteComponentProps } from "react-router-dom";

interface State {
  activeTab?: string
  error?: any
}

interface Props {
  id?: string
}

export default class SurveyEditView extends React.Component<RouteComponentProps<Props>, State> {
  questionsTab = 'questions'
  responsesTab = 'responses'

  constructor(props: RouteComponentProps<Props>) {
    super (props)
    this.state = { activeTab: this.questionsTab }
  }

  render() {
    const { activeTab } = this.state
    return (
      <>
        <HeaderEdit />
        <nav className="bg-white">
          <ul className="flex justify-center pt-4 pb-1 border-b tab">
            <li className="mr-6">
              <button
                className={`text-indigo-700 ${activeTab === this.questionsTab ? 'active' : null}`}
                onClick={e => this.handleTabs('questions')}>
                  Questions
              </button>
            </li>
            <li className="mr-6">
              <button
                className={`text-indigo-700 ${activeTab === this.responsesTab ? 'active' : null}`}
                onClick={e => this.handleTabs('responses')}>
                Responses
              </button>
            </li>
          </ul>
        </nav>
        { activeTab === this.questionsTab
          ?
          <QuestionsView {...this.props}/>
          :
          <ResponsesView {...this.props}/>
        }
      </>
    )
  }

  handleTabs = (tab: string) => {
    this.setState({ activeTab: tab })
  }
}
