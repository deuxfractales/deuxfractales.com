const { fastify } = require('../index');

exports.getAllProducers = async (request, reply) => {
  try {
    const { Producers } = fastify.sequelize;
    return await Producers.findAll();
  } catch (error) {
    reply.send(error);
  }
};

exports.getProducer = async (request, reply) => {
  try {
    const { Producers } = fastify.sequelize;
    return await Producers.findOne({
      where: {
        name: request.params.name,
      },
    });
  } catch (error) {
    reply.send(error);
  }
};

exports.createProducer = async (request, reply) => {
  try {
    const { Producers } = fastify.sequelize;
    let handle = request.body.handle;
    let name = request.body.name;

    return await Producers.create({ handle, name });
  } catch (error) {
    reply.send(error);
  }
};

exports.updateProducer = async (request, reply) => {
  try {
    const { Producers } = fastify.sequelize;
    let handle = request.body.handle;
    let name = request.body.name;

    return await Producers.update(
      { handle, name },
      {
        where: {
          name: request.params.name,
        },
      }
    );
  } catch (error) {
    reply.send(error);
  }
};

exports.deleteProducer = async (request, reply) => {
  try {
    const { Producers } = fastify.sequelize;
    return await Producers.destroy({
      where: {
        name: request.params.name,
      },
    });
  } catch (error) {
    reply.send(error);
  }
};
