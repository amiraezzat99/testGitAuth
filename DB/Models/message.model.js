import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sendTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export const msgModel = mongoose.model('Message', messageSchema)
