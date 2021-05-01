const jwt = require("jsonwebtoken");
const { SECRETKEY } = require("./keys");

const isAuthorized = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const verificationResult = jwt.verify(token, SECRETKEY);
    if (verificationResult) {
      next();
    } else {
      res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const verificationResult = jwt.verify(token, SECRETKEY);
    if (verificationResult["role"] === "Super User") {
      next();
    } else {
      res.status(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = {
  isAuthorized: isAuthorized,
  isAdmin: isAdmin,
};
