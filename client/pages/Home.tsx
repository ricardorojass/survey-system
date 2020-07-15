import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../components/Loading'
import authService from '../services/auth'
import { useStore } from '../hooks'
import { User } from '../types'

export default () => {
  const user = useStore<User>(authService)

  if (!user.loaded) {
    return <Loading />
  }

  if (authService.isAuthenticated()) {
    return <Redirect to='/surveys' />
  } else {
    return <Redirect to='/register' />
  }
}
