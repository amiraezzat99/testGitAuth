import { msgModel } from '../../../DB/Models/message.model.js'
import { userModel } from '../../../DB/Models/user.model.js'

//============================== send message =========================
export const sendMessage = async (req, res, next) => {
  const { content, sendTo } = req.body
  const isUserExists = await userModel.findById(sendTo)
  if (!isUserExists) {
    return res.status(400).json({ message: 'not found' })
  }
  const message = new msgModel({ content, sendTo })
  await message.save()
  res.status(201).json({ messsage: 'Done', message })
}

//============================ get user messages ==================
export const getUserMessages = async (req, res, next) => {
  const { _id } = req.params
  const messages = await msgModel.find({ sendTo: _id })
  if (messages.length) {
    return res.status(200).json({ messsage: 'Done', messages })
  }
  res.status(200).json({ messsage: 'empty inbox' })
}

//============================ delete message ==================
export const deleteMessage = async (req, res, next) => {
  const { msgId, loggedInUserId } = req.params
  const message = await msgModel.findOneAndDelete({
    _id: msgId,
    sendTo: loggedInUserId,
  })
  if (message) {
    return res.status(200).json({ messsage: 'Done' })
  }
  res.status(401).json({ messsage: 'unAuthorized' })
}
