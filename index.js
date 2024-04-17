/*
 *This is the basic setup for deploying in vercel with mongoose
 * it have swagger docs , mongodb connect
 *
 */

require("dotenv").config();
const dbconnect = require("./dbconnect");
const express = require("express");
const path = require('path');
const app = express();


const fs = require('fs')
const  cors = require('cors')
global.__configurations = require(path.resolve(__dirname,'config.js'));
global.ROUTE_DIR = __dirname + "/routes";
global.CONTROLLER_DIR = __dirname + "/controllers";
global.UTIL_DIR = __dirname + "/utils";
global.DB_MODEL = __dirname + "/models";
global.MIDDLEWARES = __dirname + "/middleware";
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  if (req.originalUrl == "/") {
    res.status(200).send();
  } else {
    console.debug(`Incoming request -> method: ${req.method},  query params: ${JSON.stringify(req.query)},param: ${JSON.stringify(req.params)},url: ${req.originalUrl}, body: ${JSON.stringify(req.body)}`);
    next();
  }
});




fs.readdirSync(ROUTE_DIR).forEach((file) => {

  const routeName = `/api/${file.substring(0, file.length - 3)}`;
  const router = require(`${ROUTE_DIR}/${file}`);

  console.debug(`Loading router ${ROUTE_DIR}/${file} for route ${routeName}`);
  app.use(routeName, router);
});

if (__configurations.ENVIRONMENT=='local'){
  app.listen(3001,()=>{

    console.log('app started on port 3001 in local environment')
  })
}



module.exports= app


