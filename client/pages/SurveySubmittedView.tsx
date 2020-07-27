import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface State {
  title?: string
  surveyId?: number
}

class SurveySubmittedView extends React.Component<RouteComponentProps, State> {
  surveyId: number
  constructor(props) {
    super(props)

    this.state = { title: '', surveyId: null }
    this.surveyId = props.match.params.id
  }

  render() {
    return (
      <div className="bg-gray-100 h-auto">
        <div className="flex">
          <div className="mx-auto p-4 mt-6 w-6/12">
            <div className="grid grid-cols-1 gap-4 mt-8 mx-auto">
                <section className="bg-white shadow-lg">
                  <div className="px-6 py-4">
                    <div className="">
                      <p className="text-lg text-gray-700 pb-3">Your response has been recorded</p>
                      <a className="italic text-blue-600" href={`/surveys/${this.surveyId}/surveyResponse`}>Submit another response</a>
                    </div>
                  </div>
                </section>
  
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SurveySubmittedView)
