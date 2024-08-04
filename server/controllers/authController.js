const User = require("../modules/User");
const { error, success } = require("../utils/responseWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginController = async (req, res) => {
  const { phone, password } = req.body;
  try {
    if (!phone || !password) {
      return res.send(error(401, "All fields are require"));
    }

    const user = await User.findOne({ phone }).select("+password");
    if (!user) {
      return res.send(error(404, "User not regestered ....")); // If the client wants to register on only login page then you need to remove this line of code
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.send(error(403, "Incorrect password"));
    }

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, { accessToken }));
  } catch (e) {
    return res.send(error(500, `error in login ${e}`));
  }
};

const userData = async (req, res) => {
  try {
    const userId = req._id;
    const user = await User.find({ _id: userId });
    return res.send(success(200, user));
  } catch (e) {
    return res.send(error(500, "Failed to retrieve user"));
  }
};
const allUsers = async (req, res) => {
  try {
    const userId = req._id;
    // console.log(userId);
    const users = await User.find({});
    // console.log(users);

    return res.send(success(200, users));
  } catch (e) {
    // console.log(e);
    return res.send(error(500, "Failed to retrieve user"));
  }
};
const signUpController = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.send(error(400, "all fields are required ...."));
    }

    const oldUser = await User.findOne({ phone });

    if (oldUser) {
      return res.send(error(409, "user already registerd ..... "));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashPassword,
    });

    await user.save();
    // const newUser = await User.findById(user._id);

    return res.send(success(201, "user created succesfully"));
  } catch (e) {
    // console.log(e);
    return res.send(error(500, e.message));
  }
};
const logOutController = async (req, res) => {
  try {
    res.clearCookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "logout successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    // console.log("Access Token " + token);
    return token;
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    // console.log("Refresh Token " + token);
    return token;
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const addBalance = async (req, res) => {
  try {
    const { balance } = req.body;
    const userId = req._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { balance: balance },
      {
        new: true,
      }
    );

    // console.log(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found." });
    }
    return res.status(200).json({ updatedUser });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
  // console.log(user, balance);
};
const subBalance = async (req, res) => {
  try {
    const { balance } = req.body;
    const userId = req._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { balance: balance },
      {
        new: true,
      }
    );

    // console.log(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found." });
    }
    return res.status(200).json({ updatedUser });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
  // console.log(user, balance);
};

module.exports = {
  loginController,
  signUpController,
  logOutController,
  userData,
  allUsers,
  addBalance,
  subBalance,
};
