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