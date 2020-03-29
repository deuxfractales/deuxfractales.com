async function dbActions (fastify, options) {
    fastify.register(require('fastify-mysql'), {
        connectionString: 'mysql://doadmin:jwvzc33fjml2si2l@db-mysql-tor1-97597-do-user-7211070-0.a.db.ondigitalocean.com:25060/defaultdb?'
    })
    fastify.get('/db-getBeat', async (request, reply) => {
        fastify.mysql.getConnection(onConnect)

        function onConnect(err,client) {
            if (err) return reply.send(err)
            client.query('SELECT bid, title, producer, bpm, userTag1, userTag2, filterTag1, filterTag2, url,genre FROM trakz', function (error, results, fields) {
                if (error) {
                    console.log(error)
                }else {
                    console.log(results);
                    reply.send(results, fields)
                }
            });
        }
    })
    fastify.post('/db-postBeat', async (request,reply)=>{
        fastify.mysql.getConnection(onConnect)

        function onConnect(err,client) {
            if (err) return reply.send(err)
            let addUrl = `http://35.203.87.148:80/beats/mp3/${request.body.title}`
            client.query( 'insert into trakz (title, producer, bpm, userTag1, userTag2, url, filterTag1, filterTag2,genre) values (?,?,?,?,?,?,?,?,?)',[request.body.title,request.body.producer,request.body.bpm,request.body.userTag1,request.body.userTag2,addUrl,request.body.filterTag1,request.body.filterTag2,request.body.genre], function (err,result) {
                if(err){
                    reply.send(err).code(400)
                }else {
                    reply.send({
                        db:'Successfully added to DB',
                        result:`${result}`
                    })
                }
            })
        }

    })
}

module.exports = dbActions