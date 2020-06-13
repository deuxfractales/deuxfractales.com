const ig = require('./main');

ig.startModule().then((res) => {
  ig.lookUp('future').then((users) => {
    console.log(users[0].username);
  });

  // ig.getPosts('saucedbenny').then((data) => {
  //   console.log(data)
  // });
});
