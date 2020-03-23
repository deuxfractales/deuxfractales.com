
const AutoLoad = require('fastify-autoload');
const path = require('path');


module.exports = function (fastify, opts, next) {
  // Place here your custom code!

  // "FASTIFY-REDIS" IMPORT, CONFIG AND REGISTER
  fastify.register(require('fastify-redis'), {
    // TODO: Check redis IP
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS,
  });


  // "FASTIFY-CORS" IMPORT AND REGISTER
  fastify.register(require('fastify-cors'), {
    // put your options here
    origin: 'http://localhost:8080',
    methods: ['GET,PUT,POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
  });

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'services/storage'),
    prefix: '/', // optional: default '/'
  })


  // "FASTIFY-MULTIPART" IMPORT AND REGISTER
  fastify.register(require('fastify-multipart'));

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });


  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: { ...opts },
  });

  // Make sure to call next when done
  next();
};
