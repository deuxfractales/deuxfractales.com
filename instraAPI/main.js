const request = require('request')
const axios = require('axios');
const {Builder, By, Key, until} = require('selenium-webdriver');

const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

const following = 'd04b0a864b4b54837c0d870b0e77e076'
const followers = 'c76146de99bb02f6415203be841dd25a'

let accountCycle = 0
let cookies = ['ig_did=75210148-05FD-4FE9-A908-320046518E50; mid=XqIvUQAEAAFdTH8Ji4LpO0Jk0Gfb; csrftoken=xy3etEvtJ9ClDeQsEi9b7NQ5RoIHXtKB; ds_user_id=18018019035; sessionid=18018019035%3ACCAWAtjPCmyYKP%3A1; rur=FTW;']

const logins = [
  {
    username: 'noclout_goodmusic',
    password: '2Kd12##pqow'
  }
//  {
//    username: 'sikomiw663',
//    password: '22Kd12##pqow2'
//  },
//  {
//    username: 'burner90210',
//    password: 'a_Emt"b8Tz5j4W@'
//  },
//  {
//    username: 'sewcul6',
//    password: 'a_Emt"b8Tz5j4W@'
//  }
]

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// LookedUp, Username, FullName

function getCookies(username, pass) {
  return new Promise(async (resolve, reject) => {
    let driver = await new Builder().forBrowser('firefox').build();
    let cookieString = '';
    try {
      await driver.get('https://www.instagram.com/');
      await driver.wait(until.elementLocated(By.name('username')), 10000);
      await driver.wait(until.elementLocated(By.name('password')), 10000);

      await driver.findElement(By.name('username')).sendKeys(username);
      await driver.findElement(By.name('password')).sendKeys(pass, Key.RETURN);

      let cookies = await driver.manage().getCookies()

      while (cookies.find(el => el.name == 'sessionid') === undefined) {
        await timeout(1000);
        cookies = await driver.manage().getCookies()
      }

      cookieString = cookies.reduce((acc, el) => {
        return acc + `${el.name}=${el.value}; `
      }, '')
    } catch(e) {
      reject('Something went wrong getting the cookies for ' + username);
    } finally {
      await driver.quit();
      resolve(cookieString);
    }
  });
};

function startModule() {
  return new Promise((resolve) => {
    promises = logins.map((login) => getCookies(login.username, login.password));

    Promise.all(promises).then((res) => {
      cookies = res
      resolve(res)
    })
  })
}

/*

https://www.instagram.com/graphql/query/?query_hash=9dcf6e1a98bc7f6e92953d5a61027b98&variables=%7B%22id%22%3A%222895567238%22%2C%22first%22%3A12%2C%22after%22%3A%22QVFETnFyYXp3d2pjdHVud2FpTUI2dVBTa00xUjNhYmpneEE2ck5EMlE2YlpGVlpPY3BXdFFOOEhEa3Ztb29uT1JYdVpzcHY5NnMwYUVlQ3Q5TUdEamNKdw%3D%3D%22%7D
query_hash=9dcf6e1a98bc7f6e92953d5a61027b98
variables={"id":"2895567238","first":12,"after":"QVFETnFyYXp3d2pjdHVud2FpTUI2dVBTa00xUjNhYmpneEE2ck5EMlE2YlpGVlpPY3BXdFFOOEhEa3Ztb29uT1JYdVpzcHY5NnMwYUVlQ3Q5TUdEamNKdw=="}

*/

function getPosts(id) {
  accountCycle++;
  if (accountCycle > logins.length - 1) {
    accountCycle = 0
  }

  const cookie = cookies[accountCycle]
  const baseURL = `https://www.instagram.com/${id}/?__a=1`

  const options = {
    url: baseURL,
    headers: {
      Cookie: cookie
    }
  }

  request(options, (error, response, bodyRaw) => {
    const parsed = JSON.parse(bodyRaw).graphql.user.edge_owner_to_timeline_media;
    console.log(parsed)
  })
}

getPosts('gryphonracing')

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
    getUID (id, (uid) => {
      accountCycle++;
      if (accountCycle > logins.length - 1) {
        accountCycle = 0
      }
      console.log(accountCycle)
      getRequestUser(uid, cookies[accountCycle], '', followers, function(users) {
        resolve(users)
      })
    })
  })
}

function getUID (username, callback_) {
  const url = `https://www.instagram.com/${username}/?__a=1`
  request({
    method: 'GET',
    url,
    json: true
  }, (error, response, body) => callback_(get(['graphql', 'user', 'id'], body)))
}

function getRequestUser (id, cookie, cursor, query, cb) {
  const baseURL = `https://www.instagram.com/graphql/query/?query_hash=${query}&variables=`
  const variables = { id: id, include_reel: true, fetch_mutual: false, first: 100, after: cursor }

  const options = {
    url: `${baseURL}${JSON.stringify(variables)}`,
    headers: {
      Cookie: cookie
    }
  }

  request(options, (error, response, bodyRaw) => {
    const body = JSON.parse(bodyRaw)
    if (body.status === 'ok') {
      let data = []

      if (body.data.user.edge_followed_by) {
        data = body.data.user.edge_followed_by
      } else {
        data = body.data.user.edge_follow
      }

      let { count, page_info } = data
      let { has_next_page, end_cursor } = page_info

      const users = data.edges.map(datum => ({ username: datum.node.username, fullName: datum.node.full_name }))

      if (has_next_page) {
        getRequestUser(id, cookie, end_cursor, query, function(users_other) {
          setTimeout(() => {cb(users.concat(users_other))}, 1000);
        })
      } else {
        setTimeout(() => {cb(users)}, 1000);
      }
    } else {
      console.log(`Error: ${error}`)
    }
  })
}

module.exports = { startModule, lookUp }
