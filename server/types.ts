export interface User {
  id?: number
  email: string
  password: string
  name: string
  createdAt?: Date
}

export interface Token {
  userId?: string
}

export interface Survey {
  id?: number
  userId?: number
  title?: string
  description?: string
  headerUrl?: string
  themeColor?: string
  backgroundColor?: string
  fontStyle?: string
  questions?: Question[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Question {
  id?: number
  surveyId?: number
  title?: string
  description?: string
  required?: boolean
  options?: Option[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Option {
  id?: number
  questionId?: string
  description?: string
  checked?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface SurveyResponse {
  id?: number
  surveyId?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface Answer {
  id?: number
  responseId?: number
  optionId?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ResponsesSubmitted {
  numResponsesSubmitted: number,
  answersFromUsers: AnswerFromUser[]
}

export interface AnswerFromUser {
  questionId?: number
  questionTitle?: string
  numResponses?: number
  options?: OptionFromUser[]
}

export interface OptionFromUser {
  id?: number
  descrption?: string
  numAnswers?: number
}