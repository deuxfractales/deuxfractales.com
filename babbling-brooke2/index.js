var ip = require('ip');

const currentIp = ip.address()

if(currentIp === '192.168.56.1'){
    require('dotenv').config({ path: '../config/envs/dev.env' })
}else if(currentIp === '138.197.137.112'){
    require('dotenv').config({ path: '../config/envs/prod.env' })
}


const fastify = require('fastify')();

fastify.register(require('fastify-cors'), {
  // put your options here
  origin: `http://${process.env.IP}:8080`,
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
