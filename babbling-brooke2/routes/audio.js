// Import our Controllers
const audioController = require('../controllers/audio');

module.exports = async function (fastify, options) {
  
  // GET all audios 
  fastify.get('/audio/:name', audioController.getAudio);
  
  // fastify.get('/audio', audioController.getAllArtists);

  // fastify.post('/audio', audioController.createArtist);

  // fastify.patch('/audio/:name', audioController.updateArtist);

  // fastify.delete('/audio/:name', audioController.deleteArtist);
};
