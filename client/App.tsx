import React, { useEffect, useState } from "react"
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
import SurveyListView from './pages/SurveyListView'
import SurveyDetailView from './pages/SurveyDetail'
import SurveyResponseView from './pages/SurveyResponseView'
import SurveySubmittedView from './pages/SurveySubmittedView'
import './styles/application.scss'
import { User } from "./types"



const App = () => {
  const [ authenticated, setAuthenticated ] = useState(false)

  useEffect(() => {
    authService.subscribe((_: User) => {
      setAuthenticated( authService.isAuthenticated() )
    })

    async function load() {
      await authService.loadUser()
    }
    load()

    return () => {
      authService.unsubscribe(load)
    }
  }, [])

  return (
    <React.Fragment>
      <Router>
        { authenticated ? <Header /> : null }
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/surveys" component={SurveyListView} />
          <Route exact path="/surveys/:id" component={SurveyDetailView} />
          <Route exact path="/surveys/:id/surveyResponse" component={SurveyResponseView} />
          <Route exact path="/surveys/:id/surveySubmitted" component={SurveySubmittedView} />
        </Switch>

      </Router>

    </React.Fragment>
  )
}

export default App