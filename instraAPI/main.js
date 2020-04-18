const request = require('request')
const axios = require('axios');
const {Builder, By, Key, until} = require('selenium-webdriver');

const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

const following = 'd04b0a864b4b54837c0d870b0e77e076'
const followers = 'c76146de99bb02f6415203be841dd25a'

let accountCycle = 0
let cookies = []

const logins = [
  {
    username: 'noclout_goodmusic',
    password: '2Kd12##pqow'
  },
  {
    username: 'sikomiw663',
    password: '22Kd12##pqow2'
  },
  {
    username: 'burner90210',
    password: 'a_Emt"b8Tz5j4W@'
  },
  {
    username: 'sewcul6',
    password: 'a_Emt"b8Tz5j4W@'
  }
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
    } catch {
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
      getRequest(uid, cookies[accountCycle], '', followers, function(users) {
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

function getRequest (id, cookie, cursor, query, cb) {
  const baseURL = `https://www.instagram.com/graphql/query/?query_hash=${query}&variables=`
  const variables = { id: id, include_reel: true, fetch_mutual: false, first: 100, after: cursor }

  const options = {
    url: `${baseURL}${JSON.stringify(variables)}`,
    headers: {
      Cookie: cookie,
      sessionid: '23155198251:coFonkZ2E1tSWa:4'
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
        getRequest(id, cookie, end_cursor, query, function(users_other) {
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
