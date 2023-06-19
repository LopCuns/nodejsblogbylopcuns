import PostModel from '#Schemas/post.schema.js'
const getLatestPostController = async (req, res) => {
  // Obtener la fecha actual
  const currentDateObject = new Date()
  // Obtener el año y el mes actual
  const currentYear = currentDateObject.getFullYear()
  const currentMonth = currentDateObject.getMonth() + 1
  // Crear expresión regular para encontrar los posts publicados el último mes
  const findPattern = `${currentYear}-${currentMonth.toString().length === 1 ? `0${currentMonth}` : currentMonth}-\\d{2}`
  // Obtener los posts publicados en el último mes
  const posts = await PostModel.find({ date: { $regex: findPattern } }).limit(5).exec()
  // Devolver los posts publicados el último mes
  return res.send(posts)
}
export default getLatestPostController
