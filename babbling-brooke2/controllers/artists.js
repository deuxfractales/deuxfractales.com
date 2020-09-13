const { DATABASE } = require('../index');

exports.getAllArtists = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'SELECT artist_name,subgenre,ig_handle FROM deuxfractales.artists',
      function onResult(err, result) {
        console.log(result);
        reply.send(err || result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.createArtist = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'INSERT INTO artists (artist_name,subgenre,ig_handle) VALUES (?,?,?)',
      [request.body.artist_name, request.body.subgenre, request.body.ig_handle],
      function onResult(err, result) {
        console.log(result);
        reply.send(err || result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updateArtist = async (request, reply) => {
  try {
    let artist_name = request.body.artist_name;
    let subgenre = request.body.subgenre;
    let ig_handle = request.body.ig_handle;

    DATABASE.mysql.query(
      'UPDATE artists SET artist_name=?,subgenre=?,ig_handle=? WHERE name=?',
      [artist_name, subgenre, ig_handle, name],
      function onResult(err, result) {
        reply.send(err || result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteArtist = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'DELETE FROM artists WHERE artist_name=?;',
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

exports.incrementArtistClicks = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'UPDATE artists SET clicks=clicks+1 WHERE artist_name=?',
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
