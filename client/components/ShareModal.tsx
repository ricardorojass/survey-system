import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import surveyUIService from '../services/surveyUIService'

interface State {
  showModal?: boolean,
  surveyUrl?: string
}

class ShareModal extends React.Component<RouteComponentProps, State> {

  constructor(props: any) {
    super(props)

    this.state = { showModal: false, surveyUrl: null }
    surveyUIService.subscribe((_: boolean) => {
      this.setState({ showModal: surveyUIService.isShareModalOpen() })
    })
  }

  componentDidMount() {
    this.getSurveyUrl()
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
                    Share your survey
                  </h3>
                  {/*close button*/}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={ this.closeModal }>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <span>Link</span>
                  <p className="italic text-blue-600 pt-3">{this.state.surveyUrl}</p>
                </div>
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

  closeModal = () => {
    surveyUIService.closeShareModal()
  }

  getSurveyUrl() {
    const path = this.props.location.pathname + '/surveyResponse'
    const url = `http://localhost:3000${path}`
    this.setState({ surveyUrl: url })
  }
}

export default withRouter(ShareModal)