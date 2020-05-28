const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismyauth");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    res.token = token;
    req.user = user;

    return next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }

  return next();
};

module.exports = auth;
