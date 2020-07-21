import React, { useState } from 'react'

interface Props {
  index?: number
  title?: string
  description?: string,
  onChange: any
}

class SurveyTitle extends React.Component<Props> {

  constructor(props: Props) {
    super(props)

  }

  handleChange = (e: any) => {
    const targetName = e.target.name
    // 1. Take a copy of the current title
    const updatedTitle = {
      ...this.props.title as {},
      [targetName]: e.target.value
    }
    this.props.onChange(targetName, updatedTitle)
  }
  
  render() {
    const { title, description, onChange } = this.props
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
              onChange={this.handleChange}>
            </textarea>
          </div>
          <div className="form-group">
            <textarea
              rows={1}
              className="text-base border-t-0 border-l-0 border-r-0 border-b-1"
              id="survey"
              name="survey.description"
              value={description}
              onChange={this.handleChange}>
            </textarea>
          </div>
        </div>
      </section>
    )
  }

}

export default SurveyTitle
