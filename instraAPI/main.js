const request = require('request');
const axios = require('axios');
const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const Promise = require('bluebird');

const get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

const following = 'd04b0a864b4b54837c0d870b0e77e076';
const followers = 'c76146de99bb02f6415203be841dd25a';

const posts = '9dcf6e1a98bc7f6e92953d5a61027b98';
const postsLiked = 'd5d763b1e2acf209d62d22d184488e57';

let accountCycle = 0;
let cookies = [
  'ig_did=D24124C4-5F47-4678-8739-EA397F703E08; mid=XqT9QQAEAAGYF68bE6bFMGIi9O0F; rur=FTW; csrftoken=ECLoFH0lyO2ZRAwrXHOLMWvFrJLk2Xva; ds_user_id=33701292098; sessionid=33701292098%3ATBrKwFSIm5aGi2%3A4;',
];

const logins = [
  {
    username: 'noclout_goodmusic',
    password: '2Kd12##pqow',
  },
  {
    username: 'sikomiw663',
    password: '22Kd12##pqow2',
  },
  {
    username: 'burner90210',
    password: 'a_Emt"b8Tz5j4W@',
  },
  {
    username: 'sewcul6',
    password: 'a_Emt"b8Tz5j4W@',
  },
];

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// LookedUp, Username, FullName

function getCookies(username, pass) {
  return new Promise(async (resolve, reject) => {
    let proxyAddress =
      'http://scraperapi:b181e26cb6b1aec09907888cdae3b52f@proxy-server.scraperapi.com:8001';

    let driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(
        new firefox.Options()
          // .addArguments(`--proxy-server=${proxyAddress}`)
          .headless()
      )

      .build();
    let cookieString = '';
    try {
      await driver.get('http://www.instagram.com/');
      await driver.wait(until.elementLocated(By.name('username')), 10000);
      await driver.wait(until.elementLocated(By.name('password')), 10000);

      await driver.findElement(By.name('username')).sendKeys(username);
      await driver.findElement(By.name('password')).sendKeys(pass, Key.RETURN);

      let cookies = await driver.manage().getCookies();

      while (cookies.find((el) => el.name == 'sessionid') === undefined) {
        await timeout(1000);
        cookies = await driver.manage().getCookies();
      }

      cookieString = cookies.reduce((acc, el) => {
        return acc + `${el.name}=${el.value}; `;
      }, '');
    } catch (e) {
      reject('Something went wrong getting the cookies for ' + username);
    } finally {
      await driver.quit();
      resolve(cookieString);
    }
  });
}

function startModule() {
  return new Promise((resolve) => {
    promises = logins.map((login) =>
      getCookies(login.username, login.password)
    );

    Promise.all(promises).then((res) => {
      // Set global cookies
      cookies = res;
      console.log(cookies);
      resolve(res);
    });
  });
}

function getPostsLiked(shortcode, cookie, after) {
  const baseURL = `http://www.instagram.com/graphql/query/?query_hash=${postsLiked}&variables=`;

  const variables = {
    shortcode,
    include_reel: true,
    first: 50, // 50 seems to be the max as of April 25 2020
    after,
  };

  const options = {
    url: `${baseURL}${JSON.stringify(variables)}`,
    headers: {
      Cookie: cookie,
    },
    proxy:
      'http://scraperapi:b181e26cb6b1aec09907888cdae3b52f@proxy-server.scraperapi.com:8001',
  };

  return new Promise((resolve) => {
    request(options, (error, response, bodyRaw) => {
      const edge_liked_by = JSON.parse(bodyRaw).data.shortcode_media
        .edge_liked_by;

      console.log(edge_liked_by.edges.length);

      if (edge_liked_by.page_info.has_next_page) {
        getPostsLiked(
          shortcode,
          cookie,
          edge_liked_by.page_info.end_cursor
        ).then((res) => {
          resolve(res.concat(edge_liked_by.edges));
        });
      } else {
        resolve(edge_liked_by.edges);
      }
    });
  });
}

function getPostsAfter(id, after, cookie, depth) {
  // Number of requests to do
  // 0 is one request
  // 1 is two requests
  // ...
  const maxDepth = 0;

  baseURL = `http://www.instagram.com/graphql/query/?query_hash=${posts}&variables=`;

  const variables = {
    id,
    first: 20,
    after,
  };

  const options = {
    url: `${baseURL}${JSON.stringify(variables)}`,
    headers: {
      Cookie: cookie,
    },
    proxy:
      'http://scraperapi:b181e26cb6b1aec09907888cdae3b52f@proxy-server.scraperapi.com:8001',
  };

  return new Promise((resolve) => {
    request(options, (error, response, bodyRaw) => {
      const timeline_media = JSON.parse(bodyRaw).data.user
        .edge_owner_to_timeline_media;

      if (timeline_media.page_info.has_next_page && depth < maxDepth) {
        getPostsAfter(
          id,
          timeline_media.page_info.end_cursor,
          cookie,
          depth + 1
        ).then((res) => {
          resolve(res.concat(timeline_media.edges));
        });
      } else {
        resolve(timeline_media.edges);
      }
    });
  });
}

function getPosts(id) {
  accountCycle++;
  if (accountCycle > logins.length - 1) {
    accountCycle = 0;
  }

  const cookie = cookies[accountCycle];

  return new Promise((resolve) => {
    getUID(id, (uid) => {
      getPostsAfter(uid, undefined, cookie, 0).then((res) => {
        const shortCodes = res.map((el) => el.node.shortcode);

        Promise.map(
          shortCodes,
          (shortCode) => getPostsLiked(shortCode, cookie),
          { concurrency: 1 }
        ).then((likedArrays) => {
          const parsedArrays = likedArrays.map((arr, i) => {
            const {
              display_url,
              dimensions,
              is_video,
              shortcode,
              owner,
              edge_media_to_caption,
            } = res[i].node;

            return {
              display_url,
              dimensions,
              is_video,
              shortcode,
              owner,
              edge_media_to_caption,
              liked: arr.map((el) => el.node.username),
            };
          });

          resolve(parsedArrays);
        });
      });
    });
  });
}

// getPosts('gryphonracing')
//  .then((res) => {
//    console.log(res);
//  });

// startModule().then(() => {})

//startModule().then((res) => {
//  lookUp('gryphonracing').then((users) => {
//    console.log(users)
//  })
//  lookUp('gryphonracing').then((users) => {
//    console.log(users)
//  })
//  lookUp('gryphonracing').then((users) => {
//    console.log(users)
//  })
//})

function lookUp(id) {
  return new Promise((resolve) => {
    getUID(id, (uid) => {
      accountCycle++;
      if (accountCycle > logins.length - 1) {
        accountCycle = 0;
      }
      getRequestUser(uid, cookies[accountCycle], '', followers, function (
        users
      ) {
        resolve(users);
      });
    });
  });
}

function getUID(username, callback_) {
  const url = `http://www.instagram.com/${username}/?__a=1`;
  request(
    {
      method: 'GET',
      url,
      json: true,
      proxy:
        'http://scraperapi:b181e26cb6b1aec09907888cdae3b52f@proxy-server.scraperapi.com:8001',
    },
    (error, response, body) => callback_(get(['graphql', 'user', 'id'], body))
  );
}

function getRequestUser(id, cookie, cursor, query, cb) {
  const baseURL = `http://www.instagram.com/graphql/query/?query_hash=${query}&variables=`;
  const variables = {
    id: id,
    include_reel: true,
    fetch_mutual: false,
    first: 100,
    after: cursor,
  };

  const options = {
    url: `${baseURL}${JSON.stringify(variables)}`,
    headers: {
      Cookie: cookie,
    },
    proxy:
      'http://scraperapi:b181e26cb6b1aec09907888cdae3b52f@proxy-server.scraperapi.com:8001',
  };

  request(options, (error, response, bodyRaw) => {
    const body = JSON.parse(bodyRaw);
    console.log(body);
    if (body.status === 'ok') {
      let data = [];

      if (body.data.user.edge_followed_by) {
        data = body.data.user.edge_followed_by;
      } else {
        data = body.data.user.edge_follow;
      }

      let { count, page_info } = data;
      let { has_next_page, end_cursor } = page_info;

      const users = data.edges.map((datum) => ({
        username: datum.node.username,
        fullName: datum.node.full_name,
      }));

      if (has_next_page) {
        getRequestUser(id, cookie, end_cursor, query, function (users_other) {
          setTimeout(() => {
            cb(users.concat(users_other));
          }, 1000);
        });
      } else {
        setTimeout(() => {
          cb(users);
        }, 1000);
      }
    } else {
      console.log(`Error: ${error}`);
    }
  });
}

module.exports = { startModule, lookUp, getPosts };
