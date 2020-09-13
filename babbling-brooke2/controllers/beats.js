const { DATABASE } = require('../index');
const path = require('path');
const fs = require('fs');
const pump = require('pump');

exports.getAllBeats = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'SELECT beatz.id,beatz.name,beatz.url,beatz.genre,beatz.related_artist,beatz.plays,beatz.pricing,beatz.k,beatz.d,beatz.producer, featured.featuredSlot1 FROM featured LEFT JOIN beatz ON beatz.id = featured.beatId',
      function onResult(err, result) {
        const updatedResult = changeUrl(result);
        console.log(updatedResult);
        reply.send(err || updatedResult);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.incrementBeatPlays = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'UPDATE beatz SET plays=plays+1 WHERE name=?',
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

exports.getBeat = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'SELECT id,name,url,genre,related_artist,k,d,pricing,plays,producer FROM beatz WHERE name=?',
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

exports.createBeat = async (request, reply) => {
  try {
    if (!request.isMultipart()) {
      // you can use this decorator instead of checking headers
      reply.code(400).send(new Error('Request is not multipart'));
      return;
    }

    const mp = request.multipart(handler, onEnd);

    mp.on('field', function (key, value) {
      console.log('form-data', key, value);
    });

    function onEnd(err) {
      if (err) {
        reply.code(400).send({
          uploaded: false,
          error: err,
        });
      } else {
        reply.code(200).send({
          uploaded: true,
          success: 'Upload Complete',
        });
      }
    }

    function handler(field, file, filename, encoding, mimetype) {
      const { ext } = path.parse(filename);
      if (ext === '.mp3' || ext === '.wav' || ext === '.zip') {
        pump(
          file,
          fs.createWriteStream(`./storage/${ext.slice(1)}/${filename}`)
        );
      } else {
        console.log('error');
      }
    }

    let id = request.body.id;
    let name = request.body.name;
    let url = request.body.url;
    let genre = request.body.genre;
    let related_artist = request.body.related_artist;
    let k = request.body.k;
    let d = request.body.d;
    let pricing = request.body.pricing;
    let plays = request.body.plays;
    let producer = request.body.producer;

    DATABASE.mysql.query(
      'INSERT INTO beatz (id,name,url,genre,related_artist,k,d,pricing,plays,producer) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [id, name, url, genre, related_artist, k, d, pricing, plays, producer],
      function onResult(err, result) {
        reply.send(err || result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.deleteBeat = async (request, reply) => {
  try {
    DATABASE.mysql.query(
      'DELETE FROM beatz WHERE name=?;',
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

exports.updateBeat = async (request, reply) => {
  try {
    let id = request.body.id;
    let name = request.body.name;
    let url = request.body.url;
    let genre = request.body.genre;
    let related_artist = request.body.related_artist;
    let k = request.body.k;
    let d = request.body.d;
    let pricing = request.body.pricing;
    let plays = request.body.plays;
    let producer = request.body.producer;

    DATABASE.mysql.query(
      'UPDATE beatz SET id=?,name=?,url=?,genre=?,related_artist=?,k=?,d=?,pricing=?,plays=?,producer=? WHERE name=?',
      [
        id,
        name,
        url,
        genre,
        related_artist,
        k,
        d,
        pricing,
        plays,
        producer,
        name,
      ],
      function onResult(err, result) {
        console.log(result);
        reply.send(err || result);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

function changeUrl(result) {
  let beats = [];
  for (a = 0; a < result.length; a++) {
    let eachRes = result[a];
    let beat = {
      // url: eachRes.url.replace("localhost",`${process.env.IP}`),
      url: eachRes.url,
      id: eachRes.id,
      name: eachRes.name,
      genre: eachRes.genre,
      pricing: eachRes.pricing,
      related_artist: eachRes.related_artist,
      featuredSlot1: eachRes.featuredSlot1,
      plays: eachRes.plays,
      k: eachRes.k,
      d: eachRes.d,
      producer: eachRes.producer,
    };
    beats.push(beat);
  }
  return beats;
}
