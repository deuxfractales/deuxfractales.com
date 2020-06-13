const Redis = require('redis-ssh');

async function recommendation(ig_username) {
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


    client.zrange('artists', 0, -1, function (err, results) {
      results.map((artist) => {  
        // // Get information to normalize data
        var min, max;
        
        // // min
        client.zrange(`${artist} Post Likers`, 0, 0, "WITHSCORES", function(err, data)  {
          min = data[1];
        });

        // // max        
        client.zrevrange(`${artist} Post Likers`, 0, 0, "WITHSCORES", function(err, data)  {
          max = data[1];
        });
        
        // Perform first check: increment scores of followed artists
        client.exists(`${artist} Followers`, ig_username, function(err, data) {
          if (data != null) {
            client.zincrby('artists', 1, artist);
          };
        });
        
        // // Perform second check: increment scores based on the number of posts liked
        client.zscore(`${artist} Post Likers`, ig_username, function(err, data) {
          if (data != null) {
            var normalized = (data-min)/(max-min) || 0;
            client.zincrby('artists', normalized, artist); 
          };
        });  
      });
    }); 


  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

const ig_username = ''
recommendation(ig_username);


