import express, { json } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { mongoConnect } from "./db/connection.db.js";
import { SignUpRouter } from "./routes/signup.route.js";
import { SignInRouter } from "./routes/signin.route.js";
import { GameRouter } from "./routes/game.route.js";

config();

const app = express();
app.use(json());
app.use(cookieParser());

await mongoConnect();

app.use("/signup", SignUpRouter);
app.use("/signin", SignInRouter);
app.use("/games", GameRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
