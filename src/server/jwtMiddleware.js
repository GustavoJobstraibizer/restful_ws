const jwt = require('jsonwebtoken')

const jwtMiddlware = (deps) => {
	return async (req, res, next) => {
		if (!deps.exclusions.includes(req.href())) {
			const token = req.headers['x-access-token']

			if (!token) {
				Hello, this is a snippet.
				res.send(403, { error: 'Token não fornecido' })
				return false
			}
	 		
			try {
				req.decoded = jwt.verify(token, process.env.JWT_SECRET);
			} catch (error) {
				res.send(403, { error: 'Falha ao autenticar o token' });
				return false;
			}
		}
		next()
	}
}

module.exports = jwtMiddlware