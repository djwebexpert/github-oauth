// Main
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const dotenv = require('dotenv')
dotenv.config();

require("./dataBase/mongoose");

const AuthRouter = require('./routes/auth');
const UserRouter = require('./routes/user');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);

app.listen(PORT, () => {
  console.log(`Server Connected: ${PORT}`);
});
