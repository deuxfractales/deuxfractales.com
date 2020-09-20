const path = require('path');
const fs = require('fs');
const pump = require('pump');
const { fastify } = require('../index');

exports.incrementBeatPlays = async (request, reply) => {
  try {
    const { Beats } = fastify.sequelize;
    const beats = await changeURL(
      Beats.increment('plays', {
        by: 1,
        where: {
          name: request.params.name,
        },
      })
    );
    return beats;
  } catch (error) {
    reply.send(error);
  }
};

exports.getAllBeats = async (request, reply) => {
  try {
    const { Beats } = fastify.sequelize;
    return await Beats.findAll();
  } catch (error) {
    reply.send(error);
  }
};

/* CRUD FUNCTIONALITY */
exports.getBeat = async (request, reply) => {
  try {
    const { Beats } = fastify.sequelize;
    const name = request.params.name;
    return await Beats.findOne({ where: { name } });
  } catch (error) {
    reply.send(error);
  }
};

exports.createBeat = async (request, reply) => {
  try {
    if (!request.isMultipart()) {
      // you can use this decorator instead of checking headers
      reply.code(400).send(new Error('Request is not multipart'));
      return;
    }

    const { Beats } = fastify.sequelize;
    const body = {};

    const parts = await request.parts();
    for await (const part of parts) {
      if (part.file) {
        const { ext } = path.parse(part.filename);
        if (ext === '.mp3' || ext === '.wav' || ext === '.zip') {
          await pump(
            part.file,
            fs.createWriteStream(`./storage/${ext.slice(1)}/${part.filename}`)
          );
        }
      } else {
        var field = part.fields;

        body[field.name.fieldname] = field.name.value;
        body[field.url.fieldname] = field.url.value;
        body[field.genre.fieldname] = field.genre.value;
        body[field.related_artist.fieldname] = field.related_artist.value;
        body[field.k.fieldname] = field.k.value;
        body[field.d.fieldname] = field.d.value;
        body[field.pricing.fieldname] = field.pricing.value;
        body[field.producer.fieldname] = field.producer.value;

        console.log(body);
        return await Beats.create(body);
      }
    }

    // var body = {};
    // const mp = request.multipart(handler, onEnd);

    // mp.on('field', (key, value) => {
    //   body[key] = value;
    // });

    // async function onEnd(err) {
    //   if (err) {
    //     reply.code(400).send({
    //       uploaded: false,
    //       error: err,
    //     });
    //   } else {
    //     const beat = await Beats.create(body);
    //     reply.code(200).send({
    //       uploaded: true,
    //       success: 'Upload Complete',
    //       data: beat,
    //     });
    //   }
    // }

    // function handler(field, file, filename, encoding, mimetype) {
    //   const { ext } = path.parse(filename);
    //   if (ext === '.mp3' || ext === '.wav' || ext === '.zip') {
    //     pump(
    //       file,
    //       fs.createWriteStream(`./storage/${ext.slice(1)}/${filename}`)
    //     );
    //   } else {
    //     console.log('error');
    //   }
    // }
  } catch (error) {
    reply.send(error);
  }
};

exports.updateBeat = async (request, reply) => {
  try {
    let name = request.body.name;
    let url = request.body.url;
    let genre = request.body.genre;
    let related_artist = request.body.related_artist;
    let k = request.body.k;
    let d = request.body.d;
    let pricing = request.body.pricing;
    let producer = request.body.producer;

    return await producer.update(
      { name, url, genre, related_artist, k, d, pricing, producer },
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

exports.deleteBeat = async (request, reply) => {
  try {
    const { Beats } = fastify.sequelize;
    return await Beats.destroy({
      where: {
        name: request.params.name,
      },
    });
  } catch (error) {
    reply.send(error);
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
      plays: eachRes.plays,
      k: eachRes.k,
      d: eachRes.d,
      producer: eachRes.producer,
    };
    beats.push(beat);
  }
  return beats;
}
