const express = require('express')
import * as auth from './controllers/auth'
import * as survey from './controllers/survey'
import { requireUser, requireAdmin } from './middlewares'


const router = express.Router()

// Users
router.post('/login', auth.login)
router.post('/signup', auth.signup)
router.get('/me', requireUser, auth.getUser)

// Surveys
router.get('/surveys', requireUser, survey.getSurveys)
router.get('/survey/:id', requireUser, survey.getSurvey)
router.post('/surveys', requireUser, survey.createSurvey)
router.put('/surveys/:id', requireUser, survey.updateSurvey)


export default router