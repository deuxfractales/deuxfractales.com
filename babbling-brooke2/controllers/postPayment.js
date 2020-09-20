const fs = require('fs');
const sgMail = require('@sendgrid/mail');

exports.postPurchase = async function (request, reply) {
  sgMail.setApiKey(process.env.SGMAIL_API_KEY);

  let purchases = request.body.purchasedItems;
  purchases.forEach(function (purchase) {
    let beatName = purchase.title;
    const attachmentMp3 = fs
      .readFileSync(`./storage/mp3/${beatName}.mp3`)
      .toString('base64');
    const attachmentWav = fs
      .readFileSync(`./storage/wav/${beatName}.wav`)
      .toString('base64');
    const attachmentZip = fs
      .readFileSync(`./storage/zip/${beatName}.zip`)
      .toString('base64');

    let customerEmail = request.body.email;
    const msgBeats = {
      to: `${customerEmail}`,
      from: 'ben.langley@deuxfractales.com',
      subject: 'Your Type Beat Warehouse Purchase - Beats',
      text: 'Here is your full purchase!',
      attachments: [
        {
          content: attachmentMp3,
          //filename: `${filename}.mp3`,
          filename: 'mp3',
          type: 'audio/mpeg',
          disposition: 'attachment',
        },
        {
          content: attachmentWav,
          //filename: `${filename}.wav`,
          filename: 'wav',
          type: 'audio/wav',
          disposition: 'attachment',
        },
        {
          content: attachmentZip,
          //filename: `${filename}.zip`,
          filename: 'attachment.pdf',
          type: 'application/zip',
          disposition: 'attachment',
        },
      ],
    };

    let todaysDate = request.body.todaysDate;
    let customerName = request.body.fullName;
    let customerAddress = request.body.address;
    let country = request.body.country;
    let nameOfBeatPurchased = [request.body.purchases];
    let totalPurchaseAmount = request.body.subtotal;
    const msgLicense = {
      to: 'ben.langley@deuxfractales.com',
      from: 'ben.langley@deuxfractales.com',
      subject: 'Your Type Beat Warehouse Purchase - Licence',
      text: 'Here is your full purchase!',
      html: `<p><strong><span data-contrast="none">License Agreement</span></strong>&nbsp;<br /><strong><span data-contrast="none">(EXCLUSIVE RIGHTS)</span></strong>&nbsp;<br /><strong><span data-contrast="none">Sound Recording/BEATS</span></strong></p>
                <p><span data-contrast="none">THIS LICENCE AGREEMENT is made on ${todaysDate} ("Effective Date") by and between ${customerName} (hereinafter referred to as the "Licensee"), whose principle address is&nbsp;</span><span data-contrast="none">${customerAddress}</span><span data-contrast="none">,&nbsp;</span><span data-contrast="none">${country}</span><span data-contrast="none">, and&nbsp;</span><span data-contrast="none">DEUX FRACTALES AUDIO INC. (DBA: TYPE BEAT WAREHOUSE)</span><span data-contrast="none">&nbsp;(hereinafter referred to as the "Licensor"), whose principle address is 48, Willow Hill Ridge,&nbsp;</span><span data-contrast="none">Waverly</span><span data-contrast="none">, Nova Scotia, Canada. Licensor warrants that it controls the mechanical rights in and to the copyrighted musical works entitled&nbsp;</span><span data-contrast="none">${nameOfBeatPurchased}</span><span data-contrast="none">&nbsp;("Composition") as of and prior to the date first written above. The Composition, including the music thereof, was composed by Legal Name ("Songwriter") managed under the Licensor.</span></p>
                <p><strong><span data-contrast="none">Master Use.</span></strong><span data-contrast="none">&nbsp;The Licensor hereby grants to License an exclusive license (this "License") to record vocal synchronization to the Composition partly or in its entirety and substantially in its original form ("Master Recording").</span></p>
                <p><strong><span data-contrast="none">Mechanical Rights.</span></strong><span data-contrast="none">&nbsp;The Licensor hereby grants to Licensee an exclusive license to use Master Recording in the reproduction, duplication, manufacture, and distribution of phonograph records, cassette tapes, compact disk, digital downloads, other miscellaneous audio and digital recordings, and any lifts and versions thereof (collectively, the "Recordings", and individually, a "Recordings") worldwide for unlimited copies of such Recordings or any combination of such Recordings, condition upon the payment to the Licensor a sum of&nbsp;</span><span data-contrast="none">${totalPurchaseAmount}</span><span data-contrast="none">CAD</span><span data-contrast="none">&nbsp;Dollars, receipt of which is confirmed.</span></p>
                <p><strong><span data-contrast="none">Performance Rights.</span></strong><span data-contrast="none">&nbsp;The Licensor here by grants to Licensee an exclusive license to use the Master Recording in unlimited for-profit performances, shows, or concerts.</span></p>
                <p><strong><span data-contrast="none">Broadcast Rights.</span></strong><span data-contrast="none">&nbsp;The Licensor hereby grants to Licensee an exclusive&nbsp;licence&nbsp;to broadcast or air the Master Recording in unlimited amounts of radio stations.</span></p>
                <p><strong><span data-contrast="none">Credit.</span></strong><span data-contrast="none">&nbsp;Licensee shall acknowledge the original authorship of the Composition appropriately and reasonably in all media and performance formats under the name "Producer Name" in writing where possible and vocally otherwise.</span></p>
                <p><strong><span data-contrast="none">Consideration.</span></strong><span data-contrast="none">&nbsp;In consideration for the rights granted under this agreement, Licensee shall pay to licensor the sum of&nbsp;</span><span data-contrast="none">${totalPurchaseAmount}</span><span data-contrast="none">CAD&nbsp;</span><span data-contrast="none">dollars and other good and valuable consideration, payable to&nbsp;</span><span data-contrast="none">Licensor</span><span data-contrast="none">, receipt of which is hereby acknowledged. If the Licensee fails to account to the Licensor, timely complete the payments provided for hereunder, or perform its other obligations hereunder, including having insufficient bank balance, the licensor shall have the right to terminate License upon written notice to the Licensee. Such termination shall render the recording, manufacture and/or distribution of Recordings for which monies have not been paid subject to and actionable infringements under applicable law, including, without limitation, the United States Copyright Act, as amended.</span></p>
                <p><strong><span data-contrast="none">Delivery.</span></strong><span data-contrast="none">&nbsp;The Composition shall be delivered via email to an email address that Licensee provided when making their payment to Licensor. Licensee shall receive an email containing an attachment or link from which they can download the Composition.</span></p>
                <p><strong><span data-contrast="none">Indemnification.</span></strong><span data-contrast="none">&nbsp;Accordingly, Licensee agrees to indemnify and hold Licensor harmless from and against any and all claims, losses, damages, costs, expenses, including, without limitation, reasonable attorney's fees, arising of or resulting from a claimed breach of any of Licensee's representations, warranties or agreements hereunder.</span></p>
                <p><strong><span data-contrast="none">Audio Samples.</span></strong><span data-contrast="none">&nbsp;3rd party sample clearance is the responsibility of the Licensee.</span></p>
                <p><strong><span data-contrast="none">Miscellaneous.</span></strong><span data-contrast="none">&nbsp;This license is non-transferable and is limited to the Composition specified above, constitutes the entire agreement between the Licensor and the Licensee relating to the Composition, and shall be binding upon both the Licensor and the Licensee and their respective successors, assigns, and legal representatives.</span></p>
                <p><strong><span data-contrast="none">Governing Law.</span></strong><span data-contrast="none">&nbsp;This License is governed by and shall be construed under the law of the State of Nova Scotia, Canada, without regard to the conflicts of laws principles thereof.</span></p>
                <p><strong><span data-contrast="none">Publishing.</span></strong></p>
                <p><span data-contrast="none">Licensee, owns 100% of publishing rights.</span>&nbsp;<br /><span data-contrast="none">Licensor, owns 0% of publishing rights.</span></p>
                <p><span data-contrast="none">When composition passes $9,999 in revenue&nbsp;</span><span data-contrast="none">generated</span><span data-contrast="none">&nbsp;from all forms of use</span><span data-contrast="none">, then:</span></p>
                <p><span data-contrast="none">ARTIST, owns 90% of publishing rights.</span>&nbsp;<br /><span data-contrast="none">Legal Name, owns 10% of publishing rights.</span></p>
                <p><span data-contrast="none">Finished audio recording by Licensee of audio release can distribute to music supervisors for consideration of synchronization licensing. Only the recording artist or recording company can monetize with this license. This is not a synchronization license for music supervisors of the TV, Film and Video game industry.</span></p>
                <p><span data-contrast="none">THE PARTIES HAVE DULY EXECUTED THIS AGREEMENT on the date first written above.</span></p>`,
    };

    sgMail
      .send(msgBeats)
      .send(msgLicense)
      .then(
        () => {},
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );

    reply.send('emails sent');

    // Add functionality to delete row from db
    // DATABASE.mysql.getConnection(onConnect)
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
  });
};
