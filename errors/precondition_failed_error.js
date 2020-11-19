class PreconditionFailedError extends Error {
  constructor(error) {
    super(error);
  }
}
module.exports = PreconditionFailedError;
