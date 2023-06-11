import mongoose from 'mongoose'
// Función para conectarse a la base de datos
const connectDB = (url) =>
  mongoose.connect(url).then(() => console.log('Conectado a la base de datos'))

export default connectDB
