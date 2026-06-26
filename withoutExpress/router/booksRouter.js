const {
  booksController,
  notFoundResponse,
} = require('../controller/booksController.js');
const { routesMap } = require('./methods.js');

const handleRouting = (method, pathName, resourceID, body) => {
  if (!body || body.trim() === '') {
    return {
      status: 400,
      message: JSON.stringify('400 Bad Request. Request body cannot be empty.'),
    };
  }

  const methodMap = routesMap.get(method);
  if (!methodMap) {
    return notFoundResponse.method(method);
  }

  const handler = methodMap.get(pathName);
  if (!handler) {
    return notFoundResponse.url(pathName);
  }

  const data = handler(resourceID, body);
  return { status: 200, data };
};

module.exports = { handleRouting };
