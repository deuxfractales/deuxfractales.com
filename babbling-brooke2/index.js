const fastify = require('fastify')();
const ip = require('ip')

const serverIP = ip.address();

// intialize env file based on server ip address
if(serverIP == '192.168.5.15'){
  require('dotenv').config({path:'../config/envs/dev.env'})
}
else if(serverIP == 'PRODUCTION IP'){
  require('dotenv').config({path:'../config/envs/prod.env'})
}


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
