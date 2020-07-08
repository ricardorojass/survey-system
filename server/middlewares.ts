import * as jwt from 'jsonwebtoken'
import { User, Token } from './types'
import usersService from './services/users'

// export const setUser = async (req: any, res: any, next: any) => {
//   const token = req.headers.authorization
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.SECRET_KEY || "secretcode") as Token
//       if (decoded.userId) {
//         const user: User = await usersService.find(Number(decoded.userId))
//         if (user) {
//           res.locals.user = user
//           return next()
//         }
//       }
//     } catch (err) {
//       console.log(err)
//       res.status(401).json({ error: "Invalid authorization token" })
//     }
//   } else {
//     next()
//   }
// }

export const requireUser = async (req: any, res: any, next: any) => {
  if (!res.locals.user) {
    res.status(401).json({ error: "Not authorized" });
  } else {
    next()
  }
}

export const requireAdmin = async (req: any, res: any, next: any) => {
  if (!res.locals.user) {
    res.status(401).json({ error: "Not Authorized" });
  } else if (!res.locals.user.admin) {
    res.status(404).json({ error: "Not Found" })
  } else {
    next()
  }
}