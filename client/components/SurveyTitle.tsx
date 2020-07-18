import React from 'react'
import { Survey } from '../types'

const moment = require('moment')

interface Props {
  title?: string
  description?: string
}

export default ({ title, description }: Props) => {
  

  return (
    <section className="bg-white shadow-lg">
      <div className="px-6 py-4">
        <div className="form-group">
          <textarea
            rows={1}
            className="text-3xl border-t-0 border-l-0 border-r-0 border-b-1"
            id="title"
            value={title}>
          </textarea>
        </div>
        <div className="form-group">
          <textarea
            rows={1}
            className="text-base border-t-0 border-l-0 border-r-0 border-b-1"
            id="question"
            value={description}>
          </textarea>
        </div>
      </div>
    </section>
  )

}
