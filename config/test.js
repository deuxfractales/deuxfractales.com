var ip = require('ip');

const currentIp = ip.address()

if(currentIp === '192.168.56.1'){
    require('dotenv').config({ path: './envs/dev.env' })
}else if(currentIp === '138.197.137.112'){
    require('dotenv').config({ path: './envs/prod.env' })
}

console.log(process.env.TEST)