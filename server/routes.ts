const express = require('express')
import * as auth from './controllers/auth'
import { requireUser, requireAdmin } from './middlewares'


const router = express.Router()

// router.post('/login', auth.login)
router.post('/signup', auth.signup)


export default router