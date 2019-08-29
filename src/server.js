const express = require('express')
const bodyParser = require('body-parser')
const os = require('os')
const logger = require('morgan')
const router = require('./route')
const config = require('./config.json')
const app = express()
const port = config.port
const host = `http://${getIPAddress()}`

function getIPAddress(){
  const interfaces = os.networkInterfaces();
  for(let devName in interfaces){
      const iface = interfaces[devName];
      for(var i=0; i<iface.length ;i++){
          const  alias = iface[i];
          if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
              return alias.address;
          }
      }
  }
}

const allowCors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials','true');
  next();
}

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use(allowCors)

app.use(logger('dev'))

app.use(router)


app.listen(port,()=>{
  console.log("\x1B[32m%s\x1b[0m:", "Mock Server Serve At:")
  console.log(` http://localhost:${port}`)
  console.log(` ${host}:${port}`)
})