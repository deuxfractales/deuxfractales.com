const { DATABSE } = require('../index');

exports.getAllProducers = async (request, reply) => {
  try {
    DATABSE.mysql.query('SELECT handle,name FROM producers', function onResult(
      err,
      result
    ) {
      console.log(result);
      reply.send(err || result);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProducer = async (request, reply) => {
  try {
    DATABSE.mysql.query(
      'SELECT handle,name FROM producers WHERE name=?',
      [request.params.name],
      function onResult(err, result) {
        console.log(result);
        reply.send(err || result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.createProducer = async (request, reply) => {
  try {
    let handle = request.body.handle;
    let name = request.body.name;

    DATABASE.mysql.query(
      'INSERT INTO producers (handle,name) VALUES (?,?)',
      [handle, name],
      function onResult(err, result) {
        reply.send(err || result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updateProducer = async (request, reply) => {
  try {
    let handle = request.body.handle;
    let name = request.body.name;

    DATABASE.mysql.query(
      'UPDATE producers SET handle=?,name=? WHERE name=?',
      [handle, name, name],
      function onResult(err, result) {
        reply.send(err || result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProducer = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'DELETE FROM producers WHERE name=?;',
      [request.params.name],
      function onResult(err, result) {
        const updatedResult = changeUrl(result);
        console.log(updatedResult);
        reply.send(err || updatedResult);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
