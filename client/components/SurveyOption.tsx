import React from 'react'
import { Survey } from '../types'


interface Props {
  title?: string
  options?: string[]
}

export default ({ title, options }: Props) => {
  

  return (
    <section className="bg-white shadow-lg">
      <div className="px-6 pt-4">
        {/*body*/}
        <div className="form-group">
          <textarea
            rows={1}
            className="text-3xl border-t-0 border-l-0 border-r-0 border-b-1"
            id="title"
            value={title}>
          </textarea>
        </div>
        <div className="form-group">
          <input className="mr-2 leading-tight" type="checkbox"/>
          <span className="text-sm">{options[0]}</span>
        </div>
        {/*body*/}
        {/*footer*/}
        <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300">
          <button
            className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={ this.closeModal }
          >
            Duplicate
          </button>
          <button
            className="text-red-500 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
          >
            Delete
          </button>
        </div>
        {/*footer*/}
      </div>
    </section>
  )

}
