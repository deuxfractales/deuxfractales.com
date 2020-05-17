async function dbActions(fastify) {
  fastify.register(require('fastify-mysql'), {
    connectionString:
      'mysql://ace:bnhepos34q0dnu6p@db1-deuxfractales-do-user-7211070-0.a.db.ondigitalocean.com:25060/deuxfractales?',
  });

  //GET ALL BEATS
  fastify.get('/db/all', async (request, reply) => {
    fastify.mysql.getConnection(onConnect);

    function onConnect(err, client) {
      if (err) reply.send(err);
     
      client.query(
        'SELECT id,name,price,url,artist,genre FROM beatz',
        function onResult(err, result) {
          client.release();
          let updatedResult = changeUrl(result)
          console.log(updatedResult)
          reply.send(err || updatedResult);
        }
      );
    }
  });
  //GET SPECIFIC BEAT
  fastify.get('/db/:id', async (req, reply) => {
    fastify.mysql.getConnection(onConnect);

    function onConnect(err, client) {
      if (err) reply.send(err);

      client.query(
        'SELECT id,name FROM beatz WHERE id=?',
        [req.params.id],
        function onResult(err, result) {
          client.release();
          let updatedResult = changeUrl(result)
          console.log(updatedResult)
          reply.send(err || updatedResult);
        }
      );
    }
  });
  //GET HOMEPAGE FEATURED 1 BEATS
  fastify.get('/db/f1', async (req, reply) => {
    fastify.mysql.getConnection(onConnect);
    function onConnect(err, client) {
      console.log(err);
      if (err) reply.send(err);

      client.query(
        // Add DRY in by (1) Making the call dynamic ex: 'db/:featuredSlot' and (2) making the query dynamic ex:SELECT .... featured.[req.params.featuredSlot]
        'SELECT beatz.id,beatz.name,beatz.url,beatz.genre,featured.featuredSlot1 FROM featured LEFT JOIN beatz ON beatz.id = featured.beatId',
        function onResult(err, result) {
          console.log(err);
          client.release();
          let updatedResult = changeUrl(result);
          reply.send(err || updatedResult);
        }
      );
    }
  });
  // send artists, subgenre, and ig_handles to redis DB
  fastify.get('/db/f3', async (req, reply) => {
    fastify.mysql.getConnection(onConnect);
    function onConnect(err, client) {
      console.log(err);
      if (err) reply.send(err);

      client.query(
        'SELECT * FROM deuxfractales.artists',
        function onResult(err, result) {
          console.log(err);
          client.release();
          console.log(result);
          reply.send(err || result);
        }
      );
    }
  });
}

  function changeUrl(result){
    let beats = []
    for(a = 0; a < result.length; a++){
      let eachRes = result[a]
      let beat = {
        url: eachRes.url.replace("localhost",`${process.env.IP}`),
        id: eachRes.id,
        name: eachRes.name,
        genre: eachRes.genre,
        featuredSlot1: eachRes.featuredSlot1
      }
      beats.push(beat)
    }
    return beats
  }


module.exports = dbActions;
