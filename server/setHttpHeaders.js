module.exports = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_ORIGIN}`);
  res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,X-Requested-With,Accept,Authorization,Origin,Access-Control-Request-Method,Access-Control-Request-Headers"
  );
  next();
}