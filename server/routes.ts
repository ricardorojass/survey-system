const express = require('express')
import * as auth from './controllers/auth'
import * as survey from './controllers/survey'
import * as question from './controllers/question'
import * as option from './controllers/option'
import { requireUser } from './middlewares'


const router = express.Router()

// Users
router.post('/login', auth.login)
router.post('/signup', auth.signup)
router.get('/me', requireUser, auth.getUser)

// Surveys
router.get('/surveys', requireUser, survey.getSurveys)
router.get('/surveys/:id', requireUser, survey.getSurvey)
router.post('/surveys', requireUser, survey.createSurvey)
router.put('/surveys/:id', requireUser, survey.updateSurvey)

// Questions
router.post('/surveys/:id/questions', requireUser, question.createQuestion)
router.put('/surveys/:id/questions/:id', requireUser, question.updateQuestion)
router.delete('/surveys/questions/:id', requireUser, question.deleteQuestion)

// Options
router.post('/surveys/questions/options', requireUser, option.createOption)
router.put('/surveys/questions/:questionId/options/:optionId', requireUser, option.updateOption)

export default router