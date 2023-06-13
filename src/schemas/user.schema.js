import mongoose from 'mongoose'
// Esquema de usuario en mongoDB
const userSchema = mongoose.Schema({
  _id: { type: String, _id: false },
  username: { type: String, required: true, minLength: 4, maxLength: 15 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  posts: { type: Array },
  likedPosts: { type: Array }
})
// Modelo de usuario en mongoDB
const UserModel = mongoose.model('usermodel', userSchema)

export default UserModel
