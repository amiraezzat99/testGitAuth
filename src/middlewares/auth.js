//===== login =============
import jwt from 'jsonwebtoken'
import { userModel } from '../../DB/Models/user.model.js'
export const auth = async (req, res, next) => {
  //   return async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(400).json({ message: 'Please login first' })
  }

  if (!authorization.startsWith('Saraha')) {
    return res.status(400).json({ message: 'Wrong prefix' })
  }

  const splitedToken = authorization.split(' ')[1]
  const decodedData = jwt.verify(
    splitedToken,
    process.env.SECRET_TOKEN_KEY_LOG_IN,
  )

  if (!decodedData || !decodedData.code) {
    return res.status(400).json({ message: 'decode fail' })
  }

  const findUser = await userModel.findById(decodedData.code)
  if (!findUser) {
    return res.status(400).json({ message: 'Please SignUp first' })
  }
  req.authUser = findUser
  next()
  //   }
}

// Break 9: 20

// `${name}`
