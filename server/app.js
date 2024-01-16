import express from "express"
import cors from "cors"
import * as http from "http";
import * as fs from "fs";
import pool from './initdb.js';
// import User_router from "./user/User_router.js"
// import product_router from "./product/Product_router.js";
// import "dotenv/config"; // loads variables from .env file


const PORT = process.env.PORT || 5000;
const app = express()
const DB_URL = ""

app.use(cors());

app.use((req, res, next) => {
  const dateTime = new Date().toISOString();
  const log = `${dateTime} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.error(err);
  });
  next();
});

app.use('/user', (req, res) => {
  // pool.query('SELECT * FROM users_schema.users;', (err, result) => {
  //   if (err) {
  //     console.error('Ошибка выполнения запроса:', err);
  //   } else {
  //     console.log('Результат запроса:', result.rows[0]);
  //   }
  // });

  const insertQuery = {
    text: 'INSERT INTO users_schema.users(email, password, username, is_admin) VALUES($1, $2, $3, $4)',
    values: ['testuser@example.com', 'hashed_password', 'test_user', 'false'],
  };

  pool.query(insertQuery, (error, result) => {
    if (error) {
      console.error('Error', error);
    }
  });

  res.send('Привет, это страница пользователя.');
});

// app.use('/hello', (req, res) => {
//   res.send('Hello, World!');
// });

// app.use(express.json())
// app.use('/user', User_router)
// app.use('/product', product_router)

app.get('/', (req, res) => {
  res.send('Дарова заебал');
});

const server = http.createServer(app);

async function startApp() {
  try {
    server.listen(PORT, () => {
      console.log(`server listening on ${PORT}`)
    });
    // app.listen(PORT, () => console.log("listenig... " + PORT))
  }
  catch (e) {
    console.log(e)
  }
}

startApp()