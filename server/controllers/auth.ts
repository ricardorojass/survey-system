const bcrypt = require('bcrypt')
const { jwt } = require('jsonwebtoken')
import usersService from '../services/users'
import { User } from '../types'

// export async function login(req, res, next) {
//   try {
//      const { email, password } = req.body

//      const user: User = await usersService.findByEmail(email)
//      if (!user || !(await bcrypt.compare(password, user.password))) {
//        res.status(401).json({ reason: "invalid-credentials" })
//      } else {
//        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY || "secretcode")
//        res.json({ firstName: user.firstName, lastName: user.lastName, email: user.email, token })
//      }
//   } catch (e) {
//     next(e)
//   }
// }

export async function signup(req: any, res: any, next: any) {
  try {
    console.log(req.body);
    
    const { email, password, name } = req.body
    let user: User = { email, password, name }
    user.password = await bcrypt.hash(password, 10)
    user = await usersService.create(user)
    console.log('user: ', user);
    
    const token = 'reraekrjerj'
    res.json({ token })
  } catch (e) {
    next(e)
  }
}
