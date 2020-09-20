const { fastify } = require('../index');

exports.incrementArtistClicks = async (request, reply) => {
  try {
    const { Artists } = fastify.sequelize;

    return await Artists.increment('clicks', {
      by: 1,
      where: {
        artist_name: request.params.name,
      },
    });
  } catch (error) {
    reply.send(error);
  }
};

exports.getAllArtists = async (request, reply) => {
  try {
    const { Artists } = fastify.sequelize;
    return await Artists.findAll();
  } catch (error) {
    reply.send(error);
  }
};

exports.createArtist = async (request, reply) => {
  try {
    const { Artists } = fastify.sequelize;
    let artist_name = request.body.artist_name;
    let subgenre = request.body.subgenre;
    let ig_handle = request.body.ig_handle;

    return await Artists.create({ artist_name, subgenre, ig_handle });
  } catch (error) {
    reply.send(error);
  }
};

exports.updateArtist = async (request, reply) => {
  try {
    const { Artists } = fastify.sequelize;
    let artist_name = request.body.artist_name;
    let subgenre = request.body.subgenre;
    let ig_handle = request.body.ig_handle;

    return await Artists.update(
      { artist_name, subgenre, ig_handle },
      {
        where: {
          artist_name: request.params.name,
        },
      }
    );
  } catch (error) {
    reply.send(error);
  }
};

exports.deleteArtist = async (request, reply) => {
  try {
    const { Artists } = fastify.sequelize;
    return await Artists.destroy({
      where: {
        artist_name: request.params.name,
      },
    });
  } catch (error) {
    reply.send(error);
  }
};
