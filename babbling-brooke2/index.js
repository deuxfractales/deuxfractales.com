const fastify = require('fastify')();

fastify.register(require('fastify-cors'), {
  // put your options here
  origin: 'http://localhost:8080',
  methods: ['GET,PUT,POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
});

fastify.register(require('fastify-multipart'))

// Register routes
fastify.register(require('./startPage'));
fastify.register(require('./dbActions'));
fastify.register(require('./audioStream'));
fastify.register(require('./postBeats'));

const start = async () => {
  try {
    await fastify.listen(3001);
    console.log('connected');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
    console.log(err);
  }
};

start();
