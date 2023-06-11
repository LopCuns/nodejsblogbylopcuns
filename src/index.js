import '#Config/env.js'
import server from '#Config/http.js'
import connectDB from '#Config/db.js'

// Función start que conecta a la base de datos y levanta el servidor
const start = async () => {
  // Conexión con la base de datos de mongodb
  await connectDB(process.env.MONGODB_URL)
  // Servidor escuchando en el puerto indicado en el archivo .env
  server.listen(process.env.PORT, () =>
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`)
  )
}

start()
