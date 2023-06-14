import { getUserById, getPostById } from '#Controllers/lib.controller.js'
import { notAuthorized } from '#Errors/users.errors.js'
const getLikedPostsController = async (req, res) => {
  // Obtener el userId de la request
  const { userId } = req
  // Obtener el usuario a partir de su _id
  const user = await getUserById(userId)
  // Si el usuario no existe, entonces devolver un error 401 ( No autorizado )
  if (!user) return notAuthorized(res)
  // Obtener los posts a los que el usuario a dado me gusta
  const likedPosts = await Promise.all(
    user.likedPosts
      .map(async (postId, index) => {
        // Obtener el post por su _id
        const post = await getPostById(postId)
        // Si el post no existe, entonces eliminarlo de los likedPosts del usuario
        if (!post) {
          user.likedPosts.splice(index, 1)
          await user.save()
          return ''
        }
        return post
      })
      // Eliminar los items vacios del array de likedPosts
      .filter((post) => post !== '')
  )
  // Enviar el array con los likedposts del usuario
  res.send(likedPosts)
}
export default getLikedPostsController
