const jwt = require("jsonwebtoken");
const jwt_key = process.env.JWT_KEY;

module.exports = (req, resp, next) => {
  try {
    const token = req.headers.jwt;
    const decodedToken = jwt.verify(token, jwt_key);

    resp.locals.decoded = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    resp.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
