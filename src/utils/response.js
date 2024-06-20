const createSuccessResponse = (message, data) => {
  return {
    message: message,
    data: data,
  };
};

const createErrorResponse = (message) => {
  return {
    error: message,
  };
};

module.exports = {
  createSuccessResponse,
  createErrorResponse,
};
