const ig = require('./main');

ig.startModule().then((res) => {
  ig.lookUp('saucedbenny').then((users) => {
    console.log(users.username);
  });
});
