import { createServer } from 'http'
import expressApp from './express.js'
// Servidor http creado usando express
const server = createServer(expressApp)

export default server
