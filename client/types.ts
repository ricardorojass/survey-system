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
  admin?: boolean
  loaded?: boolean
  invitationToken?: string
  progress?: number
}