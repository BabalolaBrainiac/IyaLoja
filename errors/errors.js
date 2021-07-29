class AppError {
    constructor(code, message) {
      (this.code = code), (this.message = message);
    }
  
    static badRequest(message) {
      return new AppError(400, message);
    }
  
    static internal(message) {
      return new AppError(500, message);
    }

    static successful(message) {
        return new AppError(201, message)
    }

    static notFound(message) {
        return new AppError(404, message)
    }
    static badGateway(message) {
        return new AppError(401, message)
    }
  }
  
  module.exports = AppError;
  