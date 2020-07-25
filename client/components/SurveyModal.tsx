import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import surveyUIService from '../services/surveyUIService'
import surveysService from '../services/surveysService'
import { Survey } from '../types'

interface State {
  title?: string
  description?: string
  error?: any
  showModal?: boolean
}

class SurveyModal extends React.Component<RouteComponentProps, State> {

  constructor(props: any) {
    super(props)

    this.state = { title: null, description: null, showModal: false, error: null}
    surveyUIService.subscribe((_: boolean) => {
      this.setState({ showModal: surveyUIService.isSurveyModalOpen() })
    })
  }

  render() {
    if (this.state.showModal) {
      return (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl w-2/5">
              {/*content*/}
              <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300">
                  <h3 className="text-3xl font-semibold">
                    Create a new Survey
                  </h3>
                  {/*close button*/}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={ this.closeModal }>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={this.submit}>
                  <div className="relative p-6 flex-auto">
                    <div className="form-group">
                      <input
                        type="text"
                        id="title"
                        placeholder="Survey title"
                        onChange={e => this.updateField({ title: e.target.value })} />
                    </div>

                    <div className="form-group">
                      <textarea
                        id="description"
                        placeholder="Description"
                        onChange={e => this.updateField({ description: e.target.value })} />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={ this.closeModal }
                    >
                      Close
                    </button>
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )
    } else {
      return ( null )
    }
  }

  updateField(newState: State) {
    this.setState({ ...newState, error: false })
  }

  submit = async (e) => {
    e.preventDefault()
    try {
      const { title, description } = this.state
      const survey = await surveysService.create(title, description)
      

      this.redirectToSurveyDetail(survey.data.id)
      this.closeModal()
    } catch (e) {
      console.log('error------');
    }
  }

  closeModal = () => {
    surveyUIService.closeSurveyModal()
  }

  redirectToSurveyDetail(surveyId: number) {
    this.props.history.push(`/surveys/${surveyId}`)
  }

}

export default withRouter(SurveyModal)
