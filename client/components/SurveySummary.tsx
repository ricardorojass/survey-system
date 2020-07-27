import React from 'react'
import { Survey } from '../types'
import { Link } from 'react-router-dom'

const moment = require('moment')

interface Props {
  survey?: Survey
}

export default ({ survey }: Props) => {
  

  return (
    <Link to={`/surveys/${survey.id}/edit`} className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-2">
      <div className="bg-white shadow-lg mx-4 my-4 w-64 border border-blue-300">
        <div className="mx-auto h-40 bg-gray-200"></div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{survey.title}</div>
          <p className="text-sm font-light text-gray-600">You edited {moment(survey.updatedAt).fromNow()}</p>
        </div>
      </div>
    </Link>
  )

}