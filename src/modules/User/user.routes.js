import { Router } from 'express'
const router = Router()
import * as uc from './user.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'
import { auth } from '../../middlewares/auth.js'

// function passed() {
//   return (req, res, next) => {
//     let flag = true
//     if (flag) {
//      return  next()
//     }
//     return res.json({ message: 'Middle ware fail' })
//   }
// }

router.post('/', asyncHandler(uc.SignUp))
router.post('/login', uc.SignIn)
router.patch('/', auth, asyncHandler(uc.updateProfile))
router.get('/:_id', asyncHandler(uc.getUserProfile))
// passed()
// router.post('/token', asyncHandler(uc.verifyToken))

export default router
