import Coffee from "../models/coffee.model.js";

async function getAllCoffee(req, res, next) {
  try {
    const ALL_COFFEE = await Coffee.find();
    res.status(200).json(ALL_COFFEE);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function addCoffee(req, res, next) {
  try {
    const newCoffee = {
      brand: req.body.brand,
      brew: req.body.brew,
      description: req.body.description,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    const NEW_COFFEE = await Coffee.create(newCoffee);
    res.status(200).json(NEW_COFFEE);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getOneCoffeeId(req, res) {
  try {
    const GET_COFFEE_BY_ID = await Coffee.findById(req.params.id);
    const response = {
      brand: GET_COFFEE_BY_ID.brand,
      brew: GET_COFFEE_BY_ID.brew,
      description: GET_COFFEE_BY_ID.description,
      isOwner:
        GET_COFFEE_BY_ID.firstName === req.user.firstName &&
        GET_COFFEE_BY_ID.lastName === req.user.lastName,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function updateOneCoffeeId(req, res) {
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const UPDATE_COFFEE_BY_ID = await Coffee.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    res.status(200).json(UPDATE_COFFEE_BY_ID);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteOneCoffeeId(req, res) {
  try {
    const DELETE_COFFEE_BY_ID = await Coffee.findByIdAndDelete(req.params.id);
    res.status(200).json(DELETE_COFFEE_BY_ID);
  } catch (error) {
    res.status(400).json(error);
  }
}

export {
  getAllCoffee,
  addCoffee,
  getOneCoffeeId,
  updateOneCoffeeId,
  deleteOneCoffeeId,
};
