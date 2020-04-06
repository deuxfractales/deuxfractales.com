async function dbActions(fastify) {
  fastify.register(require('fastify-mysql'), {
    connectionString:
      'mysql://doadmin:s8392dglpeju18ne@db1-deuxfractales-do-user-7211070-0.a.db.ondigitalocean.com:25060/deuxfractales?ssl-mode=REQUIREDl',
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
          reply.send(err || result);
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
          reply.send(err || result);
        }
      );
    }
  });
  //GET HOMEPAGE FEATURED 1 BEATS
  fastify.get('/db/f1', async (req, reply) => {
    fastify.mysql.getConnection(onConnect);
    function onConnect(err, client) {
      if (err) reply.send(err);

      client.query(
        // Add DRY in by (1) Making the call dynamic ex: 'db/:featuredSlot' and (2) making the query dynamic ex:SELECT .... featured.[req.params.featuredSlot]
        'SELECT beatz.id,beatz.name,beatz.price,beatz.url,beatz.artist,beatz.genre,featured.featuredSlot1 FROM featured LEFT JOIN beatz ON beatz.id = featured.beatId',
        function onResult(err, result) {
          client.release();
          reply.send(err || result);
        }
      );
    }
  });
}

module.exports = dbActions;
