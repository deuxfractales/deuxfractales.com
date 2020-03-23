module.exports = async function routes(fastify,options,next) {
    fastify.get('/tags/:genre', async (request,reply) =>{
        const { redis } = fastify
        redis.zrange(request.params.genre,"0","-1", function(result,error){
            console.log(result)
            reply.send(result || error)
        })
    })
}