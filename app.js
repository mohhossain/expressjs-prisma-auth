import express from "express";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import auth from "./auth/authController.js";
import { verify } from "./auth/sessionVerify.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/", async (req, res) => {
  res.send("<h1> Welcome to the Prisma REST API </h1>");
});

app.use("/auth", auth);

app.use(verify);

// Users routes
app.use("/users", userRouter);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
