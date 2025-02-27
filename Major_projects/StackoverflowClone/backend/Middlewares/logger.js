// log request
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] : Request made to : ${req.originalUrl}`
  );
  next();
};

module.exports = { logRequest };
