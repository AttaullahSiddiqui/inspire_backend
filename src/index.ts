import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import router from "./router";
import { connectDb, PORT } from "./config";

const app = express();

const port = PORT;

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
//app.use(express.json());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectDb();

app.use("/", router());
