const restify = require('restify')

const server = restify.createServer()

const routes = require('../http/routes')

const cors = require('./cors')

const jwtMiddleware = require('./jwtMiddleware')

const exclusions = ['/autenticacao']

server.pre(cors.preflight)

server.use(cors.actual)

server.use(restify.plugins.bodyParser())

server.use(jwtMiddleware({ exclusions }))

server.use(restify.plugins.queryParser())

routes(server)

module.exports = server
