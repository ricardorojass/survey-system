export interface Store {
  getState(): any
  setState(state: any): void
  subscribe(fn: Function): void
  unsubscribe(fn: Function): void
}

export interface User {
  id?: number
  name?: string
  email?: string
  password?: string
  createdAt?: Date
  token?: string
  loaded?: boolean
}

export interface Survey {
  id?: number
  userId?: number
  questions?: Question[]
  title?: string
  description?: string
  headerUrl?: string
  themeColor?: string
  backgroundColor?: string
  fontStyle?: string
  createdAt?: Date
  updatedAt?: Date
  loaded?: boolean
}

export interface Question {
  id?: number
  surveyId?: number
  options?: Option[]
  title?: string
  description?: string
  required?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Option {
  id?: number
  questionId?: number
  description?: string
  checked?: boolean
  createdAt?: Date
  updatedAt?: Date
}