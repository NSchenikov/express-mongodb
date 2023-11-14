const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const logger = require("./middlewares/logger");

dotenv.config();

const {
  PORT = 3005,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://127.0.0.1:27017/mydb",
} = process.env;

mongoose
  .connect(MONGO_URL)
  .catch((error) => console.log(error), console.log("connect to MongoDB"));

const app = express();

const helloWorld = (request, response) => {
  response.status(200);
  response.send("Hello, world");
};

app.use(cors());
app.use(logger);
app.use(bodyParser.json());

app.get("/", helloWorld);

app.post("/", (request, response) => {
  response.status(200);
  response.send("Hello from POST");
});

app.get("/users/34", (request, response) => {
  response.status(200);
  response.send("Users with id 34");
});

app.get("/books/34", (request, response) => {
  response.status(200);
  response.send("Users with id 34");
});

app.use((request, response) => {
  response.status(404);
  response.send("Not found");
})

app.use((request, response) => {
  response.status(500);
  response.send("Problems with server");
})

app.use(userRouter);
app.use(booksRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
