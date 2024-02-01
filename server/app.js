import express from "express"
import cors from "cors"
import * as http from "http";
import * as fs from "fs";
import pool from './initdb.js';
import User_router from "./user/User_router.js"
import Product_controller from "./product/Product_controller.js";
import Product_router from "./product/Product_router.js";
import bodyParser from "express";
import Cart_router from "./cart/cart_router.js";
// import product_router from "./product/Product_router.js";
// import "dotenv/config"; // loads variables from .env file



const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.json())
// app.use(bodyParser.json({
//   limit: 20000000, // 2 МБ
// }));

// app.use((req, res, next) => {
//   const dateTime = new Date().toISOString();
//   const log = `${dateTime} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`;
//
//   fs.appendFile('server.log', log + '\n', (err) => {
//     if (err) console.error(err);
//   });
//   next();
// });

app.use('/user', User_router);
app.use('/product', Product_router);
app.use('/cart', Cart_router);
// app.use('/pay', )

const server = http.createServer(app);

server.on('error', (err) => {
  console.error(err);
});


async function startApp() {
  try {
    await server.listen(PORT)
    console.log(`server listening on ${PORT}`);
  }
  catch (e) {
    console.log(e)
  }
}

startApp();