const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error (mio)";

  //Error MongoDB
  if (err.name === "CastError" || err.name === "BSONTypeError") {
    const message = `Objeto no encontrado. Invalido: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Error de duplicado
  if (err.code === 11000) {
    const message = `Error, ${Object.keys(err.keyValue)} existente`;
    err = new ErrorHandler(message, 400);
  }

  //JWT con error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token invalido`;
    err = new ErrorHandler(message, 400);
  }

  //JWT expirado
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token está expirado`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
