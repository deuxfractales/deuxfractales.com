const { DATABSE } = require('../index');

exports.getAudio = async (request, reply) => {
  reply.sendFile(`/${request.params.name}.mp3`);
};
