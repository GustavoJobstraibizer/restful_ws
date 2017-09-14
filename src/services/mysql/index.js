const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

const errorHandler = (error, msg, rejectFunction) => {
  console.log(error)
  rejectFunction({error: msg})
}

const categoriasModulo = require('./categorias')({connection, errorHandler})
const usersModulo = require('./users')({connection, errorHandler})
const authModulo = require('./auth')({connection, errorHandler})

module.exports = {
  categorias: () => categoriasModulo,
  user: () => usersModulo,
  auth: () => authModulo
}
