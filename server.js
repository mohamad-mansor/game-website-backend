import express, { json } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { mongoConnect } from "./db/connection.db.js";
import { SignUpRouter } from "./routes/signup.route.js";
import { SignInRouter } from "./routes/signin.route.js";
import { AdminRouter } from "./routes/admin.route.js"; // Import the new admin router

config();

const app = express();
app.use(json());
app.use(cookieParser());

// Connect to MongoDB
await mongoConnect();

// Use routes
app.use("/signup", SignUpRouter);
app.use("/signin", SignInRouter);
app.use("/admin", AdminRouter); // Add admin route for promotions

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
