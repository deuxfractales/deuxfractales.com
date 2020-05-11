const ig = require('./main');

ig.startModule().then((res) => {
  ig.lookUp('21savage').then((users) => {
    console.log(users.username);
  });

  // ig.getPosts('saucedbenny').then((data) => {
  //   console.log(data);
  // });
});