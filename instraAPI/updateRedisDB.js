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

    // get query of all artists from mySQL DB, and sotre them in sorted sets in the Redis DB

    // TODO: remove the empty value in the artists.ig_handle table
    // 
    
    // const artists = await axios.get('http://localhost:3001/db/f3');

    // // Store all artists in the redis database
    // artists.data.map((artist) => {
    //   if (!artist.ig_handle == '') {
    //     client.zadd('artists', 0, artist.ig_handle);
    //   }
    // });

    // First Check: create a sorted set for each artist that will contain the followers of that artist (ex. 'Travis Scott Followers')

    ig.startModule().then((res) => {
      client.zrange('artists', 0, -1, function (err, results) {
        results.map((artist) => {
          ig.lookUp(artist).then((users) => {
            users.map((user) => {
              client.rpush(`${artist} Followers`, user.username);
            });
          });
        });
      });
    });

    // Second Check: create a sorted set for each artist that will contain all of the users that liked any one of the artists images

    ig.startModule().then((res) => {
      client.zrange('artists', 0, -1, function (err, results) {
        results.map((artist) => {
          ig.getPosts(artist).then((users) => {
            users.map((user) => {
              user.liked.map((liked) => {
                client.rpush(`${artist} Post Likers`, 1, liked);
              });
            });
          });
        });
      });
    });
  
} catch (error) {
    console.log(`Error: ${error}`);
  }
}
main();
