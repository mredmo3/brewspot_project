import { Router } from "express";
import {
  addCoffee,
  deleteOneCoffeeId,
  getAllCoffee,
  getOneCoffeeId,
  updateOneCoffeeId,
} from "../controllers/coffee.controller.js";
import { authenticate } from "../middlewares/auth.js";

const coffeeRouter = Router();

coffeeRouter.route("/").get(authenticate, getAllCoffee);
coffeeRouter.route("/").post(authenticate, addCoffee);

coffeeRouter
  .route("/:id")
  .get(authenticate, getOneCoffeeId)
  .put(authenticate, updateOneCoffeeId)
  .delete(authenticate, deleteOneCoffeeId);

export default coffeeRouter;
