
exports.getMP3Audio = async (request, reply) => {
  reply.sendFile(`mp3/${request.params.name}.mp3`);
};

