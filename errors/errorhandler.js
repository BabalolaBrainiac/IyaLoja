const AppError = require('./errors')



function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof AppError) {
    res.status(error.code).json(error.message);
    return;
  }

  res.status(500).json("something went wrong");
}

module.exports = errorHandler;
