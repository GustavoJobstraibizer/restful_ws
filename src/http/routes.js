const db =  require('../services/mysql')

const routes = (server) => {
  server.get('categorias', async (req, res, next) => {
    try {
      res.send(await db.categorias().all())
    } catch (error) {
      res.send(error)
    } finally {
      next()
    }
  })

  server.post('autenticacao', async (req, res, next) => {
    try {
      const { email, password } = req.params
      res.send(await db.auth().authenticate(email, password))
    } catch (error) {
      res.send(error)
    } finally {
      next()
    }
  })

  server.get('categoria', async (req, res, next) => {
    const {id} = req.query
    try {
      res.send(await db.categorias().byId(id))
    } catch (error) {
      res.send(error)
    } finally {
      next()
    }
  })

  server.post('categoria', async (req, res, next) => {
    const {name} = req.params
    try {
      res.send(await db.categorias().save(name))
    } catch (error) {
      res.send(error)
    } finally { 
      next()
    }
  })

  server.put('categoria', async (req, res, next) => {
    const {id, name} = req.params
    try {
      res.send(await db.categorias().update(id, name))
    } catch (error) {
      res.send(error)
    } finally {
      next()
    }
  })

  server.del('categoria', async (req, res, next) => {
    const {id} = req.query
    try {
      res.send(await db.categorias().del(id))
    } catch (error) {
      res.send(error)
    } finally {
      next()
    }
  })

  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence...')
    next()
  })
}

module.exports = routes
