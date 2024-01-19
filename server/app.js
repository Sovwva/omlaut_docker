import express from "express"
import cors from "cors"
import * as http from "http";
import * as fs from "fs";
import pool from './initdb.js';
import User_router from "./user/User_router.js"
// import product_router from "./product/Product_router.js";
// import "dotenv/config"; // loads variables from .env file


const PORT = process.env.PORT || 5000;
const app = express()
const DB_URL = ""

app.use(cors());
app.use(express.json)

app.use((req, res, next) => {
  const dateTime = new Date().toISOString();
  const log = `${dateTime} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.error(err);
  });
  next();
});

app.use('/user', User_router);
// app.use('/product', product_router);

const server = http.createServer(app);

async function startApp() {
  try {
    server.listen(PORT, () => {
      console.log(`server listening on ${PORT}`)
    });
  }
  catch (e) {
    console.log(e)
  }
}

startApp()