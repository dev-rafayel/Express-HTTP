const { routesMap } = require('./methods.js');
const responses = require('../utils/statusCodes.js');

const handleRouting = (method, pathName, resourceID, body) => {
  const methodMap = routesMap.get(method);
  if (!methodMap) {
    return responses.notFoundResponse.method(method);
  }

  const handler = methodMap.get(pathName);
  if (!handler) {
    return responses.notFoundResponse.url(pathName);
  }

  const data = handler(resourceID, body);
  return { status: 200, data };
};

module.exports = { handleRouting };
