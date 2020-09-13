// Import Controllers
const beatsController = require('../controllers/beats');

module.exports = async function (fastify, options) {
  // GET all beats
  fastify.get('/beats', beatsController.getAllBeats);

  // INCREMENT plays
  fastify.patch('/beats/:name/played', beatsController.incrementBeatPlays);

  // GET a beat
  fastify.get('/beats/:name', beatsController.getBeat);

  // POST a beat
  fastify.post('/beats', beatsController.createBeat);

  // PATCH a beat
  fastify.patch('/beats/:name', beatsController.updateBeat);

  // DELETE a beat
  fastify.delete('/beats/:name', beatsController.deleteBeat);
};
