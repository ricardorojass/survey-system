import React, { useState } from 'react'

interface Props {
  title?: string
  description?: string,
  onFieldChange: any
}

class SurveyTitle extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
  }
  
  render() {
    const { title, description, onFieldChange } = this.props
    return (
      <section className="bg-white shadow-lg">
        <div className="px-6 py-4">
          <div className="form-group">
            <textarea
              rows={1}
              className="text-3xl border-t-0 border-l-0 border-r-0 border-b-1"
              id="survey"
              name="survey.title"
              value={title}
              onChange={e => onFieldChange("title", e.target.value)}>
            </textarea>
          </div>
          <div className="form-group">
            <textarea
              rows={1}
              className="text-base border-t-0 border-l-0 border-r-0 border-b-1"
              id="survey"
              name="survey.description"
              value={description}
              onChange={e => onFieldChange("description", e.target.value)}>
            </textarea>
          </div>
        </div>
      </section>
    )
  }

}

export default SurveyTitle
