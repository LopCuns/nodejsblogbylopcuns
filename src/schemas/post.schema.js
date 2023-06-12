import mongoose from 'mongoose'

// Esquema del post
const postSchema = mongoose.Schema({
  _id: { type: String, _id: false },
  authorId: String,
  title: String,
  content: String,
  likes: Number,
  comments: [{ authorId: String, content: String }]
})
// Modelo de post
const PostModel = mongoose.model('post', postSchema)

export default PostModel
