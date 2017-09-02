const test = require('ava')

const { connection, errorHandler } = require('./setup')

const categories = require('../categorias')({ connection, errorHandler })

const create = () => categories.save('category-test')

test.beforeEach(t => connection.query('TRUNCATE TABLE categorias'))
test.after.always(t => connection.query('TRUNCATE TABLE categorias'))

test('Lista de categorias', async t => {
	await create()
	const list  = await categories.all()
	t.is(list.categorias.length, 1)
	t.is(list.categorias[0].name, 'category-test')
})

test('criaçao de categorias', async t => {
	const result = await create()
	t.is(result.categoria.name, 'category-test')
})

test('Atualização da categoria', async t => {
	await create()
	const updated = await categories.update(1, 'category-test-updated')
	t.is(updated.categoria.name, 'category-test-updated')
	t.is(updated.affectedRows, 1)
})

test('Remover categoria', async t => {
	await create()
	const removed = await categories.del(1)
	t.is(removed.affectedRows, 1)
})