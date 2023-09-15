import { userModel } from '../../../DB/Models/user.model.js'
import bcrypt from 'bcrypt'
import { asyncHandler } from '../../utils/errorhandling.js'
import jwt from 'jsonwebtoken'
//========================= Sign Up ==================
export const SignUp = async (req, res, next) => {
  // try {
  const { username, email, password, gender } = req.body
  // email check
  const isUserExists = await userModel.findOne({ email })
  if (isUserExists) {
    return res.status(400).json({ message: 'Email is already exist' })
  }
  // hashing password
  const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)
  const userInstance = new userModel({
    username,
    email,
    password: hashedPassword,
    gender,
  })
  await userInstance.save()
  res.status(201).json({ message: 'Done', userInstance })
}

//========================== Sign In ========================
export const SignIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  // email check
  const isUserExists = await userModel.findOne({ email })
  if (!isUserExists) {
    return res.status(400).json({ message: 'Invalid login credentials' })
  }
  const passMatch = bcrypt.compareSync(password, isUserExists.password) // return boolean
  if (!passMatch) {
    return res.status(400).json({ message: 'Invalid login credentials' })
  }
  const userToken = jwt.sign(
    {
      userEmail: email,
      code: isUserExists._id,
      username: isUserExists.username,
    },
    process.env.SECRET_TOKEN_KEY_LOG_IN,
    // {
    //   expiresIn: 60,
    // },
  )
  res.status(200).json({ message: 'loggedIn success', userToken })
})

//========================== Update profile =================
export const updateProfile = async (req, res, next) => {
  // const { loggedInId } = req.params
  // const { authorization } = req.headers
  // const decodedData = jwt.verify(authorization.split(' ')[1], 'tokenTest')

  const { _id } = req.authUser
  const { email, username } = req.body

  const userExist = await userModel.findOne({ email })

  if (userExist._id.toString() !== _id) {
    return res.status(401).json({ message: 'Unauthorized to take this action' })
  }
  const user = await userModel.updateOne({ email }, { username })
  if (user.modifiedCount) {
    return res.status(200).json({ message: 'Done' })
  }
  res.status(400).json({ message: 'Update fail' })
}

//========================== get user =======================
export const getUserProfile = async (req, res) => {
  const { _id } = req.params
  const user = await userModel.findById(_id)
  if (user) {
    return res.status(200).json({ message: 'Done', UserData })
  }
  return res.status(404).json({ message: 'invalid id' })
}

//============================== verify ===============
// export const verifyToken = async (req, res, next) => {
//   console.log('ttttttttttttttttttttttttttttttttttt')
//   const { authorization } = req.headers
//   console.log({ authorization })
//   console.log(authorization.split(' '))
//   console.log(authorization.split(' ')[1])

//   const decodedData = jwt.verify(authorization.split(' ')[1], 'tokenTest')

//   res.json(decodedData)
// }
