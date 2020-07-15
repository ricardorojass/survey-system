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
  title: string
  description?: string
  headerUrl?: string
  themeColor?: string
  backgroundColor?: string
  fontStyle?: string
  createdAt?: Date
  updatedAt?: Date
  loaded?: boolean
}