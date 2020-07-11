import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import authService from './services/auth'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Survey from './pages/Survey'
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
          <Route exact path="/surveys" component={Survey} />
        </Switch>

      </Router>

    </React.Fragment>
  )
}

export default App