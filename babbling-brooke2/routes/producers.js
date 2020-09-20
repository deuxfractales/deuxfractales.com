// Import Controllers
const producersController = require('../controllers/producers');

module.exports = async function (fastify, options) {
  // GET all producers
  fastify.get('/producers', producersController.getAllProducers);

  // GET a producer
  fastify.get('/producers/:name', producersController.getProducer);

  // POST a producer
  fastify.post('/producers', producersController.createProducer);

  // PATCH a producer
  fastify.patch('/producers/:name', producersController.updateProducer);

  // DELETE a producer
  fastify.delete('/producers/:name', producersController.deleteProducer);
};
