// Import our Controllers
const audioController = require('../controllers/audio');

module.exports = async function (fastify, options) {
  // GET all audios
  fastify.get('/audio/:name', audioController.getMP3Audio);
};
