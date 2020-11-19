const { PreconditionFailedError, NotFoundError } = require("../errors");

module.exports = (error, _, response, __) => {
  if (error instanceof PreconditionFailedError) {
    response.status(412);
  } else if (error instanceof NotFoundError) {
    response.status(404);
  } else {
    response.status(500);
  }
  response.send({
    message: error.message
  });
};
