// Import our Controllers
const artistsController = require('../controllers/artists');

module.exports = async function (fastify, options) {
  // INCREMENT clicks
  fastify.patch(
    '/artists/:name/clicked',
    artistsController.incrementArtistClicks
  );

  // GET all artists
  fastify.get('/artists', artistsController.getAllArtists);

  // POST an artist
  fastify.post('/artists', artistsController.createArtist);

  // PATCH an artist
  fastify.patch('/artists/:name', artistsController.updateArtist);

  // DELETE an artist
  fastify.delete('/artists/:name', artistsController.deleteArtist);
};
