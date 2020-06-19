//FEATURE: Add decorateReply as a plugin

const path = require('path');
const fs = require('fs');
const pump = require('pump');

module.exports = async function (fastify, opts) {
  // ROUTES

  // ROUTES "POST-MP3" TO STORAGE FOLDER
  //TODO: Dont repeat yourself
  fastify.post('/beats/mp3', async (request, reply) => {
    const mp = request.multipart(handler, function (err) {
      if (err) {
        reply.code(400).send({
          uploaded: false,
          fileType: 'mp3',
          error: err,
        });
      } else {
        reply.code(200).send({
          uploaded: true,
          fileType: 'mp3',
          error: 'Uploaded without errors',
        });
      }
    });
    mp.on('field', function (key, value) {
      console.log('form-data', key, value);
    });

    function handler(field, file, filename, encoding, mimetype) {
      pump(file, fs.createWriteStream(`./storage/mp3/${filename}`));
    }
  });

  fastify.post('/beats/wav', async (request, reply) => {
    const mp = request.multipart(handler, function (err) {
      if (err) {
        reply.code(400).send({
          uploaded: false,
          fileType: 'wav',
          error: err,
        });
      } else {
        reply.code(200).send({
          uploaded: true,
          fileType: 'wav',
          error: 'Uploaded without errors',
        });
      }
    });
    mp.on('field', function (key, value) {
      console.log('form-data', key, value);
    });

    function handler(field, file, filename, encoding, mimetype) {
      pump(file, fs.createWriteStream(`./storage/wav/${filename}`));
    }
  });


  fastify.post('/beats/stems', async (request, reply) => {
    const mp = request.multipart(handler, function (err) {
      if (err) {
        reply.code(400).send({
          uploaded: false,
          fileType: 'zip',
          error: err,
        });
      } else {
        reply.code(200).send({
          uploaded: true,
          fileType: 'zip',
          error: 'Uploaded without errors',
        });
      }
    });
    mp.on('field', function (key, value) {
      console.log('form-data', key, value);
    });

    function handler(field, file, filename, encoding, mimetype) {
      pump(file, fs.createWriteStream(`./storage/stems/${filename}`));
    }
  });


};