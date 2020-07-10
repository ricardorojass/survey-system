import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import authService from './services/auth'
import Header from './components/Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import './styles/application.scss'



const App = () => {
  useEffect(() => {
    async function load() {
      await authService.loadUser()
    }
    load()
  }, [])

  return (
    <React.Fragment>
      <Router>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>

      </Router>

    </React.Fragment>
  )
}

export default App