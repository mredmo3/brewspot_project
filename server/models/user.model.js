import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail.js";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [2, "First Name should be at leat 2 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [isEmail, "Invalid Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      required: [true, "Passwords must match"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }
);

UserSchema.pre(`save`, async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

const User = model("User", UserSchema);

export default User;
