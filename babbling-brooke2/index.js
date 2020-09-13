// Require the fastify framework and instantiate it
const fastify = require('fastify')({ logger: true });

const AutoLoad = require('fastify-autoload');
const path = require('path');
const ip = require('ip');

const serverIP = ip.address();

// intialize env file based on server ip address
if (serverIP == '192.168.5.15') {
  require('dotenv').config({ path: './config/envs/dev.env' });
  // console.log(process.env.IP);
} else if (serverIP == '138.197.137.112') {
  require('dotenv').config({ path: './config/envs/prod.env' });
  // console.log(process.env.IP);
} else {
  require('dotenv').config({ path: './config/envs/dev.env' });
  // console.log(process.env.IP);
}

fastify.register(require('fastify-helmet'));
fastify.register(require('fastify-multipart'));
fastify.register(require('fastify-cors'), {
  // put your options here
  // origin: `http://${process.env.IP}:8080`,
  origin: `http://localhost:8080`,
  methods: ['GET,PATCH,POST,DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
});

// Import Audios
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'storage'),
});

// Import Routes Dynamically
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: Object.assign({ prefix: 'api/v1' }),
});

// Databse Connection with Sequalize
// fastify.register(require('fastify-sequelize'), process.env.CONNECTION_STRING, {
//   dialect: 'mysql',
// });

// Databse Connection with mysql queries
exports.DATABASE = fastify.register(require('fastify-mysql'), {
  connectionString: process.env.CONNECTION_STRING,
});

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
