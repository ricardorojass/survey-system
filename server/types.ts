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
  userId: number
  title: string
  description?: string
  headerUrl?: string
  themeColor?: string
  backgroundColor?: string
  fontStyle?: string
  createdAt?: Date
  updatedAt?: Date
}