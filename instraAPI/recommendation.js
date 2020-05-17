const Redis = require('redis-ssh');
const axios = require('axios');

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

    const ig_username = '0l0l0l0l0l0l0987';

    // Sorted set --> ["artists": {"@travisscott": 0, "@cardib": 12}]

    client.zrange('artists', 0, -1, function (err, results) {
      results.map((artist) => {
        // Perform first check: increment scores of followed artists
        client.zrank(`${artist} Followers`, ig_username, function(err, data) {
          if (data != null) {
            client.zincrby('artists', 1, artist);
          }
        })

        // Perform second check: increment scores based on how many posts of the artist the user liked
        client.zscore(`${artist} Post Likers`, ig_username, function(err, data) {
          if (data != null) {
            client.zincrby('artists', data, artist);
          }
        })
      })
    });
  
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
main();
