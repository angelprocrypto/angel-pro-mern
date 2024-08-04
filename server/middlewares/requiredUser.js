const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
const User = require("../modules/User");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res
      .status(401)
      .send(error(401, "Authorization header is required."));
  }
  const accessToken = req.headers.authorization.replace("Bearer ", "");
  // or alternatively:
  // const accessToken = req.headers.authorization.split(" ")[1];
  // console.log("access token from headers " + accessToken);
  try {
    const decode = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    req._id = decode.id;
    const user = await User.findById(req._id);

    if (!user) {
      res.send(error(404, "User Not Regestered ..."));
    }
    next();
  } catch (e) {
    // console.log(`error in required user middleware ${e}`);
    res.send(error(401, "Invalid Access Token"));
  }
};
