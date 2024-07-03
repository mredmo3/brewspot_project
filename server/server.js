import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import coffeeRouter from "./routes/coffee.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json(), cors());
app.use("/coffee", coffeeRouter);
app.use("/user", userRouter);

dotenv.config();
const PORT = process.env.PORT;

dbConnect();
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
