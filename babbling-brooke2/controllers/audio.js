const { DATABSE } = require('../index');

exports.getMP3Audio = async (request, reply) => {
  reply.sendFile(`mp3/${request.params.name}.mp3`);
};

exports.getWAVAudio = async (request, reply) => {
  reply.sendFile(`wav/${request.params.name}.wav`);
};

exports.getZIPAudio = async (request, reply) => {
  reply.sendFile(`zip/${request.params.name}.zip`);
};
