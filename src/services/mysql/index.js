const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'restful_ws'
})

const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)
  rejectFunction({error: msg})
}

const categoriasModulo = require('./categorias')({connection, errorHandler})

module.exports = {
  categorias: () => categoriasModulo
}
