
async function postPurchase (fastify, options) {
    fastify.register(require('fastify-mysql'), {
        connectionString:
            'mysql://ace:bnhepos34q0dnu6p@db1-deuxfractales-do-user-7211070-0.a.db.ondigitalocean.com:25060/deuxfractales?',
    });
    const fs = require("fs");
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');
    fastify.get('/postPurchase', async (request, reply) => {
        //https://www.twilio.com/blog/sending-email-attachments-with-sendgrid
        //const pathToAttachment = `${__dirname}/attachment.pdf`;
        //This should be used when implementing the production build
        //const attachment = fs.readFileSync(`./storage/mp3/${filename}`).toString("base64");
        // Line 11 is just for testing purposes
        const attachmentMp3 = fs.readFileSync('./storage/mp3/test1.mp3').toString("base64");
        const attachmentWav = fs.readFileSync('./storage/wav/test1.wav').toString("base64");
        const attachmentZip = fs.readFileSync('./storage/zip/test1.zip').toString("base64");

        const msg = {
            to: 'ben.langley@deuxfractales.com',
            from: 'ben.langley@deuxfractales.com',
            subject: 'Your Type Beat Warehouse Purchase',
            text: 'Here is your full purchase!',
            //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            attachments: [
                {
                    content: attachmentMp3,
                    //filename: `${filename}.mp3`,
                    filename: "mp3",
                    type: "audio/mpeg",
                    disposition: "attachment"
                },
                {
                    content: attachmentWav,
                    //filename: `${filename}.wav`,
                    filename: "wav",
                    type: "audio/wav",
                    disposition: "attachment"
                },
                {
                    content: attachmentZip,
                    //filename: `${filename}.zip`,
                    filename: "attachment.pdf",
                    type: "application/zip",
                    disposition: "attachment"
                }
            ]
        };
        sgMail
            .send(msg)
            .then(() => {}, error => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            });
        //reply.send('email sent')

        // Add functionality to delete row from db
        // fastify.mysql.getConnection(onConnect)
        // function onConnect (err, client) {
        //     if (err) return reply.send(err)
        //
        //     client.query(
        //         'DELETE FROM `beatz` WHERE 'name' = ``',
        //         function onResult (err, result) {
        //             client.release()
        //             reply.send(err || result)
        //         }
        //     )
        // }

        // Add functionality to delete files from server

        // let deletedFiles = []
        // function deleteFiles() {
        //     const pathMp3 = './storage/mp3/test1.mp3'
        //     fs.unlink(path, (err) => {
        //         if (err) {
        //             console.error(err)
        //         } else {
        //             deletedFiles.push('mp3 deleted')
        //         }
        //     })
        //     const pathWav = './storage/wav/test1.wav'
        //     fs.unlink(path, (err) => {
        //         if (err) {
        //             console.error(err)
        //         } else {
        //             deletedFiles.push('wav deleted')
        //         }
        //     })
        //     const pathZip = './storage/wav/test1.zip'
        //     fs.unlink(path, (err) => {
        //         if (err) {
        //             console.error(err)
        //         } else {
        //             deletedFiles.push('zip deleted')
        //         }
        //     })
        // }
    })
}


module.exports = postPurchase