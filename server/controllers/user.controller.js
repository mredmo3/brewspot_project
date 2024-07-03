import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

async function getAllUsers(req, res, next) {
  try {
    const ALL_USERS = await User.find({ email: req.body.email });
    res.status(200).json(ALL_USERS);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function createNewUser(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({ message: "Registration succesful!" });
  } catch (error) {
    res.status(400).json(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = bcrypt.compare(
      String(password).trim(),
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getOneUserId(req, res) {
  try {
    const GET_USER_BY_ID = await User.findById(req.params.id);
    res.status(200).json(GET_USER_BY_ID);
  } catch (error) {
    res.status(400).json(error);
  }
}

export { getAllUsers, createNewUser, getOneUserId, login };
