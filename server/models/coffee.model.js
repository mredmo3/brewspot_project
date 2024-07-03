import { model, Schema } from "mongoose";
const CoffeeSchema = new Schema({
  brand: {
    type: String,
    required: [true, "Brand name is required"],
    minlength: [2, "Brand name must be at least 1 character long"],
    maxlength: [40, "Brand name must be less than 40 characters long"],
  },
  brew: {
    type: String,
    required: [true, "Brew type is required"],
    minlength: [2, "Brew type must be at least 1 character long"],
    maxlength: [40, "Brew type must be less than 40 characters long"],
  },
  description: {
    type: String,
    required: [true, "Description of coffee brand is required"],
    minlength: [4, "Coffee description must be at least 4 characters long"],
    maxlength: [140, "Description type must be less than 140 characters long"],
  },
  firstName: {
    type: String,
    required: [true, "owner of coffee brand is required"],
  },
  lastName: {
    type: String,
    required: [true, "owner of coffee brand is required"],
  },
});
const Coffee = model("Coffee", CoffeeSchema);
export default Coffee;
