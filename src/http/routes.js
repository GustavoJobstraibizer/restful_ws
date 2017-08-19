const db = require('../services/mysql')

const routes = (server) => {
  server.get('categorias', async (req, res, next) => {
    try {
      res.send(await db.categorias().all())
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.get('categoria', async (req, res, next) => {
    const {id} = req.query
    try {
      res.send(await db.categorias().byId(id))
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.post('categoria', async (req, res, next) => {
    const {name} = req.params
    try {
      res.send(await db.categorias().save(name))
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.put('categoria', async (req, res, next) => {
    const {id, name} = req.params
    try {
      res.send(await db.categorias().update(id, name))
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.del('categoria', async (req, res, next) => {
    const {id} = req.query
    try {
      res.send(await db.categorias().del(id))
      next()
    } catch (error) {
      res.send(error)
      next()
    }
  })

  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence...')
    next()
  })
}

module.exports = routes
