import React from 'react'

interface Props {
  title?: string
  description?: string,
  onChange: any
}

export default ({ title, description, onChange }: Props) => {
  
  return (
    <section className="bg-white shadow-lg">
      <div className="px-6 py-4">
        <div className="form-group">
          <textarea
            rows={1}
            className="text-3xl border-t-0 border-l-0 border-r-0 border-b-1"
            id="survey"
            name="title"
            value={title}
            onChange={onChange}>
          </textarea>
        </div>
        <div className="form-group">
          <textarea
            rows={1}
            className="text-base border-t-0 border-l-0 border-r-0 border-b-1"
            id="survey"
            name="description"
            value={description}
            onChange={onChange}>
          </textarea>
        </div>
      </div>
    </section>
  )

}
