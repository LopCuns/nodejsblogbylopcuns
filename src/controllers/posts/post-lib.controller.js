import UserModel from '#Schemas/user.schema.js'
import PostModel from '#Schemas/post.schema.js'

const getUserById = async (userid) => await UserModel.findById(userid).exec()
const getPostById = async (postid) => await PostModel.findById(postid).exec()
const deletePostById = async (postId) =>
  await PostModel.findByIdAndDelete(postId).exec()
const deleteUserById = async (userid) =>
  await UserModel.findByIdAndDelete(userid).exec()

export { getUserById, getPostById, deletePostById, deleteUserById }
