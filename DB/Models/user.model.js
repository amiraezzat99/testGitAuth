import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['female', 'male', 'not specified'],
      default: 'not specified',
    },
    profile_pic: String,
  },
  {
    timestamps: true,
  },
)


//============================================ Save is a document middleware ==================
// userSchema.pre('save', function () {
//   console.log('============================ pre save hook =========================');
//   console.log(this);
//   this.firstName = this.username.split(" ")[0]
//   this.lastName = this.username.split(" ")[1]
// })

// userSchema.post('save', function () {
//   console.log('============================ post save hook =========================');
//   console.log(this);
// })


// ===================================== DeleteOne by default query middleware ========================
// userSchema.pre(['deleteOne', 'findOneAndDelete'], { query: true, document: false }, function () {
//   console.log('============================ pre deleteOne hook =========================');
//   console.log(this.getQuery());
//   console.log(this.model);

// })

// userSchema.post('findOneAndDelete', { query: true, document: false }, function (doc) {
//   console.log('============================ post deleteOne hook =========================');
//   console.log(doc);
// })

// // ===================================== updateOne by default query middleware ========================
// userSchema.post([/*'updateOne',*/ 'findOneAndUpdate'], async function () {
//   console.log('============================ pre deleteOne hook =========================');
//   console.log(this.getQuery());
//   console.log(this.model);
//   // ======== make sure that you use different updtae method from the methods in hook array 
//   await this.model.updateOne(this.getQuery(), { $inc: { __v: 1 } })

// })

export const userModel = mongoose.model('User', userSchema)
