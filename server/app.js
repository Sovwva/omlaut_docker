import express from "express"
import cors from "cors"
import * as http from "http";
import * as fs from "fs";
import Pool from "pg"
// import User_router from "./user/User_router.js"
// import product_router from "./product/Product_router.js";
// import "dotenv/config"; // loads variables from .env file

const app = express()
const PORT = process.env.PORT || 5000;
const DB_URL = ""

app.use(cors());

const pool = new Pool.Pool({
  user: process.env.POSTGRES_USER || 'omlaut_docker_database_user',
  host: 'localhost',
  database: process.env.POSTGRES_DB || 'omlaut_docker_database',
  password:  process.env.DATABASE_PASSWORD || 'omlaut_docker_database_password',
  port: process.env.DATABASE_PORT || 5432, // Порт, на котором запущен PostgreSQL
});

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Ошибка выполнения запроса:', err);
  } else {
    console.log('Результат запроса:', result.rows[0]);
  }
});

app.use((req, res, next) => {
  const dateTime = new Date().toISOString();
  const log = `${dateTime} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.error(err);
  });
  next();
});

app.use('/user', (req, res) => {
  res.send('Привет, это страница пользователя.');
});



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