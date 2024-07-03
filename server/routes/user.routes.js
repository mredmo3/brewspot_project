import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  getOneUserId,
  login,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/").get(getAllUsers);
userRouter.route("/").post(createNewUser);
userRouter.route("/login").post(login);

userRouter.route("/:id").get(getOneUserId);

export default userRouter;
