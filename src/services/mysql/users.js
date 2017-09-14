const sha1 = require('sha1')

const users = deps => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const {connection, errorHandler} = deps
        connection.query('SELECT id, email FROM users', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao lista usuário', reject)
            return false
          }

          resolve({users: results})
        })
      })
    },
    byId: (id) => {
      return new Promise((resolve, reject) => {
        const {connection, errorHandler} = deps
        connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
          if (error) {
            errorHandler(error, `Usuário não encontrada`, reject)
            return false
          }

          resolve({user: results})
        })
      })
    },
    save: (email, password) => {
      return new Promise((resolve, reject) => {
        const {connection, errorHandler} = deps
        connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, sha1(password)], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar a usuário ${email}`, reject)
            return false
          }

          resolve({user: {email, id: results.insertId}})
        })
      })
    },
    update: (id, password) => {
      return new Promise((resolve, reject) => {
        const {connection, errorHandler} = deps
        connection.query('UPDATE users SET password = ? WHERE id = ?', [sha1(password), id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao alterar a usuário de id ${id}`, reject)
            return false
          }

          resolve({user: { id }, affectedRows: results.affectedRows})
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const {connection, errorHandler} = deps
        connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao deletar a usuário`, reject)
            return false
          }

          resolve({message: `usuário removido com sucesso.`, affectedRows: results.affectedRows})
        })
      })
    }
  }
}

module.exports = users
