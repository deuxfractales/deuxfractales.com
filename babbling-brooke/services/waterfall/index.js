const sgMail = require('@sendgrid/mail');

module.exports = async function (fastify) {
  fastify.post('/sniphook', async (req, reply) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const { items } = req.body.content;
    const { user } = req.body.content;
    let mp3 = 0;
    let wav = 0;
    let stems = 0;

    function incrWav() {
      // eslint-disable-next-line no-plusplus
      return wav++;
    }
    function incrStems() {
      // eslint-disable-next-line no-plusplus
      return stems++;
    }
    function incrMp3() {
      // eslint-disable-next-line no-plusplus
      return mp3++;
    }

    await items.forEach((beat) => {
      beat.customFields.forEach((field) => {
        if (field.value === 'WAV') {
          incrWav();
        } else if (field.value === 'STEMS') {
          incrStems();
        } else {
          incrMp3();
        }
      });
    });
    await sgMail.send(msg);

    reply.send({ purachses: `${user.email} bought ${mp3} mp3's, ${wav} wav's and ${stems} stems` });
  });
};
