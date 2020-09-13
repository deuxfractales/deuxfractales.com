// Import our Controllers
const audioController = require('../controllers/audio');

module.exports = async function (fastify, options) {
  
  // GET all audios 
  fastify.get('/audio/mp3/:name', audioController.getMP3Audio);
  
  fastify.get('/audio/wav/:name', audioController.getWAVAudio);
  
  fastify.get('/audio/zip/:name', audioController.getZIPAudio);
  
  // fastify.get('/audio', audioController.getAllArtists);

  // fastify.post('/audio', audioController.createArtist);

  // fastify.patch('/audio/:name', audioController.updateArtist);

  // fastify.delete('/audio/:name', audioController.deleteArtist);
};
