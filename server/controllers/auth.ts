const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import usersService from '../services/users'
import { User } from '../types'

export async function login(req: any, res: any, next: any) {
  try {
    let user: User
    const { email, password } = req.body
    if (email.length > 0 && password.length > 0) {
      user = await usersService.findByEmail(email)
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ reason: "unauthorized" })
    } else {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY || "secretcode")
      res.json({ name: user.name, email: user.email, token })
    }
  } catch (e) {
    next(e)
  }
}

export async function signup(req: any, res: any, next: any) {
  try {
    const { email, password, name } = req.body
    let user: User = { email, password, name }
    user.password = await bcrypt.hash(password, 10)
    user = await usersService.create(user)
    
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY || "secretcode")
    res.json({ token })
  } catch (e) {
    next(e)
  }
}

export async function getUser(req: any, res: any, next: any) {
  try {
    const { name, email } = res.locals.user;
    res.json({ name, email })
  } catch (e) {
    next(e)
  }
}
