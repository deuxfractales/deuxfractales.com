const Redis = require('redis-ssh');
const axios = require('axios');
const ig = require('./main');

async function main() {
  try {
    const { client, close } = await Redis.connect(
      {
        host: '178.128.239.147',
        user: 'farhan',
        password: 'dfadmin',
      },
      {
        host: '127.0.0.1',
        port: 6379,
        password: 'dfadmin',
      }
    );

    client.on('error', function (err) {
      console.log('Something went wrong ', err);
      close();
    });

    const artists = await axios.get('http://localhost:3001/db/f3');
    const ig_username = 'saucedbenny'; // 'ju.naid1917';
    var allArtists;

    // get query of all artists from mySQL DB, and sotre them in sorted sets in the Redis DB
    // Sorted set --> ["artists": {"@travisscott": 0, "@cardib": 12}]

    for (let i = 0; i < artists.data.length; i++) {
      client.zadd('artists', 0, artists.data[i].ig_handle, Redis.print);
    }

    client.zrange('artists', 0, -1, function (err, results) {
      allArtists = results;
    });

    // perform first check: increment artists user is following
    ig.startModule().then((res) => {
      for (let i = 1; i < allArtists.length; i++) {
        console.log(allArtists[i]);
        ig.lookUp(allArtists[i]).then((users) => {
          for (let j = 0; j < users.length; j++) {
            console.log('asd');
            if (users[j].username === ig_username) {
              // INCR artist by 1
              client.zincrby('artists', 1, allArtists[j]);
            }
          }
        });
      }
    });

  } catch (error) {
    console.log(error);
  }
}
main();
