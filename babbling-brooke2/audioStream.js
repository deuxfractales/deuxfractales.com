async function audioStream (fastify, options){

    const path = require('path');

    fastify.register(require('fastify-static'), {
        root: path.join(__dirname, 'storage/mp3'),
        prefix: '/public/', // optional: default '/'
    })

    fastify.get('/beats/:name', async (request, reply) => {

       reply.sendFile(`/${request.params.name}.mp3`)
    });

}

module.exports = audioStream
