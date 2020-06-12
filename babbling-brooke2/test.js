async function test (fastify, options) {
    fastify.get('/test/:id', async(request,reply) =>{
        reply.send(request.body)
    })
}

module.exports = test