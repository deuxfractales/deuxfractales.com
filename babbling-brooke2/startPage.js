async function startPage (fastify, options) {
    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
    })
}

module.exports = startPage