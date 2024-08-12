require("dotenv").config();
const {
  registerMessage,
  userExists,
  loginMessage,
  invalidOtp,
} = require("../constants/messages.constant");
const UserModel = require("../models/user.model");
const WalletModel = require("../models/wallet.model");
const {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
} = require("../validations/user.validation");
const { Op } = require("sequelize");
const { hashPassword, comparePassword } = require("../utils/helpers.util");
const { v4: uuidv4 } = require("uuid");
const { credit } = require("./wallet.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { error } = createUserValidation(req.body);
  if (error !== undefined) {
    res.status(400).json({
      status: true,
      message: error.details[0].message || "Bad request",
    });
    return;
  }

  try {
    const { name, username, email, phone, dob, password } = req.body;
    const checkIfUserExist = await UserModel.findAll({
      attributes: ["email", "phone"],
      where: {
        [Op.or]: [{ email: email }, { phone: phone }],
      },
    });

    if (checkIfUserExist.length > 0) {
      res.status(400).json({
        status: false,
        message: userExists,
      });
      return;
    }

    // const { hash, salt } = await hashPassword(password);
    const userID = uuidv4();
    await UserModel.create({
      user_id: userID,
      name,
      username,
      email,
      phone,
      dob,
      password,
    });

    await WalletModel.create({
      wallet_id: uuidv4(),
      user_id: userID,
    });

    credit(200, userID, `Wallet funding for signup credits`);

    res.status(201).json({
      status: true,
      message: registerMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

const getUserDetails = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    res.status(400).json({
      status: false,
      message: "Bad request",
    });
    return;
  }
  try {
    const user = await UserModel.findOne({
      attributes: ["name", "username", "email", "dob", "phone"],
      where: {
        user_id: user_id,
      },
    });
    if (!user) {
      res.status(400).json({
        status: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      status: true,
      data: user,
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).json({
      status: false,
      message: "bad request",
    });
  }
  ///use joi to validate the request body
  const { error } = validateUpdateUser(req.body);
  if (error !== undefined) {
    res.status(400).json({
      status: false,
      message: error.details[0].message || "Bad request",
    });
    return;
  }
  try {
    await UserModel.update(req.body, {
      where: {
        user_id: user_id,
      },
    });

    res.status(200).json({
      status: true,
      message: "user profile updated successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  const { error } = loginUserValidation(req.body);
  if (error !== undefined) {
    res.status(400).json({
      status: true,
      message: error.details[0].message || "Bad request",
    });
    return;
  }
  //login user
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("All fields are required");
    const user = await UserModel.findOne({
      where: { email: email },
    });
    if (user == null) throw new Error("Invalid email or password");
    let payload;
    let accessToken;

    const dataToaddInMyPayload = {
      email: user.email,
      _id: uuidv4(),
    };

    const compareHash = await bcrypt.compare(password, user.password_hash);
    if (!compareHash) throw new Error("Invalid email or password");
    if (!user.isOtpVerified) {
      res.status(400).json({
        status: false,
        level: 2,
        message: "Account not verified",
      });
      return;
    }
    const token = await jwt.sign(dataToaddInMyPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.setHeader("Authorization", "Bearer " + token);

    return res.status(200).json({
      status: true,
      message: loginMessage,
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserDetails,
  updateUserProfile,
};
